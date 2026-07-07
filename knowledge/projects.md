# Projects

Projects are grouped by status: Production/Active, Completed, Engineering Practice, and Legacy (superseded).

---

## 🔴 Production & Active Projects

### Amar Repair — Multi-Tenant SaaS Platform
🔒 Closed Source (Appriyo Product) · 📅 2025 — Present · 🔗 https://github.com/shahjalal-mahmud/Amar_Repair (private)

**Overview:** End-to-end repair business management platform (Android + Backend) built with strict data isolation and role-based access control. This is the flagship rebuild of Shahajalal's original "Repair Store Manager" app.

**Problem Solved:** The original repair-shop management app hit hard limits in data consistency, scalability, and UX once used by a real shop owner under real-world load. Amar Repair was architected from scratch to solve multi-tenant data isolation, transaction safety, and production reliability for repair businesses.

**Technologies Used:** Kotlin, Jetpack Compose, PostgreSQL, JWT, RBAC, REST APIs

**Architecture:** Multi-tenant system architecture with per-tenant data isolation; secure REST APIs with JWT authentication and role-based access control; transaction-safe workflows for payments, repairs, and inventory.

**Key Features:**
- Multi-tenant architecture with strict per-tenant data isolation
- JWT authentication and RBAC authorization
- Transaction-safe payment, repair, and inventory workflows

**Challenges:** The prior version (Repair Store Manager) failed under real production complexity, exposing scalability and data-consistency limitations that required a full rebuild rather than incremental patching.

**Achievements:** 99.9% crash-free Android production performance.

**Current Status:** Active production SaaS product under continued development at Appriyo.

---

### Amar Batch — Offline-First Tutor & Student Management System
🔒 Closed Source (Appriyo Product) · 📅 2025 — Present · 🔗 https://github.com/Appriyo/amar-batch-showcase (private)

**Overview:** Android application enabling tutors to manage students, attendance, and fees — fully functional without an internet connection.

**Problem Solved:** Bangladeshi batch tutors lacked reliable digital tools that work in low/no-connectivity conditions for managing attendance, fees, marks, and student communication. Evolved from an earlier "Teacher Batch Management" offline-first prototype that validated these workflows.

**Technologies Used:** Kotlin, Jetpack Compose, Room DB, MVVM

**Architecture:** Offline-first architecture using Room DB with sync support; efficient local schema optimized for fast queries; MVVM pattern.

**Key Features:**
- Offline-first data architecture with sync support
- Student, attendance, and fee management
- Optimized local Room database schema for fast queries

**Challenges:** Rebuilt after the original prototype exposed architecture limitations; lessons from that prototype directly informed Amar Batch's design.

**Achievements:** Reduced manual administrative workload by ~80%.

**Current Status:** Active production SaaS product under continued development at Appriyo.

---

### AlgoViz — Visual Algorithm Intelligence
🔗 https://github.com/shahjalal-mahmud/algo-viz · 📅 2025 — Present

**Overview:** A VS Code extension for visual data-structures-and-algorithms (DSA) learning, providing step-by-step algorithm animation and complexity detection directly inside the editor.

**Problem Solved:** Makes algorithm behavior and runtime complexity visible and understandable to developers/students without leaving their IDE.

**Technologies Used:** TypeScript, Python, VS Code API, WebView

**Architecture:** Custom visualization engine integrated with the VS Code Extension API, using WebView for rendering animations.

**Key Features:**
- Custom visualization engine for algorithm animation
- Runtime benchmarking
- Empirical complexity detection system
- Interactive step-by-step algorithm animations

**Challenges:** Not detailed in source documents.

**Achievements:** Not detailed in source documents.

**Current Status:** Active development.

---

### Amar Card / NFC Digital Card Platform
🔗 https://appriyo.com · 📅 2025 — Present (production system)

**Overview:** A premium physical-digital networking product with an elite profile engine, integrating NFC technology with a backend-powered dynamic profile system.

**Problem Solved:** Provides a modern physical-to-digital networking experience (digital business card / profile) powered by NFC.

**Technologies Used:** Android, NFC, backend-powered dynamic profiles (specific backend stack not detailed in source documents)

**Architecture:** Not detailed in source documents beyond NFC + backend-driven dynamic profile integration.

**Key Features:** NFC-based digital profile sharing; elite/premium profile engine.

**Challenges:** Not detailed in source documents.

**Achievements:** Not detailed in source documents.

**Current Status:** Production system, part of the Appriyo product suite.

---

### APRA Form — Survey Platform
🔗 https://apraform.netlify.app/ · 📅 2025 — Present

**Overview:** Production-ready survey system built as a replacement for Google Forms, with a custom UI, validation engine, and serverless data pipeline.

**Problem Solved:** Provides a more customizable, validated alternative to generic form tools for structured data collection.

**Technologies Used:** React, Frontend tooling, Serverless architecture

**Architecture:** Serverless data pipeline with a custom frontend validation engine.

**Key Features:** Custom UI, validation engine, serverless backend workflow.

**Challenges:** Not detailed in source documents.

**Achievements:** Not detailed in source documents.

**Current Status:** Live/production.

---

### Personal Portfolio
🔗 https://shahajalalmahmud.netlify.app/ (also referenced as http://shahajalal.me/) · 📅 2024 — Present

**Overview:** High-performance developer portfolio with an advanced theme system (100+ dynamic themes) and responsive architecture.

**Technologies Used:** React, Vite, Tailwind CSS

**Key Features:** 100+ dynamic themes, high-performance responsive design.

**Current Status:** Actively maintained.

---

### Amar Savings
🔗 https://github.com/shahjalal-mahmud/Amar_Savings

**Overview:** Personal savings tracker designed specifically for physical cash and Bangladeshi currency (Taka), built with Room DB.

**Technologies Used:** Kotlin, Room DB (per stack conventions used across Shahajalal's Android projects)

**Current Status:** Listed as a current project on GitHub profile.

---

### Hangug Deulama
🔗 https://deulama.netlify.app/

**Overview:** A personalized K-Drama recommendation system featuring a swipe-based interface for content discovery.

**Technologies Used:** React (per web stack conventions used across Shahajalal's frontend projects)

**Current Status:** Live.

---

### Amar Career
🔗 https://github.com/shahjalal-mahmud/amar-career

**Overview:** Personal job application management system to track applications, deadlines, CV versions, and interview progress in a structured, real-time workflow.

**Current Status:** Listed as a current project.

---

## 🟡 Selected Completed Projects

### CashGuard AI — Fake Currency Detection System
🏆 SOLVIO AI Hackathon 2025 — Top 100 National Finalist
🔗 https://github.com/shahjalal-mahmud/CashGuardAI

**Overview:** Real-time, on-device fake currency detection Android app.

**Problem Solved:** Provides fast, fully offline detection of counterfeit currency without requiring network connectivity or cloud inference.

**Technologies Used:** Kotlin, TensorFlow Lite, Android ML

**Key Features:** Real-time on-device inference; fully offline AI operation.

**Achievements:** 98.7% model accuracy; Top 100 National Finalist at SOLVIO AI Hackathon 2025.

**Current Status:** Completed (hackathon project).

---

### JPMorgan Chase Midas Simulation
🔗 https://github.com/shahjalal-mahmud/forage-midas

**Overview:** Forage-based software engineering job simulation building a transaction processing system.

**Technologies Used:** Java, Spring Boot, Apache Kafka, JPA

**Architecture:** Event-driven transaction processing pipeline using Kafka streaming with database persistence and REST APIs.

**Key Features:** Kafka streaming pipeline, transactional persistence workflows, REST APIs.

**Current Status:** Completed (Forage certification: "Software Engineering Job Simulation," issued May 2026).

---

### FinPaySDK — Secure Android Payment SDK
🔗 https://github.com/shahjalal-mahmud/FinPayDemo

**Overview:** Secure Android payment SDK.

**Technologies Used:** Kotlin, Android Keystore, AES-256

**Key Features:** AES-256 encryption workflows, modular SDK architecture.

**Achievements:** Full test coverage.

**Current Status:** Completed.

---

### Prodorshok — AI Career Companion
🔗 https://github.com/shahjalal-mahmud/Prodorshok

**Overview:** AI-powered career guidance platform for Bangladeshi students.

**Technologies Used:** Kotlin, Jetpack Compose, GPT-3.5, REST APIs

**Current Status:** Completed (past project).

---

### Portfolio Nag Sir
🔗 https://anindyanag.netlify.app/

**Overview:** Full-stack academic portfolio & CMS built for a client (freelance project).

**Technologies Used:** React, Firebase, Firestore

**Key Features:** Admin dashboard, Firebase + Firestore backend workflows.

**Current Status:** Completed/delivered.

---

### One Stop Liquor
🔗 https://onestopliquorandwholemart.info

**Overview:** Freelance business website for a Los Angeles–based wholesale business (One Stop Liquor & Whole Mart).

**Technologies Used:** HTML/CSS/JavaScript (per freelance web stack)

**Key Features:** Full website development, deployment & hosting management, production domain infrastructure setup.

**Current Status:** Completed/delivered, live in production.

---

### GitHub Insights
🔗 https://yourgithubinsights.netlify.app/

**Overview:** Open-source GitHub profile insights tool. Shahajalal is a Core Contributor.

**Key Contributions:** Developed high-contrast themes; optimized language analytics.

**Current Status:** Ongoing open-source contribution.

---

### Cover Page Generator
🔗 https://nubtk.netlify.app/

**Overview:** Smart academic cover page automation tool for university students, using JSON datasets and auto-fill logic.

**Current Status:** Completed.

---

### MobiFixer
🔗 https://github.com/shahjalal-mahmud/MobiFixer

**Overview:** Mobile repair management system.

**Technologies Used:** Java, SQLite (local storage), Firebase Auth, RecyclerView

**Current Status:** Completed (past project).

---

## Engineering Practice & Learning Repositories

| Repository | Focus Area | Link |
|---|---|---|
| CPU Scheduler | Terminal-based CPU scheduling simulator (C++) — FCFS, SJF, Round Robin with Gantt chart & metrics | https://github.com/shahjalal-mahmud/CPU_Scheduler |
| Deadlock Detective | C++17 simulation of Dijkstra's Banker's Algorithm — safety checks, step-by-step safe sequence | https://github.com/shahjalal-mahmud/Deadlock-Detective-Bankers-Algorithm-Simulator |
| LeetCode DSA | Daily interview preparation — core data structures, algorithms, problem-solving patterns | https://github.com/shahjalal-mahmud/LeetCode |
| CodeForces Practice | Daily DSA problem-solving practice categorized by difficulty (800–1000+), C++ | https://github.com/shahjalal-mahmud/CodeForces |
| Data Structures from Scratch | Core CS fundamentals — Linked Lists, Stacks, Queues, Trees, Graphs, Hashing | https://github.com/shahjalal-mahmud/data-structures-from-scratch |
| Algorithm Implementations | DP, graph algorithms, sorting, shortest path, traversal techniques | https://github.com/shahjalal-mahmud/algorithm-implementations |
| Numerical Methods (C++) | Linear equation solvers — Bisection, Newton-Raphson, Gauss Elimination | https://github.com/shahjalal-mahmud/numerical-methods-cpp |
| Assembly Programming (x86) | Arithmetic operations, control flow, I/O handling, logic problems | https://github.com/shahjalal-mahmud/Assembly-Programming-x86 |

> Focus: understanding how systems work under the hood — from memory and computation to algorithmic efficiency.

---

## Legacy Work (Scrapped & Rewritten)

These projects were fully rewritten — not because they failed as ideas, but because real users exposed what needed to change.

### Repair Store Manager
First production repair shop app, used by a real shop owner. Hit hard limits in data consistency, scaling, and UX under real-world load. The codebase was scrapped entirely and rebuilt from scratch → **became Amar Repair.**

### Teacher Batch Management
Offline-first prototype for Bangladeshi batch tutors. Validated core workflows (attendance, fees, marks, SMS alerts). Architecture lessons fed directly into → **became Amar Batch.**