export type ActivityItem = {
  id: string;
  title: string;
  detail?: string;
  occurred: string;
  icon: "rocket" | "code" | "shield" | "building";
};

export const activity: ActivityItem[] = [
  {
    id: "gad-os",
    title: "Building Gad OS",
    detail: "Personal product and AI assistant",
    occurred: "Now",
    icon: "rocket",
  },
  {
    id: "wellstar-complete",
    title: "Completed Wellstar internship",
    detail: "IT Platforms Applications Intern",
    occurred: "Jul 2026",
    icon: "building",
  },
  {
    id: "shaw-complete",
    title: "Completed Shaw cybersecurity co-op",
    detail: "Microsoft Sentinel ingestion",
    occurred: "Jun 2026",
    icon: "shield",
  },
];

export const currentlyBuilding = {
  name: "April",
  status: "BETA",
  title: "April AI",
  description:
    "Career assistant grounded in Imani’s résumé, projects, and experience — available here in Gad OS.",
  href: "/assistant",
};
