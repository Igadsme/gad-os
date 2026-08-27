import { ResumeStudio } from "@/components/resume/resume-studio";

export const metadata = { title: "Résumé" };

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Résumé</h1>
        <p className="mt-2 text-muted">
          View, customize, and share a résumé that stays faithful to the source PDF.
        </p>
      </header>
      <ResumeStudio />
    </div>
  );
}
