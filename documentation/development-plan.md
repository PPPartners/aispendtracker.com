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
- [x] Task 1.1.5: Create Supabase clients (`client.ts`, `server.ts`) and middleware using `@supabase/ssr` to manage session.

#### Component 1.2: Backend Setup (Supabase)

- [x] Task 1.2.1: Create a new Supabase project.
- [x] Task 1.2.2: Define initial database schema via SQL migrations (in `supabase/migrations`):
  - `users` (id, email, created_at)
  - `vendors` (id, name, created_at)
  - `charges` (id, user_id, vendor_id, invoice_id, date, description, amount, currency, category, created_at)
  - `projects` (id, user_id, name, created_at)
  - `budgets` (id, user_id, scope, amount, created_at)
  - `charge_tags` (charge_id, project_id)
- [x] Task 1.2.3: Configure RLS policies to ensure each user can only access their own records.
- [x] Task 1.2.5: Configure GitHub Actions workflow to run `supabase migrations deploy`, plus lint and build checks on push.

---

## Feature 2: Marketing Landing Page & Documentation

### Description

Build a simple Next.js landing page and in-app help docs.

### Components

#### Component 2.1: Landing Page (Next.js)

- [x] Task 2.1.1: Build landing page structure and sections in `src/app/page.tsx`.
- [x] Task 2.1.2: Write copy and add UI elements (layout, charts, logo, pricing).
- [x] Task 2.1.3: Add Email capture form UI for waitlist.
- [x] Task 2.1.4: Deploy to custom domain via Vercel.

#### Component 2.2: Waitlist Email Signup Flow

- [x] Task 2.2.1: Create backend endpoint (e.g., API Route `/api/waitlist`) to receive email, store it, and trigger confirmation email.
- [x] Task 2.2.2: Integrate email service (e.g., Resend) and create confirmation email template.
- [x] Task 2.2.3: Build waitlist confirmation page (e.g., `/waitlist/confirm/[token]`) with form for additional user info.
- [x] Task 2.2.4: Update landing page signup form to call the backend API and handle loading/success/error states.

---

## Feature 3: Authentication & User Onboarding

### Description

Implement Sign-up/Sign-in via Supabase Auth and onboarding flow to collect billing sources.

### Components

#### Component 3.1: Supabase Auth Integration

- [ ] Task 3.1.0: Create dummy pages /unprotected & /protected, to test if auth works.
- [ ] Task 3.1.1: Enable email/password and OAuth providers in Supabase Auth settings.
  - [ ] Task 3.1.1.1: Enable sign-in with Google
  - [ ] Task 3.1.1.2: Enable sign-in with GitHub
  - [ ] Tasl 3.1.1.3: Enable sign-in with Email
- [ ] Task 3.1.2: In Next.js, use `withPageAuth` and `useUser` hooks to protect routes and access session.
- [ ] Task 3.1.3: Build `/auth/signup` and `/auth/login` pages (email, password) using Supabase UI or custom forms.

#### Component 3.2: Onboarding Flow (Next.js)

- [ ] Task 3.2.1: Create a multi-step onboarding in `/onboarding`:
  1. Connect AI billing APIs (enter API keys)
  2. Upload CSV/JSON exports
  3. Set initial budgets
- [ ] Task 3.2.2: Use Supabase Edge Function or RPC to securely store API keys per user.
- [ ] Task 3.2.3: Client-side validation of key formats; display friendly errors.

---

## Feature 4: Billing Feed Ingestion

### Description

Automatically fetch usage and billing data from connected AI providers.

### Components

#### Component 4.1: Edge Functions for Connectors

- [ ] Task 4.1.1: Create Supabase Edge Function `fetch-openai-usage` to call OpenAI billing API.
- [ ] Task 4.1.2: Create Edge Functions `fetch-anthropic-usage` and `fetch-Google-usage`.
- [ ] Task 4.1.3: Use Supabase Scheduled Triggers (cron) to run these functions daily.

#### Component 4.2: Data Normalization & Storage

- [ ] Task 4.2.1: In each Edge Function, normalize responses into common schema (invoice_id, date, description, amount, currency).
- [ ] Task 4.2.2: Upsert into `charges` table, keyed on `(user_id, vendor_id, invoice_id)`.
- [ ] Task 4.2.3: Return summary counts for logs/monitoring.

---

## Feature 5: Manual Upload & Parsing

### Description

Allow users to upload CSV/JSON invoices for any SaaS not directly supported.

### Components

#### Component 5.1: File Upload (Next.js API Route)

- [ ] Task 5.1.1: Build an upload component using `<input type="file" />` with drag-and-drop support.
- [ ] Task 5.1.2: Validate file type client-side and POST to `/api/uploads/invoice`.

#### Component 5.2: Parsing & Ingestion (Edge Function)

- [ ] Task 5.2.1: Create Edge Function `parse-invoice-upload` triggered by the API route.
- [ ] Task 5.2.2: Auto-detect columns (date, amount, description) in CSV/JSON.
- [ ] Task 5.2.3: Normalize and upsert into `charges`.
- [ ] Task 5.2.4: Return import summary for UI feedback.

---

## Feature 6: Expense Categorization & Tagging

### Description

Auto-classify by vendor and allow manual overrides or custom project tags.

### Components

#### Component 6.1: Auto-Classification (Edge Function)

- [ ] Task 6.1.1: On `charges` insert, use a Postgres function or Edge Function to assign `category` based on `vendor_id`.

#### Component 6.2: Manual Overrides & Tags (Next.js)

- [ ] Task 6.2.1: In the Dashboard table, add controls to edit `category` and assign `project`
