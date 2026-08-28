export const profile = {
  name: "Imani Gad",
  initials: "IG",
  firstName: "Imani",
  headline: "Software Engineer building AI-powered products and secure backend systems.",
  supportingLine: "Full-stack engineering · Applied AI · Security automation",
  headlineParts: ["Full-stack engineering", "Applied AI", "Security automation"] as const,
  email: "gad.imani@yahoo.com",
  phone: "(404) 932-1821",
  location: "Atlanta, GA",
  locationFull: "Atlanta, GA, USA",
  linkedin: "https://www.linkedin.com/in/igad",
  linkedinHandle: "linkedin.com/in/igad",
  github: "https://github.com/Igadsme",
  githubHandle: "github.com/Igadsme",
  website: "https://imanigad.com",
  availability: "Open to internships and new-grad SWE" as const,
  availabilityFull:
    "Open to internships and new-grad software engineering opportunities",
  openTo: [
    "Software engineering internships",
    "New-grad software engineering roles",
    "Applied AI and security-focused product teams",
  ] as const,
  education: {
    school: "Kennesaw State University",
    schoolShort: "KSU",
    degree: "Bachelor of Science in Computer Science",
    degreeShort: "B.S. Computer Science",
    status: "Candidate for Bachelor of Science in Computer Science",
    location: "Kennesaw, GA",
    start: "August 2022",
    end: "December 2026",
    startIso: "2022-08",
    endIso: "2026-12",
    coursework: [
      "Data Structures",
      "Operating Systems",
      "Machine Learning",
      "Algorithm Analysis",
      "Deep Learning",
    ],
  },
  avatar: "/images/profile.jpg",
  resumePdf: "/resume/Imani-Gad.pdf",
  assistantName: "April",
  productName: "Imani Gad",
} as const;

export const honors = {
  hackathonWins: 6,
  hackathonParticipations: 12,
  deansList: 3,
  presidentsList: 1,
} as const;

export const organizations = [
  "IEEE Computer Society",
  "SHPE",
  "KSU AI Club",
  "KSU ColorStack",
] as const;

export const stats = [
  {
    label: "Engineering roles",
    value: "5",
    detail: "Internships, a co-op, and a software engineering fellowship",
  },
  {
    label: "Selected projects",
    value: "6",
    detail: "Full-stack, applied AI, and security systems",
  },
  {
    label: "KSU AI Club hackathon",
    value: "2nd/23",
    detail: "NestAI placed second out of 23 teams",
  },
  {
    label: "B.S. Computer Science",
    value: "Dec 2026",
    detail: "Kennesaw State University",
  },
] as const;
