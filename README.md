# Md Shahajalal Mahmud — Developer Portfolio

> **FinTech Systems Builder · Android & Backend Engineer · Founder @ [Appriyo](https://appriyo.com/)**

A cutting-edge, fully responsive personal portfolio built with **React, Vite, Tailwind CSS, and DaisyUI** — featuring 100+ dynamic themes, live GitHub/Codeforces stats, interactive project showcases, and a production-grade contact system.

📍 Khulna, Bangladesh &nbsp;|&nbsp; 🌐 [shahajalalmahmud.netlify.app](https://shahajalalmahmud.netlify.app/) &nbsp;|&nbsp; 🏗️ [appriyo.com](https://appriyo.com/)

---

## Live Demo

**[🚀 View Portfolio →](https://shahajalalmahmud.netlify.app/)**
_Deployed on Netlify with CI/CD from GitHub_

---

## What's Inside

| Section                    | Highlights                                                                  |
| -------------------------- | --------------------------------------------------------------------------- |
| **Hero**                   | Animated profile, typing role effect, full social link bar                  |
| **About**                  | Bio modal, tech badges, downloadable CV, availability status                |
| **Skills**                 | Filterable skill cards across Android, Backend, Architecture, DSA           |
| **Projects**               | Dedicated project pages with media galleries, tech stacks, and case studies |
| **Education & Experience** | Interactive timeline visualization                                          |
| **GitHub Stats**           | Live heatmap, streak, language analytics via GitHub Insights API            |
| **Contact**                | Validated contact form with 24hr response commitment                        |

---

## Features

### 🎨 Dynamic Theming

- **100+ DaisyUI themes** switchable in real time with localStorage persistence
- **Google Fonts integration** — swap fonts live from a curated list; applied globally via CSS variable `--user-font`
- System-level dark/light detection as a sensible default

### 🏆 Project Showcase

- Dedicated route per project with 3D media carousel, tech stack breakdown, and engineering case study
- Projects tagged by domain: SaaS, FinTech, Android, AI, Open Source

### ⚡ Performance

- Vite-powered with instant HMR in development
- Lazy-loaded routes and optimized assets
- 95+ Lighthouse score

### 🔗 Developer Analytics

- Live GitHub contribution heatmap, streak, and language breakdown via [GitHub Insights](https://yourgithubinsights.netlify.app/)
- Codeforces problem-solving stats

---

## Tech Stack

**Core**

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

**Styling**

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square)

**Enhancements**

![AOS](https://img.shields.io/badge/AOS_Animations-000000?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white)

**Deployment**

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shahjalal-mahmud/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

---

## Architecture Notes

### Theme & Font System

Theme and font preferences are managed globally via `ThemeContext`. On change:

- The `data-theme` attribute on `<html>` is updated to switch DaisyUI themes
- A `<link>` tag is dynamically injected to load the selected Google Font
- A CSS variable `--user-font` is set on `:root` so all components inherit the font
- Both selections are persisted to `localStorage` across sessions

```
ThemeContext
  ├── theme     → data-theme on <html>  (localStorage: "theme")
  └── font      → --user-font CSS var   (localStorage: "font")
                  + dynamic Google Fonts <link>
```

### Routing

```
/                         → Hero + About + Contact
/skills-projects          → Skills & Projects overview
/skills-projects/:id      → Individual project detail page
/education-experience     → Education & Experience timeline
/github                   → GitHub analytics dashboard
```

---

## Projects Showcased

**Active SaaS Products (Appriyo)**

- 🔧 **Amar Repair** — Multi-tenant SaaS for repair shop management (Android + Node.js backend)
- 📚 **Amar Batch** — Offline-first tutor & student management with Room DB
- 💳 **Amar Card** — Physical-digital networking product with elite profile engine

**Past Projects**

- 🤖 **Prodorshok** — AI career guide for Bangladeshi students (Kotlin + GPT-3.5)
- 💸 **CashGuard AI** — On-device fake currency detection via TensorFlow Lite · 🏆 Top 100, SOLVIO AI Hackathon 2025
- 🏦 **JPMorgan Midas Simulation** — Kafka + Spring Boot transaction processor
- 🔐 **FinPaySDK** — Secure Android payment SDK with AES-256 & Android Keystore
- ⚡ **AlgoViz** — Step-by-step DSA animation inside VS Code
- 📊 **GitHub Insights** — Core contributor; high-contrast themes & language analytics

---

## Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Md_Shahajalal_Mahmud-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/md-shahajalal-mahmud)
[![Email](https://img.shields.io/badge/Email-mahmud.nubtk@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mahmud.nubtk@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-shahjalal--mahmud-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/shahjalal-mahmud)
[![Portfolio](https://img.shields.io/badge/Portfolio-shahajalalmahmud.netlify.app-4285F4?style=flat-square&logo=google-chrome&logoColor=white)](https://shahajalalmahmud.netlify.app/)
[![Appriyo](https://img.shields.io/badge/Appriyo-appriyo.com-000000?style=flat-square&logo=google-chrome&logoColor=white)](https://appriyo.com)

---

## Recognition

- 🏆 **Top 100 Finalist** — SOLVIO AI Hackathon 2025 (CashGuard AI)
- 🏗️ **Founder & CEO** — Appriyo, delivering end-to-end product engineering
- 📱 **Production Android apps** running at 99.9% crash-free rate

---

## License

MIT © 2026 Md Shahajalal Mahmud
