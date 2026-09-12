# Wings Mediaa · Hyper-Fast AI-Powered Marketing Agency

<div align="center">

[![Live Site](https://img.shields.io/badge/Live_Site-wingsmediaa.com-FF3D2E?style=for-the-badge&logo=vercel&logoColor=white)](https://wingsmediaa.com)
[![Next.js 15](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Location](https://img.shields.io/badge/Base-Kanpur%2C_India-FF3D2E?style=for-the-badge&logo=google-maps&logoColor=white)](https://wingsmediaa.com/about)

**We make ambitious brands impossible to ignore.**  
*A hyper-fast, AI-powered agency delivering actual results across social, performance ads, conversion web, and AI search.*

[Explore Services](https://wingsmediaa.com/services) · [About Agency](https://wingsmediaa.com/about) · [Start a Project](https://wingsmediaa.com/contact)

</div>

---

## ⚡ Overview

**Wings Mediaa** is a modern, high-velocity marketing and technology agency based in Kanpur, India, serving category-leading businesses and ambitious direct-to-consumer (D2C) brands nationwide. 

Unlike traditional agencies that charge metro prices, take three weeks to draft an ad, and report vanity impressions, Wings Mediaa operates on a **hyper-fast sprint model**: pairing senior creative direction with AI-accelerated workflows to deploy campaigns in 48 hours and drive measurable revenue.

---

## 🎯 Core Disciplines

| Discipline | Focus Area | Deliverables |
| :--- | :--- | :--- |
| **01 · Social & Content** | Audience retention & brand resonance | Viral reels, high-craft video production, brand voice, content calendars |
| **02 · Performance Ads** | Customer acquisition & ROAS scaling | Meta Ads (Instagram/Facebook), Google Search & Shopping, creative testing |
| **03 · Web & Digital Experiences** | Conversion rate optimization & speed | Custom Next.js 15 web applications, interactive landing pages, SEO-first structure |
| **04 · SEO & AI Search (AEO)** | Multi-platform discovery | Google Search, Maps Local SEO, and Answer Engine Optimization (ChatGPT, Gemini, Perplexity) |
| **05 · WhatsApp & Automation** | Instant customer conversion | 24/7 intelligent WhatsApp conversational bots, CRM pipeline routing, lead triage |
| **06 · Brand Identity** | Distinctive visual positioning | Premium visual identity, brand guidelines, typography systems, art direction |

---

## 🚀 The AI Engine (Our Unfair Advantage)

We do not use AI as a novelty or to generate generic copy. We engineer proprietary AI-accelerated workflows to give our clients an unfair market advantage:

1. **Hyper-Velocity Production (48H Sprints)**: Rapid-iteration video scripts, automated asset variations, and AI-accelerated visual rendering turn 3-week agency timelines into 48-hour sprints.
2. **Answer Engine Optimization (AEO)**: As consumers increasingly search on AI platforms (ChatGPT, Perplexity, Google AI Overviews), we structure brand schemas so AI engines cite and recommend our clients first.
3. **Algorithmic Ad Intelligence**: Automated testing across dozens of creative angles simultaneously to find high-converting winners early and slash Customer Acquisition Cost (CAC).
4. **24/7 Intelligent Customer Capture**: Sub-60-second automated WhatsApp response pipelines capture and qualify leads before competitors even open their inbox.

---

## 🏆 Agency Operating Standards

- ⏱ **48-Hour Sprint Turnaround**: Fast deployment cycles with continuous iteration.
- 🎯 **Zero Vanity Metrics**: We optimize and report on revenue, phone calls, footfall, and qualified appointments.
- 🤝 **Direct Senior Accountability**: Every account is directly owned by senior creative and growth strategists—zero junior handoffs.
- 📍 **Local Market Fluency**: Ground-level psychological understanding of North Indian consumer behavior, commerce, and retail dynamics.

---

## 🛠 Tech Stack & Architecture

This repository hosts the official web experience for [wingsmediaa.com](https://wingsmediaa.com). It is engineered for sub-second performance, editorial typography, and fluid kinetic motion.

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) + React 18
- **Language**: TypeScript (strict type checking)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + CSS custom properties design tokens
- **Kinetic Motion & Smooth Scroll**:
  - [Lenis 1.x](https://github.com/darkroomengineering/lenis) for inertial smooth scroll
  - [GSAP 3.12+](https://gsap.com/) (ScrollTrigger, Flip, Timeline context)
  - [Motion (Framer Motion 11+)](https://motion.dev/) for micro-interactions
- **Typography**: Inter (Display & Body), Instrument Serif (Editorial Accent), JetBrains Mono (Technical metadata)
- **SEO & Social Cards**: Dynamic edge-rendered OpenGraph images (`next/og`), structured JSON-LD schemas (`Organization`, `LocalBusiness`, `Service`, `FAQPage`), and automated sitemaps.
- **Edge Deployment**: [Vercel](https://vercel.com/) configured on Mumbai Edge (`bom1`).

---

## 📁 Repository Structure

```
wings-mediaa/
├── app/                         # Next.js 15 App Router pages & metadata
│   ├── (site)/                  # Public route groups
│   │   ├── about/               # About agency, leadership squads, AI engine
│   │   ├── contact/             # Project brief inquiry form & direct lines
│   │   ├── services/            # Services index & deep-dive dynamic routes
│   │   ├── insights/            # Long-form editorial & strategic notes
│   │   └── sandbox/             # Isolated component QA environment
│   ├── layout.tsx               # Root shell (Nav, Footer, Lenis, JSON-LD)
│   ├── not-found.tsx            # Custom 404 recovery experience
│   ├── opengraph-image.tsx      # Dynamic brand social sharing cards
│   ├── robots.ts                # Crawler indexing directives
│   └── sitemap.ts               # Dynamic search engine sitemap
├── components/                  # Design system component library
│   ├── about/                   # AboutHero, AIEngine, Team, Story, Careers
│   ├── contact/                 # ContactForm, ContactDirect
│   ├── home/                    # 9 kinetic beat sections (Hero, Process, WhyUs, CTA)
│   ├── service/                 # Service templates & live interactive demos
│   └── Nav.tsx / Footer.tsx     # Global persistent navigation
├── lib/
│   ├── content/                 # Content schemas & agency copy
│   └── seo/                     # Canonical site metadata & JSON-LD generators
├── public/                      # Static assets, fonts, icons, manifest
├── styles/
│   └── globals.css              # Global tokens, theme variables & animations
├── next.config.ts               # Next.js runtime & security headers
├── tailwind.config.ts           # Design system tokens & utility classes
└── vercel.json                  # Edge caching, security headers & redirects
```

---

## 💻 Local Development

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vaibhavt896/wings-mediaa.git
   cd wings-mediaa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001) if port 3000 is occupied) in your browser.

4. **Verify TypeScript compilation:**
   ```bash
   npm run type-check
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📞 Connect & Contact

- **Website**: [wingsmediaa.com](https://wingsmediaa.com)
- **WhatsApp**: [+91 95804 67746](https://wa.me/919580467746)
- **Direct Lines**: `+91 95804 67746` · `+91 98970 30027`
- **Email**: [contact@wingsmediaa.com](mailto:contact@wingsmediaa.com)
- **Instagram**: [@wingsmediaa.in](https://www.instagram.com/wingsmediaa.in/)
- **Headquarters**: Tilak Nagar, Kanpur, Uttar Pradesh, India

---

<div align="center">
  <sub>© 2026 Wings Mediaa. All rights reserved. Built for speed, craft, and actual business results.</sub>
</div>
