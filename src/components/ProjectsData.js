// src/components/ProjectsData.js
const projects = [
  {
    slug: "repair-store-manager",
    name: "Repair Store Manager - POS & ERP",
    description: "A production-ready Android ERP system for repair shops. Digitizes customer tracking, automated SMS updates, and Bluetooth thermal printing for real-world business operations.",
    skills: ["Kotlin", "Jetpack Compose", "Firebase", "Bluetooth API", "WorkManager"],
    extras: ["MVVM", "Clean Architecture", "Firestore", "POS Printing", "Material 3"],
    image: "/projects/repair-store/logo.png",
    media: [
      "/projects/repair-store/dashboard.jpeg",
      "/projects/repair-store/add_customer_screen.jpeg",
      "/projects/repair-store/customer_list.jpeg",
      "/projects/repair-store/profile_screen.jpeg",
      "/projects/repair-store/stock_management_screen.jpeg",
      "/projects/repair-store/trasection_screen.jpeg"
    ],
    github: "https://github.com/shahjalal-mahmud/RepairStoreManager",
    live: "https://drive.google.com/file/d/1m7_lfMzOZHbpO7EsQEGvl3I9crFPEuTQ/view?usp=sharing", 
    story: "Witnessing local repair shops struggle with manual paper ledgers and lost customer stickers, I built a digital-first solution. Unlike generic apps, this was built in the 'trenches' with feedback from 5 active shop owners to handle real-world chaos like dual-SIM SMS and thermal printer pairing.",
    features: [
      "Automated SMS/WhatsApp status updates",
      "Bluetooth POS Thermal Printing (58mm/80mm)",
      "Daily repair reminders via WorkManager",
      "Full Inventory & Stock Management",
      "Tali Khata (Due Management) & Profit Analytics",
      "Real-time Firestore Sync with offline support"
    ],
    documentation: "Complete system workflow, hardware integration guides, and MVVM architecture breakdown available in GitHub Wiki.",
    readme: "Comprehensive guide covering Firebase setup, Bluetooth pairing logic, and APK installation.",
    problem: "Small repair shops face a 40% customer churn rate due to lost records and lack of communication during the repair lifecycle.",
    objective: "To provide an affordable, hardware-compatible ERP that automates the entire repair shop workflow on a mobile device.",
    scope: "Targeted at mobile/computer repair SMEs in Bangladesh; architecture designed for multi-branch scalability.",
    flowchart: "/projects/repair-store/system_workflow.png",
    architecture: "MVVM with Repository Pattern: Jetpack Compose (UI), Kotlin Coroutines (Async), Firestore (NoSQL), WorkManager (Background Tasks).",
    challenges: [
      "Implementing low-latency Bluetooth pairing for diverse POS printers",
      "Managing complex state transitions (Pending → Repaired → Delivered)",
      "Syncing offline transactions once connection is restored",
      "Formatting automated SMS for international standards (+880)"
    ],
    limitations: [
      "Web dashboard currently in development",
      "iOS version not yet available",
      "Advanced accounting module pending"
    ],
    contributions: "Solo Founder & Developer - Conducted market research, designed System Design, developed full-stack Android app, and managed beta testing for 5 shops.",
    future: [
      "Launch Web-based admin dashboard",
      "Integrate WhatsApp Cloud API",
      "Add multi-branch inventory syncing",
      "Implement a subscription-based SaaS model"
    ],
    conclusion: "Validated by real-world usage across multiple shops; proven to reduce administrative overhead by 60% and eliminate paper-based record errors.",
    metrics: [
      "5+ Active Shop Beta Testers",
      "900mm/s Print Pairing Optimization",
      "100% Data Persistence across devices",
      "Zero manual ledger dependency"
    ],
    techStack: {
      frontend: ["Jetpack Compose", "Material 3"],
      backend: ["Firebase Auth", "Firestore", "Storage"],
      hardware: ["Bluetooth POS API", "Thermal Printing Library"],
      logic: ["MVVM", "Coroutines", "WorkManager", "Room DB"],
      utilities: ["Coil", "Lottie Animations", "Gson"]
    }
  },
  {
    slug: "prodorshok",
    name: "Prodorshok - AI Career Companion",
    description: "An AI-powered career guidance app that helps students discover personalized career paths with mentorship support, addressing career confusion in Bangladesh.",
    skills: ["Kotlin", "Jetpack Compose", "Firebase", "Deepseek AI API", "Git"],
    extras: ["MVVM", "Coroutines", "Retrofit", "Firestore", "Authentication"],
    image: "/projects/prodorshok/prodorshok_logo.png",
    media: [
      "/projects/prodorshok/login.png",
      "/projects/prodorshok/dashboard.png",
      "/projects/prodorshok/chatAI.png",
      "/projects/prodorshok/roadmap.png",
    ],
    github: "https://github.com/shahjalal-mahmud/Prodorshok",
    live: "https://drive.google.com/file/d/1f74Z32Zrevh6W5p_Rp-MG6c1_3o33AVy/view?usp=sharing",
    story: "Born from personal struggles with career choices in Bangladesh. After surveying 150+ students across 10 universities, I built this to democratize career guidance beyond traditional paths like medicine/engineering.",
    features: [
      "AI-powered career suggestions",
      "Personalized skill gap analysis",
      "Interactive career roadmaps",
      "Human mentor matching system",
      "Multi-factor authentication"
    ],
    documentation: "API integration guide for Deepseek R1 included.",
    readme: "Detailed README with architecture overview and setup instructions.",
    problem: "65% of students regret academic choices due to societal pressure; lack of accessible mentors.",
    objective: "Combine AI analysis with human mentorship to reveal diverse career opportunities.",
    scope: "Initially targets Bangladeshi high school/university students.",
    flowchart: "Documented in /docs/flowchart.pdf",
    architecture: "MVVM with Firebase backend, Deepseek R1 API, Jetpack Compose UI",
    challenges: [
      "AI API rate limiting management",
      "Designing adaptive roadmaps",
      "Matching algorithm for mentor-student pairing"
    ],
    limitations: [
      "Bengali language support in progress",
      "Mentor network needs expansion"
    ],
    contributions: "Solo Project - Conceived, designed, and developed all components.",
    future: [
      "Expand mentor network nationwide",
      "Add university admission guidance module",
      "Develop web portal for mentors"
    ],
    conclusion: "Early testing shows 82% of users found new career options they hadn't considered.",
    metrics: [
      "150+ student survey conducted",
      "90% problem validation",
      "10+ university contexts addressed"
    ],
    techStack: {
      frontend: ["Jetpack Compose", "Material 3"],
      backend: ["Firebase Auth", "Firestore", "Storage"],
      ai: ["Deepseek R1 API"],
      networking: ["Retrofit", "OkHttp"]
    }
  },
  {
    slug: "cashguard-ai",
    name: "CashGuard AI - Counterfeit Detection",
    description: "An AI-powered computer vision app built for the SOLVIO Hackathon 2025. Detects counterfeit Bangladeshi banknotes in real-time with 98.7% accuracy using on-device machine learning.",
    skills: ["TensorFlow Lite", "CameraX", "Kotlin", "OpenCV", "Jetpack Compose"],
    extras: ["Image Analysis", "CNN Models", "Material 3", "MVVM", "Offline ML"],
    image: "/projects/cashguard-ai/logo.png",
    media: [
      "/projects/cashguard-ai/dashboard.jpg",
      "/projects/cashguard-ai/authentic_result.jpg",
      "/projects/cashguard-ai/counterfeit_result.jpg",
      "/projects/cashguard-ai/splash.jpg"
    ],
    github: "https://github.com/shahjalal-mahmud/CashGuardAI",
    live: "https://drive.google.com/file/d/1lYBpXFjjI7-nI2asTUq9ow83-BPY0ck7/view?usp=sharing",
    story: "Circulation of fake currency is a major economic threat in Bangladesh. During the SOLVIO AI Hackathon, my team (Team Drishty) and I decided to tackle this by moving detection from expensive bank machines directly onto the user's smartphone. I led the technical development, focusing on making the AI model run smoothly on-device without needing an internet connection.",
    features: [
      "Real-time scanning using CameraX ImageAnalysis",
      "Offline TFLite model inference (No data required)",
      "Smart Analysis Optimization (1.5s intervals to save battery)",
      "Confidence-based result validation (80% threshold)",
      "Educational mode for security feature explanations",
      "Dynamic UI feedback based on detection confidence"
    ],
    documentation: "Extensive technical documentation including dataset preparation (1000+ images) and system architecture diagrams.",
    readme: "Full setup guide for Android Studio, TFLite model integration, and hardware requirements.",
    problem: "Small merchants and individuals in Bangladesh lose millions annually to counterfeit notes because they lack professional detection tools.",
    objective: "Democratize financial security by providing a 98% accurate detection tool accessible to anyone with a smartphone.",
    scope: "Currently optimized for 200 Taka notes; architecture ready for all Bangladeshi denominations.",
    flowchart: "/projects/cashguard/system_workflow.png",
    architecture: "Convolutional Neural Network (CNN) deployed via TensorFlow Lite. UI built with Jetpack Compose using a 3-tier architecture (Camera Input -> Processing -> AI Classification).",
    challenges: [
      "Optimizing the CNN model to run under 15MB for mobile deployment",
      "Ensuring 95%+ accuracy in low-light and partial-view scenarios",
      "Managing the CameraX lifecycle to prevent memory leaks during continuous analysis",
      "Reducing false positives from worn-out or folded authentic notes"
    ],
    limitations: [
      "Requires well-lit environments for maximum accuracy",
      "Currently limited to 200 Taka notes",
      "Ultra-wide or macro lens support is experimental"
    ],
    contributions: "Project Lead & Android Developer - Architected the CameraX-TFLite pipeline, designed the modern M3 interface, and optimized the classification logic for real-time performance.",
    future: [
      "Expand support to 500 & 1000 Taka notes",
      "Integrate UV/Hologram detection via specialized image processing",
      "Add full Bangla language localization",
      "Blockchain-backed verification records for financial institutions"
    ],
    conclusion: "Ranked as a top-tier project in SOLVIO 2025, proving that on-device AI can effectively solve high-impact financial security challenges in developing nations.",
    metrics: [
      "98.7% Model Validation Accuracy",
      "Under 3s Analysis Speed",
      "1000+ Custom Image Dataset",
      "Top 100 Global AI Hackathon Project"
    ],
    techStack: {
      frontend: ["Jetpack Compose", "Material 3"],
      ai_ml: ["TensorFlow Lite", "CNN", "Google Teachable Machine"],
      camera: ["CameraX", "ImageAnalysis API"],
      image_processing: ["OpenCV", "Bitmaps"],
      logic: ["Kotlin Coroutines", "MVVM", "Navigation Component"]
    }
  },
  {
    slug: "teacher-portfolio",
    name: "Dynamic Portfolio for Educators",
    description: "A fully dynamic personal portfolio website tailored for university teachers, featuring a real-time Firestore backend and secure admin dashboard.",
    skills: ["React", "Firebase", "Tailwind CSS", "Firestore", "DaisyUI"],
    extras: ["React Router", "Framer Motion", "React Toastify", "Admin Auth"],
    image: "/projects/teacher-portfolio/1.png",
    media: [
      "/projects/teacher-portfolio/2.png",
      "/projects/teacher-portfolio/landing.png",
    ],
    github: "https://github.com/shahjalal-mahmud/portfolio-nag-sir",
    live: "https://anindyanag.netlify.app/",
    story: "A university teacher needed to showcase research and publications without touching code. I built this to explore fullstack React while solving a real administrative need.",
    features: [
      "Admin-only dashboard with Firebase Auth",
      "Real-time CRUD for Publications & Education",
      "Year-based dynamic filtering",
      "Smart CV & image management"
    ],
    documentation: "Admin instructions included in repo.",
    readme: "Includes Firebase rules guide and editing workflow.",
    problem: "Academic professionals often lack the technical skills to maintain updated digital profiles.",
    objective: "Create a zero-coding content management experience for educators.",
    scope: "Designed for academic professionals but adaptable for any CV-heavy profile.",
    flowchart: "/projects/teacher-portfolio/architecture.png",
    architecture: "React frontend, Firebase Auth, Firestore real-time DB.",
    challenges: [
      "Designing nested dynamic tabs",
      "Handling secure file upload flow",
      "Optimizing Firestore sync to minimize re-renders"
    ],
    limitations: [
      "Single-user admin only",
      "External image hosting dependency"
    ],
    contributions: "Solo project – planned, designed, developed, and deployed.",
    future: [
      "Markdown-based publication import",
      "Google Scholar API integration"
    ],
    conclusion: "Successfully empowered a non-technical teacher to manage an elegant academic presence.",
    metrics: [
      "20+ dynamic content sections",
      "6 CRUD categories",
      "Deployed and actively used"
    ],
    techStack: {
      frontend: ["React", "Tailwind CSS", "DaisyUI"],
      backend: ["Firebase Auth", "Firestore"],
      utilities: ["Framer Motion", "React Router"]
    }
  },
];

export default projects;