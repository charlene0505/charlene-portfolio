import { writingPosts } from './writing'
import { sketches } from './sketches'
import { photos } from "./photos";
import { crafts } from "./crafts";


export const columns = [
  {
    id: "creative",
    label: "(Creative)",
    name: "Notebook",
    subtitle: "Sketches & Writing",
    subcategories: [
      { id: "writing", label: "Writing", kind: "writing", items: writingPosts },
      {
        id: "sketching",
        label: "Sketching",
        kind: "sketching",
        items: sketches,
      },
      {
        id: "photography",
        label: "photography",
        kind: "photography",
        items: photos,
      },
      {
        id: "crafts",
        label: "crafts",
        kind: "crafts",
        items: crafts,
      },
    ],
  },
  {
    id: "work",
    label: "(Experience)",
    name: "Experience",
    subtitle:
      "Software engineer who works comfortably across the stack, with genuine curiosity about technology and users.",
    layout: "experience",
    items: [
      {
        name: "role1",
        timeline: "",
        tags: [],
        images: [],
        link: "#",
        desc: "Placeholder — replace with a real role: company, dates, what you owned, and one interesting decision worth explaining in an interview.",
      },
      {
        name: "role 2",
        timeline: "",
        tags: [],
        images: [],
        link: "#",
        desc: "Placeholder — replace with a real role: company, dates, what you owned, and one interesting decision worth explaining in an interview.",
      },
    ],
  },
  {
  id: "education",
  label: "(Education)",
  name: "Education",
  subtitle: "Graduate studies in Sydney, undergrad in Shanghai, one semester in the US.",
  layout: "education",
  items: [
    {
      name: "Master of Information Technology, UNSW",
      timeline: "Feb 2024 — Dec 2025",
      tags: ["Distinction", "WAM 79", "TEDxUNSW", "Software Development Society"],
      images: [],
      link: "https://www.unsw.edu.au",
      desc: `• Graduated with Distinction, WAM 79.
• Coursework spanned software construction, data structures and algorithms, database systems, computer networks, recommender systems, and a real time speech AI capstone project.
• Active in TEDxUNSW and the Software Development Society Subcommittee, and reached the semi-final of the Peter Farrell Cup Pitch Competition.`,
    },
    {
      name: "Bachelor of Management, Public Relations, Shanghai International Studies University",
      timeline: "Sep 2017 — Jul 2021",
      tags: ["Outstanding Graduate 2021", "National Student Innovation Contest"],
      images: [],
      link: "https://www.shisu.edu.cn",
      desc: `• Named Outstanding Graduate 2021.
• Won an award at the National Student Innovation Contest.
• Built a foundation in communication and stakeholder management that still shows up in how I work with clients and cross-functional teams today.`,
    },
    {
      name: "Exchange Program, University of North Carolina Wilmington",
      timeline: "Aug 2019 — Dec 2019",
      tags: ["Dean's List"],
      images: [],
      link: "https://uncw.edu",
      desc: `• One semester exchange, Fall 2019.
• Made the Dean's List for academic performance.`,
    },
  ],
},
  {
    id: "tech",
    label: "(Tech)",
    name: "24ish",
    subtitle: "OneHourAPicture — Photo Sharing App",
    layout: "projects",
    items: [
      {
        name: "24ish",
        timeline: "2024",
        tags: ["React", "Node.js", "MongoDB", "Deployed"],
        images: [],
        link: "#",
        intro:
          "A photo-sharing app, also known as OneHourAPicture, built with React, Node.js, and MongoDB and deployed live. Replace with the real problem statement, stack decisions, and one interesting technical challenge.",
        desc: "[Placeholder — please confirm/expand] ",
      },
      {
        name: "3D Showcase",
        timeline: "2026",
        tags: ["Three.js", "React Three Fiber", "WebGL"],
        images: [],
        link: "#",
        intro:
          "An interactive character customizer built with Three.js and React Three Fiber — pick a color and a hat, rendered live in real-time WebGL, not a screenshot.",
        embed: "three-demo",
        desc: "[Placeholder — please confirm/expand] ",
      },
    ],
  },
];
