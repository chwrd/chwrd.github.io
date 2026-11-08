# Howard Cheng — Personal Portfolio

[![Deploy Next.js site to Pages](https://github.com/chwrd/chwrd.github.io/actions/workflows/nextjs.yml/badge.svg)](https://github.com/chwrd/chwrd.github.io/actions/workflows/nextjs.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-chwrd.github.io-blue?style=flat&logo=github)](https://chwrd.github.io/)

Personal portfolio and website for **Howard Cheng** — Computer Science student at the **University of Washington** (Class of 2028), exchange student at **The Chinese University of Hong Kong** (2025–2026), and 2025 **Benjamin A. Gilman International Scholar**.

Explore the live site at **[chwrd.github.io](https://chwrd.github.io/)**.

---

## What's Inside

- **Selected Projects** — Full-stack web applications and software engineering builds, including:
  - **VendorLink** — A modern marketplace platform connecting vendors and customers.
  - **SoloGo** — An AI-powered travel assistant built for solo adventurers during UWB Hacks.
- **Interactive Travel & Exchanges Map** — An interactive world map visualizing travel history, study-abroad experiences, and academic delegations across East Asia and North America, complete with category filters and dual card/table views.
- **Art & Photography Portfolio** — An interactive showcase featuring street, portrait, and architectural photography from Jiangsu, China.
- **Background & Bio** — Academic coursework, honors (Gilman Scholarship), exchange programs, and technical skillsets.
- **Connect & Contact** — Direct links to GitHub, LinkedIn, and professional contact channels.

---

## Website Sections

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Introduction, hero illustration, quick bio, and direct navigation links. |
| `/projects` | **Projects** | Showcase of featured full-stack applications with live demos and repository links. |
| `/travel` | **Travel & Exchanges** | Interactive SVG world map tracking travel, exchange programs, and visits across North America and East Asia. |
| `/art-portfolio` | **Art Portfolio** | Curated photography collection with a responsive interactive carousel. |
| `/about` | **About** | Education timeline, CUHK exchange, academic milestones, and technical background. |
| `/contact` | **Connect** | Channels to connect via LinkedIn, GitHub, and professional opportunities. |

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, static HTML export via `output: 'export'`)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/turbopack`
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Data Visualization & Mapping:** [react-simple-maps](https://www.react-simple-maps.io/), [d3-scale](https://github.com/d3/d3-scale), and TopoJSON (`countries-110m.json`)
- **Typography:** Custom Google Fonts (*Eczar* and *Work Sans*)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **CI/CD & Deployment:** GitHub Actions deploying static builds directly to [GitHub Pages](https://pages.github.com/)

---

## Project Structure

```text
chwrd.github.io/
├── .github/
│   └── workflows/
│       └── nextjs.yml           # GitHub Actions workflow for automated Pages deployment
├── app/
│   ├── about/                   # About page (bio, education, honors)
│   ├── art-portfolio/           # Photography portfolio & carousel component
│   ├── components/
│   │   ├── PageHeader.tsx       # Reusable page header with eyebrow, title, and metric badges
│   │   ├── site.tsx             # Shared Header, Footer, and navigation components
│   │   └── TravelMap.tsx        # Interactive SVG map component powered by react-simple-maps
│   ├── contact/                 # Contact & networking links
│   ├── projects/                # Featured projects showcase
│   ├── travel/                  # Travel logs, filtering, and interactive map view
│   ├── globals.css              # Global styling, color variables, animations, and responsive utilities
│   ├── layout.tsx               # Root layout, metadata, and font configurations
│   └── page.tsx                 # Home landing page
├── public/                      # Static assets (photographs, screenshots, icons, TopoJSON data)
├── next.config.ts               # Next.js configuration (static export, unoptimized images, Turbopack)
├── package.json                 # Project dependencies and npm scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## Deployment

The site is configured for continuous deployment with **GitHub Pages**:
- Every push to the `main` branch automatically triggers the `.github/workflows/nextjs.yml` workflow.
- The workflow installs dependencies with `pnpm`, builds the static export to `./out`, and publishes the bundle to GitHub Pages.

---

## Connect

- **GitHub:** [@chwrd](https://github.com/chwrd)
- **LinkedIn:** [Howard Cheng](https://www.linkedin.com/in/howard-ch)
