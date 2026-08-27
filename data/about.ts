import { honors, organizations, profile } from "./profile";

export const about = {
  bio: "Software engineer, builder, and Computer Science candidate at Kennesaw State University (December 2026). I work across software engineering, AI/ML, and cybersecurity — shipping systems that hold up in production, from Next.js products to Sentinel pipelines.",
  story: [
    {
      title: "Background",
      body: `Computer Science candidate at ${profile.education.school} (${profile.education.start} – ${profile.education.end}), based in ${profile.location}. Coursework includes ${profile.education.coursework.join(", ")}.`,
    },
    {
      title: "Discovering programming",
      body: "The earliest documented teaching role on the résumé is Coding Instructor at Lutheran Service School (August 2021 – July 2022), mentoring students in Python — including learners with limited English.",
    },
    {
      title: "Teaching and mentorship",
      body: "Mentored 25 students in Python at Lutheran Service School in Clarkston, GA, using projects to build problem-solving and independent coding skills.",
    },
    {
      title: "Engineering approach",
      body: "Work is tied to a metric: ServiceNow backlog 80% → 20%, UpCancer throughput +15% and latency +20%, TrueSpice load time −30%, DevDash reporting time −80%, Sentinel ingestion validated with KQL schema checks.",
    },
    {
      title: "Life outside code",
      body: "The Gallery documents training, cars, and the road — original photographs, not stock.",
    },
  ],
  journey: [
    {
      year: "2021",
      title: "Began teaching Python",
      detail: "Coding instructor at Lutheran Service School in Clarkston, GA.",
    },
    {
      year: "2022",
      title: "Began Computer Science degree",
      detail: `Started the ${profile.education.degree} program at ${profile.education.school}.`,
    },
    {
      year: "2024",
      title: "First software engineering internship",
      detail: "Python and TypeScript microservices at UpCancer.",
    },
    {
      year: "2025",
      title: "Web, AI, and enterprise IT",
      detail: "TrueSpice, Headstarter AI, then Wellstar ServiceNow platforms.",
    },
    {
      year: "2026",
      title: "Cybersecurity experience and expected graduation",
      detail: "Shaw Industries Sentinel co-op; degree expected December 2026.",
    },
  ],
  values: [
    {
      title: "Curiosity",
      body: `I learn by building — coursework in ML and deep learning, five Headstarter AI systems, and ${honors.hackathonWins}× hackathon wins.`,
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
  organizations: [...organizations],
  interests: [
    { label: "Training", source: "Gallery" },
    { label: "Automotive", source: "Gallery" },
    { label: "Travel photography", source: "Gallery" },
  ],
  // TODO: Spoken languages are not listed on the résumé. Do not display in the public UI until verified.
  languages: [] as string[],
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
};
