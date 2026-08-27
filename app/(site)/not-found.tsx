import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteNotFound() {
  return (
    <div className="mx-auto max-w-lg py-24 text-center">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-2 text-3xl font-semibold">This page could not be found</h1>
      <p className="mt-2 text-muted">Try Home, Projects, or the command palette.</p>
      <Button asChild className="mt-6">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
