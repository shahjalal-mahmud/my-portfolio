// src/components/ProjectsData.js
const projects = [
  {
    slug: "studysync",
    name: "StudySync App",
    description: "An Android productivity app for students to manage tasks, notes, and study plans efficiently.",
    skills: ["Kotlin", "Jetpack Compose", "Firebase"],
    extras: ["MVVM", "Room", "Coroutines", "Retrofit"],
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
    github: "https://github.com/yourusername/studysync-app",
    live: "https://play.google.com/store/apps/details?id=com.yourdomain.studysync",
    story: "This app was created to help students organize their study habits during my second year of university when I noticed how disorganized my peers were with their study materials.",
    features: ["Task Management", "Note Taking", "Daily Reminders", "Pomodoro Timer", "Grade Tracker"],
    documentation: "Available on GitHub wiki with detailed setup instructions.",
    readme: "See README.md in repo for basic setup and features overview.",
    problem: "Students often lose track of notes, deadlines, and struggle with time management between classes.",
    objective: "Provide one unified platform for all academic productivity tools with cloud sync capabilities.",
    scope: "Focus on university students using Android phones with potential iOS expansion later.",
    flowchart: "Diagram available in the docs folder showing data flow and architecture.",
    architecture: "MVVM with repository pattern, Room DB for local storage, and Firebase for cloud sync.",
    challenges: "Sync issues with Firebase real-time updates and conflict resolution between devices.",
    limitations: "Currently Android-only, lacks tablet optimization, and has basic UI customization.",
    contributions: "Solo Project - Designed UI, implemented features, and handled deployment.",
    future: "Add AI study plan recommender, collaborative study groups, and PDF annotation features.",
    conclusion: "Early beta tests with 50 students showed 78% reported improved organization and time management.",
  }
];

export default projects;
