# panchoblanco.dev — Structural Map & Access System

_PocketBase-backed · Nuxt 4 / Nitro_

---

## Site Structure

```
panchoblanco.dev/
├── /                          ← Home
├── /work                      ← Case studies index
│   ├── /work/demand-io        ← [visibility: public | gated]
│   ├── /work/bitpatagonia     ← [visibility: public | gated]
│   ├── /work/viafoura         ← [visibility: public | gated]
│   ├── /work/biotrack         ← [visibility: public | gated]
│   └── /work/digital-house    ← [visibility: public | gated]
├── /lab                       ← Lab/portfolio index
│   ├── /lab/[slug]            ← Individual lab piece (some gated)
│   └── /lab/templates/[slug] ← Full-page template demos
├── /about                     ← About page
├── /resume                    ← CV
├── /gate                      ← Token entry page (gated content)
└── /admin                     ← Admin panel (admin only)
    ├── /admin/projects        ← Manage case studies
    ├── /admin/lab             ← Manage lab pieces
    ├── /admin/tokens          ← Generate & manage access tokens
    └── /admin/flags           ← Feature flags (Vercel Edge Config)
```

---

## PocketBase Schema

### Collection: `projects`

```
id              string   PB auto-id
title           string   "Demand.io"
slug            string   "demand-io"  (unique)
tagline         string   "Vue 3 migration & design system"
visibility      select   public | one_time | timed | admin_only
status          select   draft | published
thumbnail       file     cover image
tags            json     ["Vue", "Nuxt", "Tailwind"]
sort_order      number   display order on /work

// 8-block content (the case study template)
block_hero      json     { headline, role, period, liveUrl }
block_context   text     background / company info
block_challenge text     the problem
block_approach  text     how it was solved
block_stack     json     [{ name, reason }]
block_contrib   json     [{ title, description }]
block_outcome   json     { metrics: [], quote: {} }
block_reflect   text     what Fran learned

created         auto
updated         auto
```

### Collection: `lab_pieces`

```
id              string
title           string   "Magnetic button"
slug            string   "magnetic-button"
description     text     short summary
category        select   micro | animation | component | template
tags            json     ["CSS", "Spring physics"]
status          select   draft | published
visibility      select   public | admin_only
featured        bool     show on home page?
sort_order      number

// Demo
demo_type       select   inline | iframe | route
demo_url        url      optional — for iframe or external demos
component_path  string   optional — "lab/MagneticButton.vue"

// Cold outreach metadata
target_client   text     "SaaS companies with CTAs"
pitch_angle     text     "Shows attention to micro-interaction craft"

created
updated
```

### Collection: `access_tokens`

```
id              string
token           string   unique, 24-char random (indexed)
label           string   "ACME Corp — demand-io review"
type            select   one_time | timed | session

// What it unlocks
scope_type      select   project | lab_piece | all_projects | all_lab | all
scope_id        string   optional — specific resource id (null = whole scope)

// One-time config
max_uses        number   default: 1
used_count      number   default: 0
used_at         date     set on first use (one_time only)

// Timed config
expires_at      date     null = never (for one_time tokens)

// Tracking
created_by      relation → users.id
notes           text     internal notes for Fran
created
updated
```

### Collection: `access_logs`

```
id
token_id        relation → access_tokens.id
ip_hash         string   SHA256 of IP (privacy-safe)
user_agent      string
resource_type   string
resource_id     string
accessed_at     date
```

### Collection: `users` (PocketBase built-in)

```
id
email
name
avatar          file
role            select   admin | viewer
// admin = Fran + any trusted person
// viewer = no login, access via tokens only
```

---

## Access Matrix

```
                          Public   One-time token   Timed token   Admin session
─────────────────────────────────────────────────────────────────────────────────
/work index               ✓        ✓                ✓             ✓
/work/[slug] public       ✓        ✓                ✓             ✓
/work/[slug] one_time     ✗        ✓ (once)         ✓             ✓
/work/[slug] timed        ✗        ✗                ✓             ✓
/work/[slug] admin_only   ✗        ✗                ✗             ✓
─────────────────────────────────────────────────────────────────────────────────
/lab index                ✓        ✓                ✓             ✓
/lab/[slug] public        ✓        ✓                ✓             ✓
/lab/[slug] admin_only    ✗        ✗                ✗             ✓
─────────────────────────────────────────────────────────────────────────────────
/admin/**                 ✗        ✗                ✗             ✓
─────────────────────────────────────────────────────────────────────────────────
```

---

## Token Types — Behavior

### `one_time`

- Generated per client
- Token consumed on first page load
- Session cookie set for 24h so they can navigate freely without re-entering
- Second visit from a different browser/device → 403 "This link has already been used"
- `used_count` incremented, `used_at` stamped
- Good for: sending to a specific recruiter or client via UnoSend

### `timed`

- Valid from creation until `expires_at`
- Unlimited visits within the window
- Session cookie refreshed on each visit (stays alive while active)
- Past expiry → 403 "This access link has expired"
- Good for: interview processes ("here's my portfolio access for the next 7 days"), agency reviews

### `session` (admin)

- PocketBase JWT stored in httpOnly cookie
- Standard email/password login at `/admin`
- Full site access, sees drafts and `admin_only` content
- 7-day refresh window
- Good for: Fran himself, and any trusted co-reviewer

---

## Token Generation Flow

```
Fran (admin) creates token
  → POST /api/admin/tokens/generate
    {
      type: "one_time",
      scope_type: "project",
      scope_id: "demand-io-pb-id",
      label: "ACME Corp initial review",
      max_uses: 1
    }
  → PocketBase creates access_token record
  → Nitro returns: { token: "t_x7k2mQpR9nLvW3hY", url: "https://panchoblanco.dev/work/demand-io?t=t_x7k2..." }
  → Fran puts the token into UnoSend → sends UnoSend link to client
    (UnoSend destroys the token value after client reads it — security layer)
```

```
Client receives UnoSend link
  → Opens UnoSend → sees token string (link now dead)
  → Visits: https://panchoblanco.dev/work/demand-io?t=t_x7k2mQpR9nLvW3hY

Nitro middleware intercepts
  → Reads ?t= param
  → POST to PocketBase: find access_token where token = "t_x7k2..."
    → Not found → 403
    → Found, type=one_time, used_count >= max_uses → 403 "Already used"
    → Found, type=timed, expires_at < now → 403 "Expired"
    → Valid →
      - Increment used_count, stamp used_at (one_time only)
      - Create access_log entry
      - Set httpOnly session cookie:
        {
          session_id: crypto.randomUUID(),
          token_id: "pb_token_id",
          scope_type: "project",
          scope_id: "demand-io-pb-id",
          granted_at: now,
          expires_at: now + 24h   // or token.expires_at for timed
        }
      - Render page normally
```

```
Client navigates within their session
  → Cookie present, valid, not expired → serve content
  → Cookie expired → redirect to /gate?redirect=/work/demand-io
```

---

## Nuxt / Nitro File Structure

```
server/
  middleware/
    01.pb-session.ts       ← attaches pb client + decodes session cookie to event context
  api/
    auth/
      login.post.ts        ← admin email+password → PB JWT → httpOnly cookie
      logout.post.ts       ← clear all cookies
      me.get.ts            ← current session info
    tokens/
      generate.post.ts     ← [admin] create token, return URL
      list.get.ts          ← [admin] all tokens with usage stats
      revoke.post.ts       ← [admin] invalidate token
      validate.post.ts     ← [public] validate ?t= param, issue session cookie
    projects/
      index.get.ts         ← list projects (filtered by session scope)
      [slug].get.ts        ← get project content (gated)
    lab/
      index.get.ts         ← list published lab pieces
      [slug].get.ts        ← get lab piece (gated if admin_only)
    admin/
      projects/            ← full CRUD (admin session required)
      lab/                 ← full CRUD
      flags.get.ts         ← read Vercel Edge Config
      flags.post.ts        ← write Vercel Edge Config

utils/
  pb.ts                    ← PocketBase client singleton (Nitro util)
  session.ts               ← session cookie encode/decode (Jose JWT)
  gate.ts                  ← canAccess(session, resource) → boolean

middleware/   ← Nuxt route middleware (client-side)
  auth.ts                  ← redirects to /gate if no valid session for gated routes

pages/
  gate.vue                 ← token entry UI
  admin/
    index.vue              ← dashboard overview
    projects/
      index.vue            ← project list
      [id].vue             ← edit project
    lab/
      index.vue            ← lab pieces list
      [id].vue             ← edit lab piece
    tokens/
      index.vue            ← token list with usage stats
      new.vue              ← token generator form
    flags.vue              ← feature flag toggles
```

---

## PocketBase API Rules

Set these in the PocketBase admin UI (/\_/):

```js
// projects — list rule
status = "published" && (
  visibility = "public" ||
  @request.auth.id != ""
)

// projects — view rule
status = "published" && (
  visibility = "public" ||
  @request.auth.id != ""
)
// Note: visibility=one_time|timed|admin_only checked in Nitro layer,
// not PocketBase rules — PocketBase just confirms record exists

// access_tokens — all operations
@request.auth.id != "" && @request.auth.role = "admin"

// access_logs — create rule (allow Nitro to write)
@request.auth.id != ""  // using service key from Nitro

// lab_pieces — list/view rule
status = "published" && (
  visibility = "public" ||
  @request.auth.id != ""
)
```

---

## Session Cookie Structure

Signed with `COOKIE_SECRET` env var using Jose (JWE or JWS):

```ts
interface SessionPayload {
  // Who
  type: 'admin' | 'token'

  // Admin path
  pb_token?: string // PocketBase JWT (admin only)
  user_id?: string // PB user id (admin only)

  // Token path
  token_id?: string // access_tokens.id
  scope_type?: ScopeType // project | lab_piece | all_projects | all_lab | all
  scope_ids?: string[] // [] means entire scope_type

  // Timing
  granted_at: number // unix timestamp
  expires_at: number // unix timestamp
}
```

---

## Gate Page States

The `/gate` page handles all entry states:

```
State 1 — Token entry
  URL: /gate?redirect=/work/demand-io
  UI: "Enter your access code" + input + submit
  On submit: POST /api/tokens/validate → set cookie → redirect

State 2 — Token already used (one_time)
  URL: /gate?error=used&redirect=/work/demand-io
  UI: "This link has already been used. Contact Pancho for a new one."
  CTA: mailto link

State 3 — Token expired (timed)
  URL: /gate?error=expired&redirect=/work/demand-io
  UI: "This access link has expired. Contact Pancho to extend it."
  CTA: mailto link

State 4 — Admin login
  URL: /admin (redirect to login if no admin session)
  UI: email + password form
  On submit: POST /api/auth/login

State 5 — No token required (should not have reached gate)
  Redirect back to /work or /lab
```

---

## Admin Panel — Token List View

Shows Fran everything he needs to manage access:

```
Token                    Label                    Type       Scope            Uses    Expires       Status
──────────────────────────────────────────────────────────────────────────────────────────────────────────────
t_x7k2mQpR9nLvW3hY     ACME Corp · demand-io    one_time   /work/demand-io  1/1     —             Used ✓
t_p3nRqL8mKwVj5hZ      Tech Interview · all     timed      All projects     8       May 12 2026   Active ●
t_d9fYsN2kBvGr7pQ      Design Review · biotrack  timed     /work/biotrack   0       May 08 2026   Pending ○
t_mW6jHcT4nXqKr1v      Recruiter · all lab      timed      All lab          3       Expired       Expired ✗
```

Actions per row: **Revoke**, **Extend** (timed), **Copy URL**, **View Logs**

---

## Environment Variables

```bash
# PocketBase
PB_URL=https://pb.panchoblanco.dev          # or localhost:8090
PB_ADMIN_EMAIL=me@panchoblanco.dev
PB_ADMIN_PASSWORD=...                        # service key operations
PB_SERVICE_TOKEN=...                         # generated in PB admin

# Session
COOKIE_SECRET=...                            # 32+ char random string
COOKIE_NAME=pb_session

# Vercel
EDGE_CONFIG=...                              # for feature flags
FLAGS_SECRET=...

# Anthropic (for AI chat)
ANTHROPIC_API_KEY=sk-ant-...
```

---

## PocketBase Hosting Note

```
# dokploy compose for pocketbase
services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    restart: unless-stopped
    volumes:
      - pb_data:/pb/pb_data
    ports:
      - "8090:8090"

volumes:
  pb_data:
```

```
panchoblanco.dev (Vercel)
  └── Nitro → fetch() → pb.panchoblanco.dev
                              └── Dokploy (your VPS)
                                    └── PocketBase container
                                          └── /pb_data volume (SQLite)
```
