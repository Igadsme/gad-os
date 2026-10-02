import { createServer } from "node:http";
import express from "express";
import next from "next";
import { createApp as createAssistantApp } from "./backend/dist/app.js";
import { closePool } from "./backend/dist/db/pool.js";
import { migrate } from "./backend/dist/db/migrate.js";
import { logger } from "./backend/dist/logger.js";
import { warmupRetrieval } from "./backend/dist/services/retrieval.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

const nextApp = next({ dev, hostname, port });
await nextApp.prepare();

try {
  await migrate();
} catch (error) {
  const name = error instanceof Error ? error.name : "UnknownError";
  logger.error({ err: { name } }, "assistant database migration failed");
}

const app = express();
app.disable("x-powered-by");
app.use("/api/recruiter", createAssistantApp());
app.use((request, response) => nextApp.getRequestHandler()(request, response));

const server = createServer(app);
server.listen(port, hostname, () => {
  logger.info({ hostname, port, dev }, "Gad OS server started");
  void warmupRetrieval().catch((error) => {
    const name = error instanceof Error ? error.name : "UnknownError";
    logger.error({ err: { name } }, "assistant retrieval warmup failed");
  });
});

async function shutdown() {
  server.close(async () => {
    await closePool();
    await nextApp.close();
    process.exit(0);
  });
}

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
