# STRATA — Construction Intelligence Platform

> **Tagline:** *The Operating System for Firms Who Build With Conviction*

---

## 1. Project Title

**STRATA** — Construction Intelligence

A premium, multi-tenant SaaS platform that unifies construction project management, capital control, team collaboration, document governance, and field operations into one luxury-grade digital workspace. STRATA serves general contractors, developers, and construction firms who manage multiple projects, crews, subcontractors, and clients simultaneously.

---

## 2. Tech Stack

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2 | UI component architecture |
| **TypeScript** | 5.9 | Type-safe development |
| **Vite** | 7.3 | Build tooling & dev server |

### Styling & Design System
| Technology | Purpose |
|---|---|
| **Tailwind CSS 4** | Utility-first styling with custom `@theme` design tokens |
| **Custom CSS Design Tokens** | Gold-luxury color system (`--color-gold-*`, `--color-ink-*`) |
| **Playfair Display** | Serif display typography (luxury editorial feel) |
| **Inter** | Body/UI sans-serif typography |
| **JetBrains Mono** | Monospace for figures, IDs, financial data |
| **Glassmorphism utilities** | Backdrop-blur layered surfaces |
| **Custom animation library** | fadeUp, pageIn, kenBurns, stagger reveals, gold shimmer, count-ups |

### Libraries
| Library | Purpose |
|---|---|
| **Lucide React** | Complete icon system (no emojis, line-art luxury icons) |
| **Recharts** | Data visualization (Area, Bar, Line, Pie charts with dark/gold theming) |
| **clsx + tailwind-merge** | Class-name composition utilities |

### Build & Distribution
| Technology | Purpose |
|---|---|
| **vite-plugin-singlefile** | Bundles entire app into one deployable HTML file |
| **IntersectionObserver API** | Native scroll-triggered reveal animations |
| **requestAnimationFrame** | Butter-smooth count-up & typewriter animations |
| **Pexels API imagery** | Premium stock photography (construction, architecture, field crews) |

### Data Layer
| Approach | Purpose |
|---|---|
| **TypeScript-typed dummy data layer** (`src/data/dummyData.ts`) | 15+ fully-modeled entity types with relational integrity |
| **React useState state management** | Live, interactive in-memory store — every action mutates state |

---

## 3. What The Platform Does

STRATA digitizes the **entire construction business lifecycle** — from company registration through project commissioning, daily field reporting, cost control, and client handover.

### End-to-End Capabilities

**🏢 Company & Multi-Tenancy**
- Company registration with 4-step onboarding wizard (Firm → Owner → Team → Membership)
- Isolated tenant workspaces per firm with full data separation
- Subscription tiers (Starter / Professional / Enterprise) with usage meters
- Super-admin "Sovereign Console" for platform operators: tenant management, suspension, tier elevation, fabric health telemetry, immutable audit trail

**📊 Executive Command Center**
- KPI cards with animated count-ups (portfolio value, workforce, tasks, projects)
- Capital expenditure area charts, task-velocity donut, labor-hours bars
- Flagship project hero with photographic banner and live progress ring
- Live activity feed, critical-path task radar, milestone sentinel
- "From the Field" photographic strip

**🏗️ Project Portfolio Management**
- Photographic project cards with status, budget, spend, progress bars
- Grid/Ledger views, status filtering, instant search
- Full project detail: 7 tabs — Brief, Tasks, Documents, Budget, Schedule, Logs, Team
- Commission-new-project modal workflow with confirmation state

**✅ Task Execution (Kanban)**
- 4-column board (To Do / In Progress / Review / Done) + ledger table view
- Interactive task cards with priority chips, assignee, due dates
- In-memory status transitions (click to move tasks through workflow)
- Priority filtering, text search, task creation modal

**📅 Master Scheduling**
- Gantt-style engagement timelines with executed-vs-remaining shading
- Milestone ledger on a critical-path timeline
- Full calendar month view with event indicators and today highlighting
- Upcoming deadline radar

**📝 Field Journal (Daily Logs)**
- Daily site entries with weather, temperature, personnel count, labor hours, safety incidents, delay flags
- Photographic log cards, detail modal with narrative
- Filing form with validation states and success confirmation

**📁 Document Vault**
- Drawings, specifications, contracts, photos, reports, permits
- Version tracking (Rev 1–5), depositor, size, classification
- Search + type filters, detail modal, drag-and-drop upload zone
- Site imagery gallery

**💬 RFIs (Requests for Information)**
- Formal Q&A workflow with SLA due dates
- Priority and status chips, response composition area
- RFI drafting modal with engagement assignment

**📜 Change Instruments (Change Orders)**
- Contract change workflow: draft → submitted → approved/rejected
- Consideration amounts, grounds (client request / scope / unforeseen / regulatory)
- Executive "Execute & Approve" / "Decline" decision controls with animated confirmation

**💰 Capital Ledger (Budget & Cost Control)**
- Per-category budget vs. deployed vs. committed bars
- Variance tracking with favorable/adverse indicators
- Capital-mix donut chart, line-item ledger with utilization bars
- Totals row with percentage deployment

**📈 Reports & Board Pack**
- Four report suites: Portfolio Brief, Capital Review, Execution Metrics, Workforce Report
- Export Board Pack action
- Progress trajectories, composition donuts, capital-flow lines, discipline hours

**👥 People Operations**
- Workforce directory with roles: Owner, Admin, Project Manager, Field Worker, Subcontractor, Client
- Online status dots, invitation workflow, suspension
- Granular **RBAC permission matrix** (12 permission toggles per user)
- Trade-partner (subcontractor) directory with star ratings, license & insurance-expiry alerts, prequalification status

**🤝 Client Observatory (Client Portal)**
- Client-facing project view: progress, contract sum, milestone outlook
- Released documents with retrieve/preview
- **Direct Line live chat** with the project principal (simulated replies)

**🔔 Engagement & Governance**
- Real-time notification center with read/unread states
- Global search across projects, tasks, documents, RFIs
- Chronicle activity feed with type filtering + team "Council Room" posting
- Immutable audit log (actor, action, IP, timestamp)

**⚙️ Workspace Administration**
- Firm Profile, My Identity, Notification Doctrine (custom toggle switches)
- Security: credential rotation, 2FA state, active session management
- Appearance: Noir/Alabaster motifs, accent-metal palette, density
- Integrations: Procore, QuickBooks, Dropbox, Slack, AutoCAD, Google Calendar
- API key minting/copy/revoke, data sovereignty & export, dissolution

**🌐 Marketing Site**
- Cinematic landing page: rotating-word hero, Ken Burns photography, trusted-firm ticker, bento features, 3D-tilting product preview, testimonials, pricing, CTA, luxe footer
- Animated 4-step onboarding funnel
- Login with **typewriter credential autofill** for 4 demo roles + one-click demo entry

---

## 4. Target Clients (Who Buys This)

| Segment | Profile | Why They Buy |
|---|---|---|
| **General Contractors (10–500 staff)** | Mid-market GCs running 3–30 concurrent projects | Replace 4–6 disconnected tools (spreadsheets, WhatsApp, Dropbox, Procore-lite) with one command center |
| **Commercial Developers** | Firms developing towers, retail, mixed-use | Capital control, investor-grade board packs, change-instrument governance |
| **Luxury Residential Builders** | High-end estates & multifamily | Client Observatory (portal) as a differentiator; photo-rich progress reporting |
| **Infrastructure & Heavy Civil** | Bridges, stations, utilities | Field journal compliance, safety-incident logs, milestone sentinels |
| **Construction Group Headquarters** | Multi-company groups & conglomerates | Multi-tenant Sovereign Console, audit trails, tiered subscriptions |
| **Project Management Consultancies / Owner's Reps** | Managing on behalf of owners | Client-facing transparency, RFI/change-order documentation trail |
| **Specialty Subcontractors (scaling)** | Electrical, MEP, façade firms acting as primes | Trade-partner vetting, insurance expiry alerts, document versioning |

---

## 5. Platform Qualities

### Design Quality
- **Luxury Noir aesthetic** — champagne gold (`#C9A961`) on deep charcoal, Playfair Display serif editorial voice
- **Zero emojis** — 100% Lucide line icons
- Real premium photography (Pexels) throughout — never placeholders

### Motion Quality
- Page-transition choreography, staggered entrance animations
- IntersectionObserver scroll reveals, Ken Burns image drift
- Count-up statistics, typewriter autofill, 3D hover tilt, gold shimmer sweeps, animated bars
- Spring-animated modals with backdrop blur

### Product Quality
- **Everything is clickable** — 17 modules, 40+ interactive modals, working filters, toggles, tabs, and state mutations
- Type-safe relational dummy data (projects ↔ tasks ↔ budgets ↔ logs ↔ documents)
- Fully responsive: collapsible sidebar, mobile top-bar menu, adaptive grids

### Architecture Quality
- Component-per-page structure with shared layout primitives
- Custom design-token CSS system (`lux-card`, `lux-glass`, `lux-btn-gold`, `lux-input`)
- Single-file production bundle for frictionless deployment

---

## 6. Rapid Summary

- **What it is:** A luxury dark-mode SaaS for running construction empires — projects, money, people, papers, and proof of work.
- **Who buys it:** General contractors, developers, residential builders, infrastructure firms, PM consultancies, and construction group HQs.
- **Built with:** React 19 + TypeScript + Vite + Tailwind CSS 4 + Recharts + Lucide + custom animation system (no backend — typed dummy-data layer).
- **Stands out for:** Board-grade aesthetics, cinematic motion, role-based access control, client portal with live chat, and a fully interactive demo where every control works.
