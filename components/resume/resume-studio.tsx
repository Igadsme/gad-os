"use client";

import { useRef } from "react";
import { Download, ExternalLink, Mail, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { profile } from "@/data/profile";

export function ResumeStudio() {
  const previewDialog = useRef<HTMLDialogElement>(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied");
    } catch {
      toast.error("Could not copy email. Use the email link instead.");
    }
  }

  return (
    <div className="resume-studio">
      <section className="resume-preview-panel" aria-label="Résumé PDF preview">
        <iframe
          className="resume-preview-frame"
          src={`${profile.resumePdf}#view=FitH`}
          title={`${profile.name} résumé PDF`}
        />
        <Button
          type="button"
          variant="secondary"
          className="resume-mobile-preview"
          onClick={() => previewDialog.current?.showModal()}
        >
          Preview Résumé
        </Button>
      </section>

      <dialog ref={previewDialog} className="resume-preview-dialog" aria-label="Full-screen résumé preview">
        <div className="resume-preview-dialog__bar">
          <span>Résumé preview</span>
          <button type="button" onClick={() => previewDialog.current?.close()} aria-label="Close résumé preview">
            <X className="size-5" />
          </button>
        </div>
        <iframe src={`${profile.resumePdf}#view=FitH`} title={`${profile.name} résumé PDF, full-screen preview`} />
      </dialog>

      <Card className="resume-actions">
        <h2 className="font-display text-base font-semibold">Résumé actions</h2>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <a href={profile.resumePdf} download>
            <Download /> Download Résumé PDF
          </a>
        </Button>
        <Button type="button" variant="secondary" className="w-full" onClick={() => void copyEmail()}>
          <Mail /> Copy Email
        </Button>
        <Button asChild variant="secondary" className="w-full">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <ExternalLink /> Open LinkedIn
          </a>
        </Button>
        <Button asChild variant="secondary" className="w-full">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <ExternalLink /> Open GitHub
          </a>
        </Button>
      </Card>
    </div>
  );
}
