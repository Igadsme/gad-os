import { honors, organizations, profile } from "./profile";

export const about = {
  bio: "Software engineer, builder, and Computer Science candidate at Kennesaw State University (December 2026). I work across software engineering, AI/ML, and cybersecurity — shipping systems that hold up in production, from Next.js products to Sentinel pipelines.",
  highlights: [
    {
      title: "Teaching and mentorship",
      body: "Mentored 25 students in Python as a coding instructor at Lutheran Service School, including learners with limited English.",
      icon: "graduation" as const,
    },
    {
      title: "Building through curiosity",
      body: `${honors.hackathonWins}× hackathon winner and ${honors.hackathonParticipations}× participant, plus Dean’s List (${honors.deansList}×) and President’s List (${honors.presidentsList}×).`,
      icon: "sparkles" as const,
    },
    {
      title: "Community",
      body: `Active member of ${organizations.join(", ")}.`,
      icon: "users" as const,
    },
    {
      title: "Beyond the code",
      body: "Life outside the editor: training, cars, and the road. The Gallery is the unfiltered side of that.",
      icon: "heart" as const,
    },
  ],
  journey: [
    {
      year: "2021",
      title: "Started teaching Python",
      detail: "Coding instructor at Lutheran Service School in Clarkston, GA.",
    },
    {
      year: "2022",
      title: "Kennesaw State",
      detail: `Began the ${profile.education.degree} program.`,
    },
    {
      year: "2024",
      title: "First software internship",
      detail: "Python and TypeScript microservices at UpCancer.",
    },
    {
      year: "2025",
      title: "Web, AI, and health IT",
      detail: "TrueSpice, Headstarter AI, then Wellstar ServiceNow platforms.",
    },
    {
      year: "2026",
      title: "Cybersecurity and graduation",
      detail: "Shaw Industries Sentinel co-op; degree expected December 2026.",
    },
  ],
  values: [
    {
      title: "Curiosity",
      body: "I learn by building — coursework in ML and deep learning, five Headstarter AI systems, and hackathons.",
    },
    {
      title: "Reliability",
      body: "The work I put my name on has a metric: latency, backlog, load time, or ingestion accuracy.",
    },
    {
      title: "Impact",
      body: "I want the next role to use software, AI, or security to remove real operational drag.",
    },
  ],
};
