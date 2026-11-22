# 🌐 Ansh Arora — Developer Portfolio

**Production-Grade Personal Portfolio, 3D Interactive Commit Skyline, Telemetry Visualizers, and Embedded AI Copilot**

[![Live Site](https://img.shields.io/badge/Live_Portfolio-portfolio--orcin--rho--92.vercel.app-black?style=for-the-badge&logo=vercel)](https://portfolio-orcin-rho-92.vercel.app/)
[![Next.js 16](https://img.shields.io/badge/Framework-Next.js_16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/Library-React_19.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/3D_Graphics-Three.js-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/Animation-GSAP%20%2F%20Lenis-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 Executive Summary

This repository hosts the source code for [Ansh Arora's portfolio](https://portfolio-orcin-rho-92.vercel.app/).

Designed under the **"Systems Notebook"** art direction—blending warm paper textures (`#F4F1EA`), high-contrast carbon typography (`#121212`), hairlines (`#D8D2C4`), and vermilion accents (`#C8260E`)—the application presents software systems, machine learning engineering, and quantitative financial research through interactive proof rather than static claims.

---

## 🌟 Signature Features

1. **3D Commit Skyline (`CommitSkyline3D.tsx`)**:
   - Interactive Three.js canvas rendering a spatial 3D bar graph of annual GitHub contributions with dynamic camera orbits and lighting.
2. **Interactive AI Copilot (`AskAnsh.tsx`)**:
   - Natural language search interface allowing visitors, recruiters, and hiring managers to ask questions about my background, project architecture, and technical decisions, answered using local knowledge embeddings (`knowledge.json`).
3. **Live Interactive Project Demonstrations**:
   - **`DeltaOptionsDemo.tsx`**: Interactive BTC option payoff curve and 25-gate matrix evaluator.
   - **`GridGuardDemo.tsx`**: Electrical feeder loss simulator with dynamic load charts.
   - **`NseScannerDemo.tsx`**: Live market breadth playback replicating real-time SSE streams.
   - **`RagForgeDemo.tsx`**: Multi-tenant document ingestion and similarity retrieval simulator.
4. **Interactive Terminal (`InteractiveTerminal.tsx`)**:
   - Keyboard-navigable developer CLI supporting commands: `help`, `skills`, `projects`, `contact`, `clear`.
5. **Ultra-Smooth Interaction Layer**:
   - Inertial smooth scrolling powered by **Lenis** (`lenis: ^1.3.26`).
   - Micro-interaction animations driven by **GSAP** (`gsap: ^3.15.0`) and `@gsap/react`.

---

## 💻 Tech Stack & Architecture

- **Core Framework**: Next.js 16 (App Router), React 19 (Server & Client Components)
- **3D & Motion**: Three.js (`three: ^0.187.0`), GSAP (`gsap: ^3.15.0`), Lenis Smooth Scroll
- **Type Safety & Validation**: TypeScript 5, Zod (`zod: ^4.6.6`)
- **Styling**: Tailwind CSS 4 with custom editorial font pairings and hairline borders
- **Content & Search**: Static JSON knowledge graph with in-memory semantic retrieval

---

## 📂 Repository Layout

```text
portfolio/
├── public/                     # Resume PDF, certifications, profile imagery
├── scripts/                    # Build scripts (check-links, check-contrast, build-knowledge)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root shell, font declarations, Lenis provider
│   │   ├── page.tsx            # Main landing page
│   │   ├── resume/page.tsx     # Dedicated resume viewer
│   │   └── styleguide/page.tsx # Design system & token showcase
│   ├── components/
│   │   ├── demos/              # Interactive simulators (Delta, GridGuard, NSE, RagForge)
│   │   ├── features/           # CommitSkyline3D, AskAnsh, InteractiveTerminal
│   │   ├── layout/             # Header, Footer, ThemeToggle
│   │   ├── sections/           # Hero, Work, Practice, Writing, Contact
│   │   └── ui/                 # Buttons, Drawers, Panels, SpotlightCards
│   ├── content/                # Structured experience, projects, metrics, and knowledge
│   └── lib/                    # Retrieval helpers, theme utilities, prompts
├── package.json
└── tsconfig.json
```

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/anshere0/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Author
**Ansh Arora**  
- Portfolio: [https://portfolio-orcin-rho-92.vercel.app/](https://portfolio-orcin-rho-92.vercel.app/)  
- GitHub: [@anshere0](https://github.com/anshere0)  
- LinkedIn: [Ansh Arora](https://www.linkedin.com/in/ansh-arora0/)
