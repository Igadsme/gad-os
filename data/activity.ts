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
    title: "2nd of 23 teams",
    detail: "NestAI · KSU AI Club hackathon",
    occurred: "May 2025",
    icon: "trophy",
  },
];
