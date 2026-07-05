# Portfolio Design Specification

**Owner:** MD Shahajalal Mahmud
**Title:** Founder · Engineer · Builder
**Location:** Khulna, Bangladesh
**Live URL:** https://shahajalal.me
**Venture:** [Appriyo](https://appriyo.com)

> **Purpose of this document**
> This specification describes the product, content, identity, and desktop experience of a personal engineering portfolio. It is written as a Product Design Specification intended for a downstream AI (Google Stitch) to generate a brand-new mobile application from scratch. It intentionally avoids any reference to implementation details, libraries, components, or current mobile screens.

---

## 1. Product Overview

### 1.1 What this product is

This is the personal portfolio website of **MD Shahajalal Mahmud**, a software engineer, Android specialist, and founder. It functions simultaneously as:

- A **personal brand showcase** — establishing Shahajalal as a credible engineering voice.
- A **technical portfolio** — exhibiting projects, code repositories, screenshots, and engineering case studies.
- A **recruiting surface** — giving recruiters, hiring managers, and clients a single destination to evaluate his skills, mindset, and shipped work.
- A **founder pitch** — positioning Appriyo (his venture) as the broader story behind the work.
- A **living resume** — with downloadable CV, education, experience, and live GitHub activity.

### 1.2 Primary audience

The site is engineered around three distinct reader personas:

1. **Technical recruiters & hiring managers** evaluating Android / backend engineering talent.
2. **Startup founders and clients** evaluating SaaS, MVP, and product-engineering capability.
3. **Developer peers** curious about open-source work, problem-solving stats, and engineering case studies.

### 1.3 Main purpose

The single mission of the product is to make a visitor, within 60 seconds, feel **"this is a serious, multi-disciplinary engineer who ships real things."** Every section serves that mission by reinforcing one or more of the following claims:

- I build **production-grade software**, not toy demos.
- I am a **founder**, not just an engineer.
- I operate across **Android, Backend, and System Architecture**.
- My work has **real-world impact** (users, deployments, recognition).
- I am **available and easy to reach**.

### 1.4 Brand personality

The personality reads as:

- **Serious, but not stiff.** Engineer-coded visual language with subtle delight (magnetic icons, hover micro-interactions).
- **Confident, but not loud.** Claims are supported by evidence — metrics, screenshots, repositories, recognitions.
- **Premium, technical, futuristic.** Inspired by developer tooling aesthetics — muted dark canvases, neon accents, dot grids, glow effects.
- **Founder-first.** The brand consistently leads with "Founder @ Appriyo" as the primary identity hook.
- **Craft-obsessed.** Type, spacing, and motion are treated as a craft, not an afterthought.

### 1.5 First impression

Within the first second, a visitor should perceive:

- A **dark, premium, technical atmosphere** with a focused accent color (violet/indigo).
- **Engineering confidence** — the word "FOUNDER" and multiple role-labels floating on screen.
- A **real person, not a template** — a polished portrait photograph framed inside animated rings and floating chip-cards.
- **Immediate call-to-action options** — View Projects and Visit Appriyo sit above the fold.
- **Trust signals** — "Open to opportunities", multiple social links, and downloadable CV within reach.

---

## 2. Personal Branding

### 2.1 The identity being communicated

Shahajalal is presented as a **multi-hat builder**. The portfolio deliberately blurs the line between engineer and founder. The roles below are all communicated in parallel, never as alternatives:

- **Android Engineer** — Native Android development with Kotlin + Jetpack Compose, offline-first architecture, Jetpack libraries, MVVM/Clean Architecture.
- **Backend Engineer** — Spring Boot, REST APIs, PostgreSQL, multi-tenant SaaS, RBAC, JWT, transaction safety.
- **Founder of Appriyo** — Owner/operator of a small IT firm delivering Android MVPs and web ecosystems for clients.
- **Product Builder** — Ships full end-to-end products, not isolated features. Has 3 active SaaS products under the Appriyo umbrella.
- **FinTech Systems Builder** — Specializes in secure, financial-grade systems (payment SDKs, multi-tenant billing, fraud detection).

### 2.2 How the identity is communicated visually

- The **word "FOUNDER"** appears as a monospace label early in the hero experience.
- A **rotating typewriter effect** cycles through role tags: *Android Engineer (Kotlin) · Backend Engineer (Spring Boot) · Founder @ Appriyo · SaaS Systems Builder · System Design Enthusiast*.
- The **portrait** is the visual anchor — it floats, surrounded by animated rings and orbiting dots, communicating "this is a person, not a logo."
- **Floating chip-cards** orbit the portrait, each communicating one identity: "Founder & CEO — Appriyo", "Tech Stack — Kotlin · Spring Boot", "Focus — FinTech · Scale".
- **Section eyebrows** (small uppercase labels) consistently categorize content using engineering language: "Who I Am", "Selected Work", "Academic Background", "Professional Journey".
- The **primary accent color** (a vivid violet/indigo) is reserved for identity moments — names, links, active states, focus points.
- A **status indicator** ("Open to opportunities" / "Available for Work") with a pulsing dot signals current availability without being pushy.

### 2.3 Voice

The writing voice is **first-person, engineering-confident, and outcome-oriented**:

- "I design and build production-grade software systems…"
- "I specialize in native Android engineering and scalable backend systems…"
- "I design multi-tenant SaaS architectures, offline-first mobile applications, and secure REST APIs."

There is **no marketing fluff, no emojis, no exclamation points** in headlines. Numbers and evidence do the persuading.

---

## 3. Desktop Experience

The desktop experience is organized as a **single-page scrollable surface with deep-linkable sub-pages**. The narrative unfolds top-to-bottom; deeper pages are reached only when a visitor expresses clear intent.

The desktop experience contains the following surfaces, in the order a visitor encounters them:

### 3.1 Persistent Navigation

A **fixed top navigation bar** is present on every page.

- **Logo** on the far left — a small square mark with the initial "S" plus the wordmark "Shahajalal.", where the period is rendered in the accent color.
- **Center menu** with these entries:
  - Home
  - Background (dropdown containing Education + Experience)
  - Portfolio (dropdown containing Skills + Projects)
  - Services (links externally to Appriyo's services page)
  - (GitHub was previously planned but is currently not exposed in the top nav)
- **Right side**: a **Theme** control (palette icon + dropdown) that opens a customization panel offering 100+ themes and 100+ Google Fonts.

The navigation becomes **opaque with a soft shadow** once the user scrolls. It supports scroll-spy highlighting for the active route.

### 3.2 Hero Section

**Purpose:** Deliver a 5-second pitch and a clear sense of identity.

**Hierarchy (top to bottom on the left column, image on the right):**
1. Status pill: "● Open to opportunities"
2. Animated role label cycling through engineering titles
3. Large greeting: "Hi, I'm Shahajalal" (the surname highlighted in the accent color with an animated underline)
4. Short tagline: "Founder · Engineer · Builder"
5. A short biography paragraph describing what he does
6. Three small "stack chips": Android (Kotlin · Compose), Backend (Spring Boot · PostgreSQL), Architecture (Multi-tenant SaaS)
7. Two primary CTAs: "View Projects" (filled) and "Visit Appriyo ↗" (outlined)
8. A divider with the label "Connect"
9. A row of **magnetic social icons** (GitHub, LinkedIn, Facebook, LeetCode, Codeforces, Email, Phone) — each pulls toward the cursor on hover

**Right column:** A circular portrait photo, framed by:
- A slow-spinning gradient ring (outer)
- A slow-spinning dashed ring (counter-direction)
- Four orbital dots floating around the portrait
- Three floating chip-cards anchored to the portrait: "Founder & CEO — Appriyo", "Tech Stack — Kotlin · Spring Boot", "Focus — FinTech · Scale"

**Interaction:** The portrait floats gently up and down. Background layers include soft blurred color blobs and a faint dot grid. A scroll indicator with a bouncing mouse icon sits at the bottom of the viewport on desktop.

### 3.3 About Section

**Purpose:** Expand the identity into a credible, dimension-rich profile.

**Structure (three-column on desktop):**
- **Left column:** A "Software Engineer" pill, the section heading "About Me" (with the "Me" highlighted and underlined), a short biography, a "Read Full Vision" link, and a horizontal strip of stat counters (e.g., 2+ Years, 10+ Projects, 2 SaaS Apps) that count up when scrolled into view.
- **Center column:** A square-ish portrait, also framed by animated rings and a floating chip ("Role — Android & Backend"). The image border glows on hover.
- **Right column:** A 2×2 grid of identity cards (Location, Email, Role, Resume) and a "Core Expertise" cluster of technology badges (Kotlin, Compose, Spring Boot, PostgreSQL, Firebase, REST APIs, RBAC Auth, MVVM, C++ DSA).

**Expanded modal:** Clicking "Read Full Vision" opens an overlay modal containing the full bio, the vision statement, and the complete technology arsenal. The modal is centered, scrollable, and dismissible via the close button, backdrop click, or the Escape key.

### 3.4 Skills Section

**Purpose:** Allow recruiters to scan technical depth with category filtering.

**Structure:**
- Eyebrow label: "Technical Skills"
- A "Tech Stack" pill and the heading "My Expertise" with an animated underline.
- A **horizontal category filter** (chip group) with options: All, Android, Web, Backend, Database, Core CS, Security, Tools.
- A **responsive grid of skill cards** (3 columns on wide desktop). Each card displays:
  - A technology icon (top-left)
  - A proficiency tag (Expert / Advanced / Intermediate / Beginner) in the top-right
  - A category label
  - The skill name (bold, becomes accent color on hover)
  - A 1–2 sentence description
  - A large decorative numeral in the bottom-right (01, 02, …) that subtly brightens on hover
- A **sidebar (right column on wide desktop)** containing:
  - A "Problem Solving" highlight card in the primary accent color
  - A "Core Workflow" card listing Architecture / Backend / Database / Security
  - A "By Category" breakdown showing each skill category with a percentage progress bar (clicking a category activates that filter)
- A live count: "Showing X of Y skills"

### 3.5 Projects Section

**Purpose:** Showcase shipped engineering work as the centerpiece of the portfolio.

**Structure:**
- Eyebrow: "Selected Work"
- Heading: "Featured Projects" with animated underline
- A pill stating the total number of projects (e.g., "4 Projects")
- A **grid of project cards** (4 columns on wide desktop). Each card includes:
  - A numeric index badge (01, 02, …) in the top-left corner
  - A project logo / hero image (top)
  - Project title
  - A short description (truncated to 3 lines)
  - Up to 4 technology pills (with a "+N" overflow pill if there are more)
  - A footer with three actions: "Code" (GitHub), "Live" (live demo, when available), and "Details →" (links to the project detail page)
- A footer CTA: "View all on GitHub"

**Tilt interaction:** Each card subtly tilts in 3D space as the cursor hovers over it.

### 3.6 Project Detail Page

**Purpose:** Present a deep engineering case study for a single project.

**Structure (top to bottom):**
- **Hero strip:** A breadcrumb ("← All Projects / Project Name"), project label ("Project 01 — ● Live"), title, description, skill pills, two CTA buttons ("View Source" on dark, "Live Demo" outlined), and a card containing the project logo on the right.
- **Gallery strip:** An auto-rotating carousel of project screenshots with pause-on-hover, a thumbnail strip below, and click-to-expand into a full-screen lightbox with arrow navigation.
- **Origin Story:** A pull-quote style paragraph describing the project's motivation, formatted as an italicized narrative with a vertical accent line.
- **Key Features:** A numbered list of feature highlights in a tabular layout.
- **Challenge & Solution:** Two side-by-side panels labeled "The Problem" and "Our Solution".
- **Development Insights:** Three side-by-side insight cards — "Challenges" (red accent), "Limitations" (yellow accent), "Future Plans" (green accent), each with bullet items.
- **Conclusion:** A summary block with a subtle gradient background and corner brackets.
- **Impact metrics (right sidebar):** A vertical list of project metrics in card form.
- **Tech Stack (right sidebar):** A categorized breakdown — frontend / backend / ai / camera / hardware / etc.
- **Quick Links (right sidebar):** Direct links to GitHub and Live Demo.
- **Project Navigation (bottom):** A "Previous" and "Next" project card pairing to walk through the full project portfolio sequentially.

### 3.7 Education & Experience Section

**Purpose:** Present academic and professional history as a unified timeline.

**Structure:**
- **Eyebrow:** "Academic Background" / "Professional Journey"
- **Section heading:** "Academic Journey" / "Work & Projects"
- **Timeline visualization:** A vertical timeline with alternating-side cards. Each entry has:
  - A square icon badge (school or company icon)
  - A status pill (Ongoing / Active / Deployed / Completed) with a pulsing dot for active states
  - Year / duration range
  - A grade badge (CGPA / GPA)
  - The title (degree or role)
  - The institution or company (as a link)
  - Highlight pills (specializations, achievements)
  - A bulleted list of "Key Contributions"
  - A large decorative numeral in the bottom-right

### 3.8 GitHub Section

**Purpose:** Provide a live, data-rich developer activity surface (heatmaps, streaks, language breakdown) sourced from an external GitHub Insights app.

This section presents itself as a dashboard-style surface with charts and a contribution heatmap. It is a place for developer peers to dig into coding consistency and language proficiency.

### 3.9 Contact Section

**Purpose:** Convert intent into a conversation.

**Structure (two-column on desktop):**
- **Left column:**
  - Status pill: "● Available for Work"
  - Heading: "Get In Touch" with animated underline
  - Subtitle explaining who should reach out
  - Three info rows: Email (with mailto link), Phone (with tel link), Location
  - "Connect" divider
  - Magnetic social icons (same set as the hero)
- **Right column:**
  - A card-headed form titled "Send a Message" with the subtitle "I'll reply within 24 hours"
  - Two-column inputs: Full Name, Email Address
  - Subject input
  - Message textarea
  - A primary "Send Inquiry" submit button with a send icon
- Toast notifications confirm submission success or failure.

### 3.10 Footer

**Purpose:** Wrap up the experience with persistent links, venture branding, and trust signals.

**Structure (four-column grid):**
- **Column 1 — Navigation:** A vertical list of all section links with leading bullet dots that turn accent color on hover.
- **Column 2 — Appriyo (the venture):** A small card with the "A" logo mark, venture description, three capability pills (Android Dev, Backend, SaaS Arch), and a link to appriyo.com.
- **Column 3 — Contact:** Email, phone, location rows, plus a small tech-stack mini-cluster (Kotlin, Spring Boot, Android).
- **Column 4 — Socials + Status:** Magnetic social icons and a status card with three rows: Status (Open to Work), Work (Remote & Hybrid), Reply (Within 24 hrs).

**Bottom strip:** Copyright, a centered tagline pill row ("Discipline · Consistency · Growth"), and a "↑ Back to top" link.

### 3.11 404 Page

A simple "Project not found" or "Page not found" treatment with a link back to a relevant section.

### 3.12 Global Floating Elements

- A **floating "Install App" prompt** in the bottom-right corner (desktop only) offers PWA installation.
- An **offline banner** appears at the very top when the user loses network connectivity.

---

## 4. Information Architecture

The portfolio's information architecture is layered: a primary single-page narrative, with three dedicated deep-link sub-pages reachable via the navigation menu and contextual links.

### 4.1 Top-level structure

```
Home (/                                       — single-page scroll narrative)
├── Hero             (#hero)
├── About            (#about)            [also reachable as modal]
├── Skills           (#skills)           [route /skills-projects]
├── Projects         (#projects)         [route /skills-projects]
├── Project Detail   (/projects/:slug)   — per-project deep-dive page
├── Education        (#education)        [route /education-experience]
├── Experience       (#experience)       [route /education-experience]
├── GitHub           (/github)           — analytics dashboard
└── Contact          (#contact)          [also route /contact]

Persistent: Navbar (top) · Footer (bottom) · Theme selector (top-right) · Install prompt (bottom-right) · Offline banner (top)
```

### 4.2 Information flow

The flow is intentionally **top-down, narrative-driven**:

1. A visitor enters at **Home** and scrolls through Hero → About.
2. From Hero or About, they jump to **Skills** and **Projects** to evaluate technical depth.
3. Within Projects, they click **Details** to enter a **Project Detail** page — the deep case-study layer.
4. They then navigate to **Background → Education / Experience** to understand the formal history.
5. Optional detour: **GitHub** for live developer activity.
6. They finish at **Contact**, where they send a message or click a social link.

Navigation between layers is supported by:
- **Anchor links** in the navbar dropdowns (e.g., "Background" → Education / Experience).
- **In-page section anchors** on the Home page.
- **Cross-page deep links** (e.g., Footer → "Skills" routes to `/skills-projects#skills`).

### 4.3 Deep-link destinations

Every important surface is reachable by a stable URL, including deep-links to specific sections (`#skills`, `#projects`, `#contact`, etc.). This supports sharing, recruiters sending links, and search engine indexing.

---

## 5. Content Inventory

Below is the full inventory of content types the portfolio exposes, and the role each plays.

### 5.1 Profile content

| Content type | Purpose |
| --- | --- |
| **Name** | Primary identity anchor |
| **Portrait photograph** | Humanize the brand; used in Hero, About, Footer |
| **Biography (short)** | One-paragraph elevator pitch |
| **Biography (expanded)** | Multi-paragraph vision statement with full engineering context |
| **Tagline** | Three-word role definition ("Founder · Engineer · Builder") |
| **Rotating role labels** | Cycle through 5 different identities to communicate range |
| **Location** | Geographic context for time-zone, availability, and language |
| **Status / availability indicator** | "Open to opportunities" / "Available for Work" |

### 5.2 Quantitative / evidence content

| Content type | Purpose |
| --- | --- |
| **Stat counters** | Years of experience, project count, SaaS app count |
| **Skill proficiency tags** | Expert / Advanced / Intermediate / Beginner |
| **Project impact metrics** | "5+ Active Shop Beta Testers", "98.7% Model Validation Accuracy", "Under 3s Analysis Speed" |
| **GitHub contribution heatmap** | Live developer activity visualization |
| **Streak data** | Coding consistency evidence |
| **Language breakdown charts** | Distribution of coding languages |

### 5.3 Project content

| Content type | Purpose |
| --- | --- |
| **Project logo / hero image** | Visual identifier on cards and detail pages |
| **Project title** | Branding |
| **Project description (short)** | Used in cards |
| **Project description (long)** | Used in detail pages |
| **Project status** | "Live" indicator on detail pages |
| **Technology pills (skills)** | At-a-glance tech stack |
| **Additional tech pills (extras)** | Architecture and tooling details |
| **Media gallery** | Multiple screenshots per project |
| **Origin story** | First-person narrative explaining motivation |
| **Key features list** | What the product does |
| **Problem statement** | What real-world problem the project solves |
| **Solution / objective** | How the project addresses the problem |
| **Scope** | Target audience and context |
| **Architecture description** | How the system is built |
| **Challenges** | Engineering difficulties encountered |
| **Limitations** | Honest acknowledgment of weaknesses |
| **Future plans** | Roadmap signals |
| **Conclusion** | Reflection and impact |
| **Contributions** | Role and ownership |
| **Documentation / README notes** | Reference to deeper docs |
| **Impact metrics** | Numerical evidence of value |
| **Categorized tech stack** | Grouped: frontend / backend / ai / camera / hardware / logic / utilities / networking |
| **GitHub link** | Source code |
| **Live demo link** | Hosted deployment or APK |
| **Previous / Next project** | Sequential navigation |

### 5.4 Skills content

| Content type | Purpose |
| --- | --- |
| **Skill name** | The technology or discipline |
| **Skill category** | Android / Web / Backend / Database / Core CS / Security / Tools |
| **Skill description** | 1–2 sentence explanation |
| **Skill proficiency tag** | Expert / Advanced / Intermediate / Beginner |
| **Skill icon** | Visual identifier |
| **Category breakdowns** | Percentage distribution of skills across categories |

### 5.5 Education content

| Content type | Purpose |
| --- | --- |
| **Degree title** | What was studied |
| **Institution** | Where |
| **Year range** | When |
| **Result / grade** | CGPA / GPA |
| **Status** | Ongoing / Completed |
| **Highlights** | Areas of focus |

### 5.6 Experience content

| Content type | Purpose |
| --- | --- |
| **Job title** | Role held |
| **Company** | Where |
| **Duration** | When |
| **Work type** | Hybrid / Remote / Client Project |
| **Location** | Geographic context |
| **Status** | Active / Deployed / Completed |
| **Description** | What the role involved |
| **Key contributions** | Bullet-pointed achievements |

### 5.7 Appriyo (venture) content

| Content type | Purpose |
| --- | --- |
| **Venture name & logo mark** | Brand identity |
| **Venture description** | One-paragraph company pitch |
| **Capability pills** | Android Dev, Backend, SaaS Arch |
| **Venture URL** | Link to appriyo.com |

### 5.8 Contact content

| Content type | Purpose |
| --- | --- |
| **Email address** | Primary contact channel |
| **Phone number** | Voice contact channel |
| **Location** | Geographic context |
| **Contact subtitle** | Tone-setting message inviting outreach |
| **Response promise** | "I'll reply within 24 hours" |

### 5.9 Social & external links

| Content type | Purpose |
| --- | --- |
| **GitHub** | Code & open-source work |
| **LinkedIn** | Professional network |
| **Facebook** | Personal network |
| **LeetCode** | Algorithm problem-solving |
| **Codeforces** | Competitive programming |
| **HackerRank** | Skill certifications |
| **Email (mailto)** | Direct messaging |
| **Phone (tel)** | Voice call |
| **Appriyo (external)** | Venture website |
| **CV (PDF download)** | Downloadable resume |

### 5.10 Resume / CV

- A **PDF CV file** is hosted and offered for direct download. The CV filename is `Shahjalal_CV.pdf`.

### 5.11 Achievement / recognition content

- **"Top 100 Finalist" — SOLVIO AI Hackathon 2025** for CashGuard AI.
- **Production Android apps running at 99.9% crash-free rate.**
- **Founder & CEO** recognition for Appriyo.

---

## 6. Projects

### 6.1 How projects are presented

Projects occupy the **centerpiece position** of the portfolio. They are presented in three progressively deeper layers:

1. **Card layer** (in the Projects section grid) — quick visual scan.
2. **Detail page layer** (deep-dive per project) — engineering case study.
3. **Sequential navigation** (Previous / Next) — encourages browsing the full portfolio.

### 6.2 Information density per project

Each project is treated like a **mini product page**, not a card. It includes:

- Logo + title + description
- Skill pills (primary tech stack)
- "Extra" pills (architecture patterns, integrations)
- A multi-screenshot gallery
- A first-person **origin story** explaining motivation
- A **feature list** with 5–7 items
- **Problem statement** + **Solution narrative** in two parallel panels
- **Architecture description** in plain language
- **Challenges**, **Limitations**, **Future Plans** in three color-coded insight cards
- A **conclusion** summarizing impact
- A **metrics block** (typically 3–4 numerical or qualitative measures)
- A **categorized tech stack** (frontend, backend, ai, camera, hardware, etc.)
- **GitHub** and **Live Demo** links
- **Previous / Next** project cards at the bottom

### 6.3 Currently featured projects

- **Repair Store Manager — POS & ERP** — A multi-tenant SaaS for repair-shop management (Android + Node.js backend). Live with 5+ active shop beta testers.
- **Prodorshok — AI Career Companion** — AI career guidance app for Bangladeshi students (Kotlin + Deepseek R1). Surveyed 150+ students across 10 universities.
- **CashGuard AI — Counterfeit Detection** — On-device fake-currency detection via TensorFlow Lite. Top 100 finalist at SOLVIO AI Hackathon 2025. 98.7% validation accuracy.
- **Dynamic Portfolio for Educators** — A real-time admin-controlled portfolio platform for university faculty using React + Firestore. Built for a real client, deployed and in active use.

### 6.4 Project navigation

Projects are navigated in three ways:

- **Through the grid** — back to all projects.
- **Sequentially** — Previous / Next cards at the bottom of each detail page walk through the entire portfolio.
- **Direct deep-link** — via URL `/projects/:slug`.

### 6.5 Project detail visual language

- A breadcrumb at the top keeps the user oriented.
- A live "● Live" badge signals current status.
- A dark "View Source" primary button paired with an outlined "Live Demo" button.
- Decorative corner brackets and a conic-gradient ring around the logo card.
- Each section is preceded by a small uppercase label ("Gallery", "Origin Story", "Key Features", etc.).

---

## 7. Visual Identity

### 7.1 Typography

- **Primary typeface:** Inter (Google Fonts), set via a global CSS custom property `--user-font`.
- **System:** Smoothly swappable to 100+ Google Fonts via a Theme control. Inter is the default; the system is designed to look intentional in any of the available font choices.
- **Hierarchy:**
  - **Display headings** — Extra-bold weight, tight letter spacing, near-1.0 line-height.
  - **Body text** — Regular or medium weight, relaxed line-height (~1.7).
  - **Eyebrows & section labels** — Uppercase, small size (10–11px), wide tracking (0.22–0.26em), low opacity. They act as visual punctuation before headings.
  - **Monospace role labels** — Used in the hero for the typewriter role.

### 7.2 Spacing & layout

- Generous, breathy vertical padding on every section.
- Maximum content width of approximately 1280px (max-w-7xl), centered.
- A consistent horizontal padding scale: small → medium → large → extra-large, scaling with viewport.
- Rounded-corner-first design language: 12px, 16px, 24px (rounded-3xl) corner radii throughout.

### 7.3 Cards

- **Surface:** Slightly elevated base-200 background with semi-transparent borders.
- **Borders:** Thin (1px), low-opacity, becoming accent color on hover.
- **Corners:** Large, soft (rounded-2xl or rounded-3xl).
- **Shadow:** Subtle, expanding on hover.
- **Hover behavior:** Slight lift (translateY -1 to -4px), border color shifts toward accent, optional soft glow appears.
- **Backdrop blur:** Used for translucent overlays and modals.

### 7.4 Colors

- **System:** 100+ DaisyUI themes switchable in real time, all built on top of consistent semantic tokens (`primary`, `secondary`, `accent`, `base-100`, `base-200`, `base-300`, `success`, `warning`, `error`, `info`).
- **Default on first load:** A dark theme — a deep neutral base with a vivid violet/indigo accent.
- **Accent color:** Used **only** for identity moments — name highlights, headings, active states, primary buttons, links, focus rings, the gradient underline beneath each section title.
- **Status semantics:**
  - Green = success / availability / ongoing.
  - Red = error / problem.
  - Yellow = warning / limitation / intermediate state.
  - Blue = info / advanced.
- **Background depth:** Achieved with soft, heavily-blurred colored glows placed in absolute positions on every section.

### 7.5 Icons

- A consistent icon system drawn from three icon families (React Icons, Lucide, custom SVGs).
- Icons are colored to match the semantic context (success, info, warning, etc.).
- Iconography is **engineering-coded** — code brackets, brackets, terminals, database symbols — never decorative cartoon shapes.

### 7.6 Animations

- **Entrance animations:** Each section fades in from below when scrolled into view.
- **Hover micro-interactions:** Buttons lift, cards tilt in 3D, icons scale up.
- **Magnetic social icons:** Pull toward the cursor on hover with spring physics.
- **Typewriter effect:** Cycles through engineering roles in the hero.
- **Counter animations:** Stat numbers count up when scrolled into view.
- **Floating elements:** The portrait floats up and down in a slow sine wave.
- **Gradient underlines:** Section headings have a gradient underline that draws itself when the section enters view.
- **Animated conic-gradient rings:** Slowly rotating decorative rings frame portraits and project logos.
- **Glow effects:** Soft, blurred color glows that intensify on hover.
- **Pulsing status dots:** Used for "available" and "ongoing" indicators.

### 7.7 Elevations

- A consistent elevation system:
  - **Flat** for backgrounds and surface areas.
  - **Soft shadow** for resting cards.
  - **Stronger shadow** for cards on hover.
  - **Floating chips** have a heavier shadow with a colored glow.
- Shadows use colored tints (matching the accent) rather than pure black, to feel warmer and more designerly.

### 7.8 Rounded corners

- **12px (rounded-xl)** for compact elements: chips, buttons, inputs.
- **16px (rounded-2xl)** for cards and small surfaces.
- **24px (rounded-3xl)** for hero surfaces, large cards, and project cards.
- **Circular** for portraits, dot indicators, icon badges, and orbital decorations.

### 7.9 Theme switching

A **Theme control** in the top navigation opens a panel offering:

- **100+ themes** organized alphabetically (Light, Dark, Cupcake, Bumblebee, Emerald, Corporate, Synthwave, Retro, Cyberpunk, Valentine, Halloween, Garden, Forest, Aqua, Lo-Fi, Pastel, Fantasy, Wireframe, Black, Luxury, Dracula, CMYK, Autumn, Business, Acid, Lemonade, Night, Coffee, Winter, Dim, Nord, Sunset, Caramellatte, Abyss, Silk, and more).
- Each theme is previewable via a 4-color swatch showing primary / secondary / accent / neutral.
- The active theme is indicated with a check mark.
- Theme preference persists across sessions.

### 7.10 Dark mode

- The system defaults to a dark theme on first load.
- Switching to dark mode is one click in the theme panel.
- Dark mode is honored as a default; the user always has explicit control via the theme switcher.

### 7.11 Font switching

A **Font Family** control sits beside the Theme control, offering **100+ Google Fonts** (Inter, Roboto, Open Sans, Montserrat, Poppins, IBM Plex Sans, Space Grotesk, Bebas Neue, and many display / serif / monospace options). The active font is previewed with an "Aa" sample. The selected font becomes the global typeface across the entire product via a single CSS variable.

### 7.12 Overall personality (visual)

If the design were a sentence, it would be: **"A premium, engineering-focused console."** Quiet, dark, confident, technical — with just enough motion to feel alive.

---

## 8. Interaction Design

### 8.1 Navigation

- **Sticky top navigation** becomes opaque after a small scroll threshold.
- Navbar dropdowns open on click with subtle fade + scale + slide animations.
- Click-outside closes any open dropdown.
- Active route / section is highlighted with an accent-colored pill background.
- Smooth-scroll anchors when navigating between sections on the same page.
- A breadcrumb appears at the top of every detail page.

### 8.2 Theme switching

- Opens a panel from the top-right.
- Switching is instant; entire color system updates in real time.
- No page reload required; preference persists.

### 8.3 Project browsing

- **Cards** on the grid tilt subtly in 3D following the cursor.
- **Card image** scales up gently on hover.
- **Action buttons** (Code, Live, Details) translate up slightly on hover.
- **Clicking Details** transitions to a dedicated route with breadcrumb, gallery, and sequential navigation.

### 8.4 Project gallery interaction

- An auto-rotating image carousel (pauses on hover).
- Thumbnail strip below for direct navigation.
- Click-to-expand into a full-screen lightbox.
- Keyboard navigation: arrow keys move between images; Escape closes the lightbox.

### 8.5 Contact form

- Inputs focus with an accent-colored border.
- Validation is enforced via standard HTML `required` attributes.
- On submit, a service sends the email and a toast notification confirms success or failure.
- Form resets automatically on success.
- A 24-hour reply promise is communicated next to the form title.

### 8.6 Animations

- **Page entrance:** Sections fade in from below.
- **Card hover:** Subtle lift, border color shift, optional glow.
- **Magnetic social icons:** Icons drift toward the cursor with spring physics.
- **Animated counters:** Stat numbers count up.
- **Rotating rings:** Conic-gradient rings rotate continuously.
- **Floating portrait:** Gentle up-and-down float loop.
- **Pulsing dots:** Status indicators ping softly to draw attention.

### 8.7 Scrolling

- Smooth scroll behavior is enabled globally.
- Anchor links transition smoothly to target sections.
- An animated scroll indicator on the hero bounces to invite the user to scroll.

### 8.8 Hover states

Every interactive element has a defined hover state:
- **Buttons** shift color, gain shadow, lift slightly.
- **Cards** lift and gain an accent border glow.
- **Links** shift to the accent color.
- **Icons** scale up slightly.
- **Social icons** become magnetic and gain a tooltip.

### 8.9 Buttons

- **Primary** — Solid accent background, white text, strong shadow.
- **Outline** — Transparent, accent border, accent text on hover.
- **Ghost** — Background-less, used for tertiary actions.
- **Icon buttons** — Small circular, used for dismissals and compact actions.

### 8.10 Cards

- Cards lift on hover with a colored shadow and accent border.
- Cards have a subtle inner glow (top-right) to add depth.
- Decorative numerals fade in subtly on hover.

### 8.11 Transitions

- All interactive transitions are 150–400ms, eased with a custom cubic-bezier (0.22, 1, 0.36, 1) for a soft, designerly feel.
- Modal / overlay transitions use spring physics for tactile movement.

---

## 9. User Journey

### 9.1 Recruiter flow (most important)

The portfolio is engineered around a typical **60-second recruiter scan**:

1. **Land on Home** → Hero greets them with identity, status ("Open to opportunities"), and a portrait. They immediately sense "engineer who ships."
2. **Scroll to About** → They see a short bio, stat counters, identity info, and a tech stack badge cluster. They confirm the claim.
3. **Jump to Skills** (via the Portfolio menu) → They filter or scan the category chips, get a sense of depth (Expert/Advanced tags), and check the workflow sidebar.
4. **Jump to Projects** → They browse the project grid; each card shows real screenshots and clear tech pills. They pick the most relevant one (often Repair Store Manager for Android roles, or CashGuard AI for AI roles).
5. **Open a Project Detail** → They read the origin story, see screenshots, review metrics, and check the GitHub repo.
6. **Jump to Background** → They confirm the education timeline (Northern University of Business & Technology Khulna, CGPA 3.90/4.00) and the experience timeline (Founder @ Appriyo, Android Developer, Freelance React Developer).
7. **Land on Contact** → They copy the email or click the social link of their choice (typically LinkedIn for recruiters).
8. **Optional detour:** GitHub dashboard for live coding activity evidence.

### 9.2 Founder / client flow

1. **Hero** → "Founder of Appriyo" is the first role encountered.
2. **Footer / Hero CTA** → "Visit Appriyo ↗" sends them off-site.
3. **Projects section** → They evaluate the production-grade work as proof of execution capability.
4. **Contact** → They reach out about an MVP or collaboration.

### 9.3 Developer peer flow

1. **Hero** → Establishes technical credibility.
2. **Skills** → Deep-dive on stack.
3. **Projects** → Code review of open-source work via GitHub links.
4. **GitHub dashboard** → Live contribution graph.
5. **Footer** → GitHub / LeetCode / Codeforces links for further exploration.

### 9.4 Why this order

The order mirrors **decision hierarchy**:
- Identity and availability first (Hero).
- Credibility and depth second (About + Skills).
- Proof and impact third (Projects + Project Details).
- Formal history fourth (Education + Experience).
- Conversion last (Contact).

A visitor who leaves after 5 seconds has still seen the headline identity. A visitor who stays 5 minutes has reached the GitHub dashboard.

---

## 10. Design Principles

The portfolio is built on these design principles:

- **Professional first.** Every screen is engineered to feel serious and credible.
- **Minimal by intent.** Nothing is decorative without purpose. Whitespace and typography carry the design.
- **Engineering focused.** The visual language borrows from developer tools — dot grids, monospace accents, code brackets, terminal-style eyebrows.
- **Modern and contemporary.** Animation, motion, and interaction patterns are current best-practice.
- **Fast.** Static-rendered where possible; lazy-loaded routes; small asset budgets.
- **Responsive and accessible.** Designed to work across device sizes with semantic HTML and ARIA labels.
- **Readable.** High-contrast text, generous line-height, and clear hierarchy.
- **Product-oriented.** The site reads as a product, not a CV — sections are framed as product surfaces.
- **Developer-first.** Code is celebrated: GitHub links everywhere, contribution graph, language breakdowns.
- **Founder-amplified.** The founder identity is woven through every section, never siloed to a single page.

---

## 11. Mobile Redesign Notes

> **This section describes goals for a brand-new mobile application. It does NOT describe or reference the existing mobile implementation. The future mobile version will be created from scratch.**

### 11.1 The core shift

The future mobile experience should **not feel like a responsive website**. It should feel like a **native Android application** that happens to be about a person. Every decision should be made through the lens of: *"What would this feel like if it were a polished app installed from the Google Play Store?"*

### 11.2 Goals for the mobile app

The new mobile experience should:

- **Feel native to Android.** Adopt Material Design 3 principles, motion language, and component vocabulary. Users should feel they are using a Google Play app, not a website.
- **Preserve all portfolio content.** Every piece of content on the desktop site should still be reachable on mobile — projects, education, experience, contact, GitHub, downloadable CV, theme and font controls, social links, expanded bio, Appriyo venture pitch. Nothing should be cut; the experience should be **reorganized**, not reduced.
- **Adopt a mobile-first information hierarchy.** The order of sections should be reconsidered for thumb reach, glanceability, and one-handed use. The most important content (identity, projects, contact) should be one tap away at any moment.
- **Prioritize touch interactions.** Tap targets, swipe gestures, pull-to-refresh-style interactions, scroll-driven animations, bottom-sheet patterns, and haptic-friendly feedback should replace desktop hover states and magnetic effects.
- **Feel premium and modern.** The visual identity should be carried over — dark theme default, accent color, dot grids, glow effects, animated underlines, decorative numerals — but rendered through Material 3 surfaces, shapes, and motion.
- **Be application-grade.** Persistent navigation, predictable state restoration, deep-link handling, offline behavior, fast transitions, and proper back-stack management are expected behaviors, not stretch goals.
- **Feel like a Google Play application.** The chrome (status bar, navigation, app bar, transitions, system back behavior) should obey Android conventions. The product should feel installable, owned, and first-party.

### 11.3 What the mobile experience should optimize for

- **Glanceability over completeness-per-screen.** Information can be split across multiple screens if it makes each screen clearer.
- **Reachability.** Primary actions should live within thumb-reach zones.
- **Speed.** Every interaction should feel instantaneous; transitions should be Material 3 standard.
- **Identity first.** The user's first impression of the app — and every screen — should reinforce the "Founder · Engineer · Builder" identity.
- **Conversion.** Contact, project browsing, and external links should be frictionless.

### 11.4 What should be preserved

- **The full project content** — every project, every detail page, every screenshot, every metric, every tech-stack breakdown.
- **The full biography** — both short and expanded versions.
- **Education and experience** — full timelines.
- **GitHub analytics** — heatmap, streak, language breakdown.
- **Contact form** — with the 24-hour reply promise.
- **Theme switching** — adapted to a Material 3 color system picker.
- **Font switching** — adapted to a Material 3 font picker.
- **Social and external links** — GitHub, LinkedIn, Facebook, LeetCode, Codeforces, HackerRank, Email, Phone, Appriyo.
- **Downloadable CV** — same PDF asset, native download behavior.
- **Appriyo venture pitch** — full card with capability pills and link.

### 11.5 What the AI should NOT do

- Do NOT propose screen layouts, components, or design tokens.
- Do NOT generate a responsive website — the goal is an application.
- Do NOT reference the existing implementation.
- Do NOT constrain the redesign to the desktop's information order.
- Do NOT reduce content to "what fits on a phone."

### 11.6 North star

If the mobile experience were a sentence, it would be:

> *"A native Android application that makes a visitor feel they have installed the polished, premium, founder-engineer product of Shahajalal Mahmud — not opened his website."*