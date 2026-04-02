# REVV Web

Standalone sales and members site for REVV.

## What it includes

- Public sales funnel at `/`
- Members hub at `/members`
- Members login gate at `/members/login`
- Payment success handoff at `/success`
- Public waitlist signup API
- Members-only roadmap and dev log access

## Setup

1. Copy `.env.example` to `.env.local`
2. Fill in the Supabase and REVV variables
3. Run `corepack pnpm install`
4. Run `corepack pnpm dev`

## Required environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `REVV_MEMBER_ACCESS_PASSWORD`

## Optional environment variables

- `REVV_PAYMENT_LINK_URL`
- `REVV_FEEDBACK_FORM_URL`
- `REVV_COMMUNITY_URL`
