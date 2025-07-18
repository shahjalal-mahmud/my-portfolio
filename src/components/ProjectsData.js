// src/components/ProjectsData.js
const projects = [
  {
    slug: "prodorshok",
    name: "Prodorshok - AI Career Companion",
    description: "An AI-powered career guidance app that helps students discover personalized career paths with mentorship support, addressing career confusion in Bangladesh.",
    skills: ["Kotlin", "Jetpack Compose", "Firebase", "Deepseek AI API", "Git"],
    extras: ["MVVM", "Coroutines", "Retrofit", "Firestore", "Authentication"],
    image: "/projects/prodorshok/prodorshok_logo.png",
    media: [
      "/projects/prodorshok/login.png",
      "/projects/prodorshok/signin.png",
      "/projects/prodorshok/dashboard.png",
      "/projects/prodorshok/profile.png",
      "/projects/prodorshok/chatAI.png",
      "/projects/prodorshok/suggestedCareer.png",
      "/projects/prodorshok/roadmap.png",
      "/projects/prodorshok/feedback.png",
      "/projects/prodorshok/allFeedback.png",
    ],
    github: "https://github.com/shahjalal-mahmud/Prodorshok",
    live: null, // (or Play Store link if published)
    story: "Born from personal struggles with career choices in Bangladesh's education system where 90% of students feel lost. After surveying 150+ students across 10 universities, I built this solution to democratize career guidance beyond traditional paths like medicine/engineering.",
    features: [
      "AI-powered career suggestions",
      "Personalized skill gap analysis",
      "Interactive career roadmaps",
      "Human mentor matching system",
      "Multi-factor authentication",
      "Feedback ecosystem for continuous improvement"
    ],
    documentation: "Comprehensive docs in GitHub repo including API integration guide for Deepseek R1",
    readme: "Detailed README with setup instructions, screenshots, and architecture overview",
    problem: "63% of Bangladeshi students lack mentors, 65% regret academic choices due to societal pressure toward limited traditional careers.",
    objective: "Create an accessible platform combining AI analysis with human mentorship to reveal diverse career opportunities.",
    scope: "Initially targets Bangladeshi high school/university students, with scalability for other regions.",
    flowchart: "Career suggestion algorithm flow documented in /docs/flowchart.pdf",
    architecture: "MVVM with Firebase backend (Auth/Firestore), Deepseek R1 API for AI, Jetpack Compose UI",
    challenges: [
      "Integrating free-tier AI API with rate limiting",
      "Designing adaptive career roadmaps",
      "Matching algorithm for mentor-student pairing",
      "Localizing content for Bangladeshi education system"
    ],
    limitations: [
      "Currently Bengali language support in progress",
      "Mentor network needs expansion",
      "Offline functionality limited"
    ],
    contributions: "Solo Project - Conceived, designed, developed, and tested all components including:",
    future: [
      "Expand mentor network nationwide",
      "Add university admission guidance module",
      "Integrate skill-based course recommendations",
      "Develop web portal for mentors"
    ],
    conclusion: "Early testing shows 82% of users found new career options they hadn't considered, with particular success helping science students discover non-traditional tech paths.",
    metrics: [
      "150+ student survey conducted",
      "90% target user problem validation",
      "10+ university contexts addressed"
    ],
    techStack: {
      frontend: ["Jetpack Compose", "Material 3"],
      backend: ["Firebase Auth", "Firestore", "Storage"],
      ai: ["Deepseek R1 API"],
      networking: ["Retrofit", "OkHttp"],
      utilities: ["Coil", "Lottie Animations", "Markdown Rendering"]
    }
  },
   {
    slug: "mobifixer",
    name: "MobiFixer - Phone Servicing Management",
    description: "An Android app that digitizes customer management for mobile repair shops, replacing manual sticker-based tracking with efficient digital records and deadline alerts.",
    skills: ["Java", "SQLite", "Firebase Auth", "Android SDK"],
    extras: ["Jetpack Navigation", "RecyclerView", "Merge Sort", "Binary Search"],
    image: "/projects/mobifixer/mobifixer_logo.png",
    media: [
      "/projects/mobifixer/login.png",
      "/projects/mobifixer/dashboard.png",
      "/projects/mobifixer/add_customer.png",
      "/projects/mobifixer/search_customer.png"
    ],
    github: "https://github.com/shahjalal-mahmud/MobiFixer",
    live: null, // (Play Store link if published)
    story: "Inspired by a local repair shop's struggle with handwritten stickers for device tracking. The owner needed a way to search customers by phone number (not arbitrary IDs) and prioritize repairs by deadline - which existing solutions didn't provide.",
    features: [
      "Customer CRUD operations",
      "Phone-number-first search",
      "Delivery deadline sorting",
      "UUID-based customer IDs",
      "Firebase authentication",
      "Repair status tracking"
    ],
    documentation: "Architecture diagrams and SQLite schema in /docs",
    readme: "Includes setup guide and demo video link",
    problem: "68% of small repair shops use error-prone manual tracking (based on local survey), leading to delayed repairs and lost devices.",
    objective: "Create an affordable digital solution that fits the workflow of small repair shops.",
    scope: "Focuses on Bangladeshi local repair shops initially, with potential to scale.",
    flowchart: "/projects/mobifixer/flowchart.png", // Reference to your Figure 1
    architecture: "3-Tier: Presentation (Android UI), Business Logic (Java), Data (SQLite + Firebase Auth)",
    challenges: [
      "Implementing binary search for 200ms phone number lookup",
      "Preventing duplicate entries with UUIDs",
      "Firebase Auth integration hurdles"
    ],
    limitations: [
      "Local-only storage (no cloud sync yet)",
      "Single search parameter (phone number)",
      "Basic notification system"
    ],
    contributions: [
      "Solo developed all components",
      "Custom merge sort implementation for deadline sorting",
      "Designed intuitive RecyclerView UI"
    ],
    future: [
      "Cloud sync with Firestore",
      "SMS notifications to customers",
      "Multi-user role support"
    ],
    conclusion: "Reduced device retrieval time by 70% in pilot testing at a local shop, eliminating sticker-based tracking errors.",
    metrics: [
      "200ms search response time",
      "68% manual process improvement",
      "Zero duplicate entries achieved"
    ],
    techStack: {
      core: ["Java", "Android SDK"],
      database: ["SQLite", "Room"],
      auth: ["Firebase Authentication"],
      ui: ["Jetpack Navigation", "RecyclerView"],
      algorithms: ["Binary Search", "Merge Sort", "UUID Generation"]
    },
    researchInsights: [
      "Adapted SQLite best practices from [4]",
      "Avoided over-engineering per [5]",
      "Prioritized phone-number search over IDs based on user interviews"
    ]
  }
];

export default projects;
