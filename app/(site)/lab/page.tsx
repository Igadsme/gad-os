import { redirect } from "next/navigation";

export const metadata = { title: "Lab" };

export default function LabPage() {
  redirect("/projects");
}
