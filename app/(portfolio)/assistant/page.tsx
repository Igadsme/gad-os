import { AssistantChat } from "@/components/assistant/assistant-chat";

export const metadata = { title: "AI Assistant" };

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <AssistantChat />
    </div>
  );
}
