export const profile = {
  name: "Imani Gad",
  initials: "IG",
  firstName: "Imani",
  headline: "Software Engineer · AI Builder · Cybersecurity",
  headlineParts: ["Software Engineer", "AI Builder", "Cybersecurity"] as const,
  email: "gad.imani@yahoo.com",
  phone: "(404) 932-1821",
  location: "Atlanta, GA",
  locationFull: "Atlanta, GA, USA",
  linkedin: "https://www.linkedin.com/in/igad",
  linkedinHandle: "linkedin.com/in/igad",
  github: "https://github.com/Igadsme",
  githubHandle: "github.com/Igadsme",
  website: "https://imanigad.com",
  availability: "Open to opportunities" as const,
  openTo: [
    "Software engineering roles",
    "AI/ML roles",
    "Cybersecurity roles",
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
    label: "Internships & co-ops",
    value: "5",
    detail: "UpCancer, TrueSpice, Headstarter, Wellstar, Shaw",
  },
  {
    label: "Named systems",
    value: "7+",
    detail: "Two featured products plus five Headstarter AI systems",
  },
  {
    label: "Hackathon winner",
    value: "6×",
    detail: "12 hackathons participated",
  },
  {
    label: "Domains",
    value: "3",
    detail: "Software engineering, AI/ML, cybersecurity",
  },
] as const;
