import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, FileText, GraduationCap, MapPin } from "lucide-react";
import { activity } from "@/data/activity";
import { gallery } from "@/data/gallery";
import { profile, stats } from "@/data/profile";
import { getFeaturedProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/projects/project-card";
import { SpotifyPlaylistCard } from "@/components/music/spotify-playlist";
import { ActivityIcon } from "@/components/home/activity-icon";
import { PageContainer } from "@/components/layout/page-header";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const mosaic = [
    gallery.find((item) => item.category === "Sports"),
    gallery.find((item) => item.category === "Automotive"),
    gallery.find((item) => item.category === "Travel"),
    gallery.find((item) => item.category === "Campus"),
  ].filter(Boolean);

  return (
    <PageContainer width="wide">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <Card className="profile-card px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="profile-orbit relative size-[96px] shrink-0 rounded-full p-1">
                <div className="relative size-full overflow-hidden rounded-full">
                  <Image
                    src={profile.avatar}
                    alt={`${profile.name}, professional portrait`}
                    fill
                    sizes="104px"
                    className="object-cover object-[center_18%]"
                    priority
                  />
                </div>
                <span className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full border-2 border-surface bg-primary text-white">
                  <BadgeCheck className="size-3.5" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-display text-4xl font-bold leading-none tracking-[-0.04em] sm:text-[42px]">
                  {profile.name}
                </h1>
                <p className="mt-2 text-sm font-medium text-muted">{profile.headline}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="size-3.5" />
                    {profile.education.school} · {profile.education.end}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {profile.location}
                  </span>
                  <Badge tone="green">{profile.availability}</Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <Link href="/resume">
                      <FileText />
                      View Résumé
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/projects">
                      Explore my work <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="metric-ticker grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-surface lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="relative px-4 py-4 lg:px-5">
                <span className="absolute right-3 top-3 font-mono text-[9px] text-muted/50">0{index + 1}</span>
                <p className="font-display text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <section>
            <div className="mb-3 flex items-end justify-between">
              <h2 className="font-display text-xl font-bold">Featured work</h2>
              <Link href="/projects" className="text-sm text-primary hover:underline">
                All projects
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} compact />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <Card className="accent-card p-4">
            <h2 className="mb-3 text-sm font-semibold">Activity</h2>
            <ul className="space-y-2.5">
              {activity.map((item) => (
                <li key={item.id} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex size-7 items-center justify-center rounded-lg bg-surface-muted text-muted">
                    <ActivityIcon name={item.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium leading-4">
                      {item.title}
                    </span>
                    {item.detail ? (
                      <span className="text-xs text-muted">{item.detail}</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted">{item.occurred}</span>
                </li>
              ))}
            </ul>
          </Card>

          <SpotifyPlaylistCard compact />

          <Card className="p-4">
            <h2 className="mb-3 text-sm font-semibold">Life Outside Code</h2>
            <div className="grid grid-cols-2 gap-1.5">
              {mosaic.map((item) =>
                item ? (
                  <Link
                    key={item.id}
                    href="/gallery"
                    className="relative aspect-square overflow-hidden rounded-lg"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      loading="eager"
                      className="object-cover"
                      sizes="140px"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-black/45 px-1.5 py-1 text-[10px] text-white">
                      {item.category}
                    </span>
                  </Link>
                ) : null,
              )}
            </div>
            <Link
              href="/gallery"
              className="mt-3 inline-flex min-h-11 items-center text-sm text-primary hover:underline"
            >
              View Gallery
            </Link>
          </Card>
        </aside>
      </div>
    </PageContainer>
  );
}
