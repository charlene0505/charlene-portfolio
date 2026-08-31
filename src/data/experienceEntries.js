// Add one entry per job. Order here is the order they render in, top to bottom.
//
// Two dates below are approximate: IoT AWS Mobile Gateway and QuickQuack don't
// have a source folder I could verify against (they only exist as entries on
// an earlier version of your CV), so their timelines are best guesses, not
// pulled from git history like the rest. Everything else's timeline is pulled
// from real commit dates or file timestamps, worth a quick sanity check before
// this goes live either way.
export const experienceEntries = [
  // ---- Jobs ----
  {
    role: "Web Developer",
    company: "Code&",
    timeline: "Oct 2025 — Present",
    description:
      "- Ship and maintain features across a fleet of 40+ production WordPress sites for an agency's client base. \n- Built and maintain Ansible automation that runs monthly update and regression checks across the whole fleet, replacing what used to be a manual, error prone process. \n- Wrote Python and Playwright test suites covering more than 90% of front end and back end functionality, integrated into every staging and production deploy. \n- Delivered client feature requests end to end, from custom plugins to content updates, maintaining 100% positive feedback on communication and turnaround. \n- Also authored internal reviews of plugin update tooling that surfaced concurrency, visibility, and credential management gaps across 16+ repositories.",
    tags: [
      "PHP",
      "WordPress",
      "Ansible",
      "Composer",
      "Playwright",
      "GitHub Actions",
      "MariaDB",
    ],
  },
  {
    role: "Software Developer",
    company: "AWO",
    timeline: "Jan 2025 — Sept 2025",
    description:
      "- Built a full stack e-commerce platform end to end in a small startup team: a React and Tailwind CSS frontend with cart state management and client side form validation, a Python Flask REST API backed by Firebase Firestore for real time data sync, and Firebase Auth for secure user authentication. \n- Integrated the Shopify Storefront API through a custom app extension, handling inventory sync, webhook driven order processing, and payment gateway integration, so orders placed on the storefront stayed consistent with inventory and fulfillment on the backend.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "Flask",
      "Firebase",
      "Shopify API",
    ],
  },
  {
    role: "Front-end Developer",
    company: "Year13",
    timeline: "May 2025",
    description:
      "- Debugged and resolved production issues across a Vue 3 frontend and PHP backend using browser DevTools and Xdebug for root cause analysis. \n- Implemented i18n localization with vue-i18n, supporting dynamic language switching with lazy loaded translation files so new locales could be added without touching the core app. \n- Also researched and documented LangChain and OpenAI API integration patterns for a planned AI agent feature, covering prompt engineering and context management strategies the team could build on.",
    tags: ["Vue.js", "PHP", "LangChain", "OpenAI API", "i18n", "Xdebug"],
  },
  {
    role: "Front-end Developer Intern",
    company: "TidyTeddy",
    timeline: "Mar 2025 — Sep 2025",
    description:
      "- Collaborated directly with the UI/UX team to translate Figma designs into pixel perfect, accessible React and Next.js components. \n- Generalized that work into a documented, reusable component library built around atomic design principles, so new features could be assembled from existing, tested pieces instead of rebuilt from scratch each time.",
    tags: ["React", "Next.js", "TypeScript", "Figma", "Atomic Design"],
  },
];
