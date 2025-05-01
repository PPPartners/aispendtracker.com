# AI Spend Tracker – Development Plan

## Feature 1: Project Setup & Backend Foundation

### Description

Initialize the core project structure using Next.js for the frontend and Supabase for backend (database, auth, Edge Functions), including CI/CD and database schema.

### Components

#### Component 1.1: Frontend Setup (Next.js + TypeScript + Tailwind)

- [x] Task 1.1.1: Initialize Next.js project with TypeScript (`npx create-next-app@latest ai-spend-tracker --typescript`).
- [x] Task 1.1.2: Install base dependencies:
  - UI & styling: `tailwindcss`, `@tailwindcss/forms`, `clsx`
  - Data fetching: `@supabase/auth-helpers-nextjs`, `@supabase/supabase-js`, `swr`
  - Charts: `chart.js`, `react-chartjs-2`
- [x] Task 1.1.3: Configure Tailwind CSS (generate `tailwind.config.js`, add to `globals.css`) and set up design tokens.
- [x] Task 1.1.4: Scaffold basic page routes: `/onboarding`, `/dashboard`, `/settings`.
- [ ] Task 1.1.5: Create `SupabaseProvider` and `AuthContext` using `@supabase/auth-helpers-nextjs` to manage session.

#### Component 1.2: Backend Setup (Supabase)

- [ ] Task 1.2.1: Create a new Supabase project.
- [ ] Task 1.2.2: Define initial database schema via SQL migrations (in `supabase/migrations`):
  - `users` (id, email, created_at)
  - `vendors` (id, name, created_at)
  - `charges` (id, user_id, vendor_id, invoice_id, date, description, amount, currency, category, created_at)
  - `projects` (id, user_id, name, created_at)
  - `budgets` (id, user_id, scope, amount, created_at)
  - `charge_tags` (charge_id, project_id)
- [ ] Task 1.2.3: Configure RLS policies to ensure each user can only access their own records.
- [ ] Task 1.2.4: Set up Supabase secrets for API keys (OpenAI, Anthropic, Stability).
- [ ] Task 1.2.5: Configure GitHub Actions workflow to run `supabase migrations deploy`, plus lint and build checks on push.

---

## Feature 2: Authentication & User Onboarding

### Description

Implement Sign-up/Sign-in via Supabase Auth and onboarding flow to collect billing sources.

### Components

#### Component 2.1: Supabase Auth Integration

- [ ] Task 2.1.1: Enable email/password and OAuth providers in Supabase Auth settings.
- [ ] Task 2.1.2: In Next.js, use `withPageAuth` and `useUser` hooks to protect routes and access session.
- [ ] Task 2.1.3: Build `/auth/signup` and `/auth/login` pages (email, password) using Supabase UI or custom forms.

#### Component 2.2: Onboarding Flow (Next.js)

- [ ] Task 2.2.1: Create a multi-step onboarding in `/onboarding`:
  1. Connect AI billing APIs (enter API keys)
  2. Upload CSV/JSON exports
  3. Set initial budgets
- [ ] Task 2.2.2: Use Supabase Edge Function or RPC to securely store API keys per user.
- [ ] Task 2.2.3: Client-side validation of key formats; display friendly errors.

---

## Feature 3: Billing Feed Ingestion

### Description

Automatically fetch usage and billing data from connected AI providers.

### Components

#### Component 3.1: Edge Functions for Connectors

- [ ] Task 3.1.1: Create Supabase Edge Function `fetch-openai-usage` to call OpenAI billing API.
- [ ] Task 3.1.2: Create Edge Functions `fetch-anthropic-usage` and `fetch-stability-usage`.
- [ ] Task 3.1.3: Use Supabase Scheduled Triggers (cron) to run these functions daily.

#### Component 3.2: Data Normalization & Storage

- [ ] Task 3.2.1: In each Edge Function, normalize responses into common schema (invoice_id, date, description, amount, currency).
- [ ] Task 3.2.2: Upsert into `charges` table, keyed on `(user_id, vendor_id, invoice_id)`.
- [ ] Task 3.2.3: Return summary counts for logs/monitoring.

---

## Feature 4: Manual Upload & Parsing

### Description

Allow users to upload CSV/JSON invoices for any SaaS not directly supported.

### Components

#### Component 4.1: File Upload (Next.js API Route)

- [ ] Task 4.1.1: Build an upload component using `<input type="file" />` with drag-and-drop support.
- [ ] Task 4.1.2: Validate file type client-side and POST to `/api/uploads/invoice`.

#### Component 4.2: Parsing & Ingestion (Edge Function)

- [ ] Task 4.2.1: Create Edge Function `parse-invoice-upload` triggered by the API route.
- [ ] Task 4.2.2: Auto-detect columns (date, amount, description) in CSV/JSON.
- [ ] Task 4.2.3: Normalize and upsert into `charges`.
- [ ] Task 4.2.4: Return import summary for UI feedback.

---

## Feature 5: Expense Categorization & Tagging

### Description

Auto-classify by vendor and allow manual overrides or custom project tags.

### Components

#### Component 5.1: Auto-Classification (Edge Function)

- [ ] Task 5.1.1: On `charges` insert, use a Postgres function or Edge Function to assign `category` based on `vendor_id`.

#### Component 5.2: Manual Overrides & Tags (Next.js)

- [ ] Task 5.2.1: In the Dashboard table, add controls to edit `category` and assign `project` tags.
- [ ] Task 5.2.2: Call Supabase RPC or update API route to persist changes in `charges` and `charge_tags`.

---

## Feature 6: Dashboard & Visualization

### Description

Build the core dashboard with summary tiles and interactive charts.

### Components

#### Component 6.1: Summary Tiles (Next.js)

- [ ] Task 6.1.1: Create a page at `/dashboard` with tiles for:
  - Total spend this month
  - Total spend last month
  - MoM % change
- [ ] Task 6.1.2: Fetch data via Supabase RPC functions or REST endpoints (e.g. `/api/metrics/summary`).

#### Component 6.2: Charts (Next.js)

- [ ] Task 6.2.1: Integrate `react-chartjs-2` line chart for spend over time.
- [ ] Task 6.2.2: Bar/pie chart for spend by vendor or project.
- [ ] Task 6.2.3: Add date-range selector component.

#### Component 6.3: Backend Metrics (Edge Functions or RPC)

- [ ] Task 6.3.1: Implement RPC `get_summary_metrics()`.
- [ ] Task 6.3.2: RPC `get_spend_over_time(range_days)`.
- [ ] Task 6.3.3: RPC `get_spend_by_vendor(range_days)` and `get_spend_by_project(range_days)`.

---

## Feature 7: Budgeting & Alerts

### Description

Allow users to set budgets and receive notifications at thresholds.

### Components

#### Component 7.1: Budget Management (Next.js + Supabase)

- [ ] Task 7.1.1: UI in `/settings/budgets` to create/edit budgets.
- [ ] Task 7.1.2: Persist budgets in `budgets` table via Supabase client.

#### Component 7.2: Alerting (Scheduled Edge Function)

- [ ] Task 7.2.1: Create Edge Function `check-budgets` to run daily via Scheduled Trigger.
- [ ] Task 7.2.2: Compare spend against 75%/100% thresholds.
- [ ] Task 7.2.3: Insert records into a `notifications` table and send email via SendGrid (or similar).
- [ ] Task 7.2.4: Build `/notifications` UI to display in-app alerts.

---

## Feature 8: Data Export & API

### Description

Provide CSV export and read-only JSON API for programmatic access.

### Components

#### Component 8.1: CSV Export (Next.js API)

- [ ] Task 8.1.1: API route `/api/exports/charges.csv` to stream CSV.
- [ ] Task 8.1.2: "Export CSV" button in `/settings` to download.

#### Component 8.2: Read-Only JSON API

- [ ] Task 8.2.1: API route `/api/charges` and `/api/metrics` protected by Supabase Service Role Key or API token.
- [ ] Task 8.2.2: UI to generate/revoke API tokens in settings.

---

## Feature 9: Security, Monitoring & Compliance

### Description

Harden security, add logging/monitoring, ensure basic compliance.

### Components

#### Component 9.1: Security

- [ ] Task 9.1.1: Enforce HTTPS (Vercel config).
- [ ] Task 9.1.2: Rate-limit API routes using Vercel Edge Middleware.
- [ ] Task 9.1.3: Review RLS policies and RPC definitions for least privilege.

#### Component 9.2: Monitoring & Logging

- [ ] Task 9.2.1: Integrate Sentry for frontend/Edge Function error tracking.
- [ ] Task 9.2.2: Set up Supabase Logs review in project dashboard.
- [ ] Task 9.2.3: Configure uptime checks on `/api/health` (Vercel/UptimeRobot).

#### Component 9.3: Compliance

- [ ] Task 9.3.1: Implement `/api/user/delete` to purge user data.
- [ ] Task 9.3.2: Add GDPR-style consent checkbox during signup.

---

## Feature 10: Testing, Deployment & Launch

### Description

Finalize tests, deploy to staging/production, onboard pilot users.

### Components

#### Component 10.1: Testing

- [ ] Task 10.1.1: Write unit tests for Edge Functions (Vitest).
- [ ] Task 10.1.2: Write integration tests for RPCs (pgTAP or similar).
- [ ] Task 10.1.3: E2E tests for key UI flows (Playwright).

#### Component 10.2: Deployment

- [ ] Task 10.2.1: Configure Vercel for Next.js deployments (staging & production).
- [ ] Task 10.2.2: Configure Supabase CLI for migrations in CI.
- [ ] Task 10.2.3: Deploy to staging, run smoke tests.
- [ ] Task 10.2.4: Promote to production on go-live.

#### Component 10.3: Pilot Launch

- [ ] Task 10.3.1: Invite 5–10 solo builders to pilot.
- [ ] Task 10.3.2: Collect feedback via Typeform or in-app survey.
- [ ] Task 10.3.3: Triage and prioritize fixes/UX improvements.

---

## Feature 11: Marketing Landing Page & Documentation

### Description

Build a simple Next.js landing page and in-app help docs.

### Components

#### Component 11.1: Landing Page (Next.js)

- [ ] Task 11.1.1: Scaffold Next.js site (can live in monorepo).
- [ ] Task 11.1.2: Write copy and add screenshots.
- [ ] Task 11.1.3: Email capture form (Mailchimp).
- [ ] Task 11.1.4: Deploy to custom domain via Vercel.

#### Component 11.2: In-App Help

- [ ] Task 11.2.1: Create markdown-based help pages under `/pages/help`.
- [ ] Task 11.2.2: Link from `/settings/help`.

---

## Feature 12: Post-MVP Planning

### Description

Outline next-phase enhancements based on pilot feedback.

### Components

#### Component 12.1: Roadmap Draft

- [ ] Task 12.1.1: Analyze usage metrics and feedback.
- [ ] Task 12.1.2: Prioritize v2 features: multi-user teams, advanced analytics, mobile app.
- [ ] Task 12.1.3: Draft timeline and resource estimates.
