import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { about } from "@/data/about";
import { gallery } from "@/data/gallery";
import { organizations, profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        title="About Imani"
        subtitle="Software engineer, builder, and Computer Science candidate at Kennesaw State University."
      />

      <Card className="px-5 py-5">
        <div className="grid gap-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-start">
          <div className="relative mx-auto aspect-[4/5] w-40 overflow-hidden rounded-[14px] sm:mx-0 sm:w-full">
            <Image
              src={profile.avatar}
              alt={`${profile.name}, professional portrait`}
              fill
              sizes="(min-width: 640px) 160px, 160px"
              loading="eager"
              className="object-cover object-[center_18%]"
            />
          </div>
          <div>
            <p className="text-sm leading-6 text-muted">{about.bio}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {profile.location}
              </span>
              <span>{profile.education.school}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <a href={`mailto:${profile.email}`}>
                  <Mail /> Contact
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="/resume">View Résumé</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <section className="mt-8 space-y-6">
        {about.story.map((section) => (
          <article key={section.title} className="max-w-3xl">
            <h2 className="text-base font-semibold">{section.title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-muted">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-base font-semibold">Journey</h2>
        <div className="relative flex flex-col gap-4 md:flex-row md:gap-0">
          <div className="pointer-events-none absolute left-3 top-0 hidden h-px w-full bg-border md:block" />
          <div className="pointer-events-none absolute bottom-0 left-[11px] top-0 w-px bg-border md:hidden" />
          {about.journey.map((item) => (
            <div key={item.year} className="relative flex-1 pl-8 md:pl-0 md:pr-4">
              <span className="absolute left-[7px] top-1 size-2 rounded-full bg-primary md:left-0 md:top-[-3px]" />
              <p className="text-xs font-semibold text-primary">{item.year}</p>
              <p className="mt-1 text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h2 className="text-sm font-semibold">Community</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-muted">
            {organizations.map((org) => (
              <li key={org}>{org}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <h2 className="text-sm font-semibold">Interests</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {about.interests.map((interest) => (
              <Badge key={interest.label} tone="muted">
                {interest.label}
              </Badge>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">From photographs in the Gallery.</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-sm font-semibold">Values</h2>
          <ul className="mt-2 space-y-2">
            {about.values.map((item) => (
              <li key={item.title}>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs leading-5 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-base font-semibold">Life in snapshots</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {gallery.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="relative h-36 w-24 shrink-0 overflow-hidden rounded-[14px]"
            >
              <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="96px" />
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
