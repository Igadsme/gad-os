export type ActivityItem = {
  id: string;
  title: string;
  detail?: string;
  occurred: string;
  icon: "rocket" | "code" | "trophy";
};

export const activity: ActivityItem[] = [
  {
    id: "devdash",
    title: "Shipped DevDash",
    detail: "Next.js · Prisma · OpenAI API",
    occurred: "May 2026",
    icon: "code",
  },
  {
    id: "hackathons",
    title: "6× hackathon winner",
    detail: "KSU AI Club member · 12 events",
    occurred: "Ongoing",
    icon: "trophy",
  },
];
