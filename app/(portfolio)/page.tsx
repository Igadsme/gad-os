import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  FileText,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { activity, currentlyBuilding } from "@/data/activity";
import { gallery } from "@/data/gallery";
import { profile, stats } from "@/data/profile";
import { getFeaturedProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/projects/project-card";
import { NowPlayingCard } from "@/components/music/now-playing";
import { ActivityIcon } from "@/components/home/activity-icon";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative size-24 shrink-0">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="rounded-full object-cover"
                priority
              />
              <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-white">
                <BadgeCheck className="size-4" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-1 text-muted">{profile.headline}</p>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <GraduationCap className="size-4" />
                  {profile.education.school} · {profile.education.end}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {profile.location}
                </p>
              </div>
              <Badge tone="green" className="mt-4">
                {profile.availability}
              </Badge>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/resume">
                    <FileText />
                    View Résumé
                  </Link>
                </Button>
                <Button asChild variant="violet">
                  <Link href="/assistant">
                    <Sparkles />
                    Ask My AI
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="px-4 py-4">
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </Card>
          ))}
        </div>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-semibold">Featured Work</h2>
            <Link href="/projects" className="text-sm text-primary">
              All projects →
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
        <Card className="p-4">
          <h2 className="mb-3 text-sm font-semibold">Activity</h2>
          <ul className="space-y-3">
            {activity.map((item) => (
              <li key={item.id} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <ActivityIcon name={item.icon} />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{item.title}</span>
                  {item.detail && (
                    <span className="text-xs text-muted">{item.detail}</span>
                  )}
                </span>
                <span className="text-xs text-muted">{item.occurred}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Currently building
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-violet-soft text-violet">
              <Sparkles className="size-4" />
            </span>
            <div>
              <p className="font-semibold">
                {currentlyBuilding.title}{" "}
                <span className="text-xs font-medium text-violet">
                  {currentlyBuilding.status}
                </span>
              </p>
              <p className="text-xs text-muted">{currentlyBuilding.description}</p>
            </div>
          </div>
          <Link
            href={currentlyBuilding.href}
            className="mt-3 inline-flex items-center gap-1 text-sm text-primary"
          >
            Chat with April <ArrowUpRight className="size-3.5" />
          </Link>
        </Card>

        <NowPlayingCard />

        <Card className="p-4">
          <h2 className="mb-3 text-sm font-semibold">Life Outside Code</h2>
          <div className="grid grid-cols-2 gap-2">
            {gallery.slice(0, 4).map((item) => (
              <div key={item.id} className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            ))}
          </div>
          <Link href="/gallery" className="mt-3 inline-block text-sm text-primary">
            View Gallery →
          </Link>
        </Card>
      </aside>
    </div>
  );
}
