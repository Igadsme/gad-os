import Image from "next/image";
import { GraduationCap, Heart, Mail, MapPin, Sparkles, Users } from "lucide-react";
import { about } from "@/data/about";
import { gallery } from "@/data/gallery";
import { profile } from "@/data/profile";
import { Card } from "@/components/ui/card";

export const metadata = { title: "About" };

const highlightIcons = {
  graduation: GraduationCap,
  sparkles: Sparkles,
  users: Users,
  heart: Heart,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h1 className="serif-title text-4xl">About Imani</h1>
      <Card className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="relative size-28 shrink-0">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="max-w-2xl text-sm leading-7 text-muted">{about.bio}</p>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p className="flex items-center gap-2">
                <MapPin className="size-4" /> {profile.location}
              </p>
              <p className="flex items-center gap-2">
                <GraduationCap className="size-4" /> {profile.education.school}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-4" /> {profile.email}
              </p>
            </div>
          </div>
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {about.highlights.map((item) => {
          const Icon = highlightIcons[item.icon];
          return (
            <Card key={item.title} className="p-4">
              <Icon className="mb-3 size-4 text-primary" />
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </Card>
          );
        })}
      </div>
      <section>
        <h2 className="mb-4 text-lg font-semibold">My Journey</h2>
        <div className="grid gap-3 sm:grid-cols-5">
          {about.journey.map((item) => (
            <Card key={item.year} className="p-4">
              <p className="text-sm font-semibold text-primary">{item.year}</p>
              <p className="mt-1 font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Values</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {about.values.map((item) => (
            <Card key={item.title} className="p-5">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Life in snapshots</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {gallery.map((item) => (
            <div key={item.id} className="relative h-40 w-28 shrink-0 overflow-hidden rounded-2xl">
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
