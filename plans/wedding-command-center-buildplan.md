# Wedding Day Command Center - Bouwplan

**Versie:** 1.0  
**Datum:** 1 februari 2026  
**Target Launch:** Mei 2026 (voor bruiloftseizoen)  
**Testcase:** Arnold & partner - Kasteel Maurick, 12 juni 2026

---

## 🎯 Product Vision

### One-liner
Real-time coördinatie voor je bruiloftsdag - geen WhatsApp chaos, geen gemiste momenten.

### Kernprobleem
Bruiloftsplanning tools stoppen bij de planning. Op de dag zelf:
- WhatsApp groepen exploderen met "waar ben je?" en "wanneer begint X?"
- Vendors (fotograaf, DJ, catering) missen cues omdat niemand coördineert
- Bruidspaar is onbereikbaar → stress voor wedding party
- Gasten stellen 100x dezelfde vraag ("waar parkeren?")

### Oplossing
Eén command center waar IEDEREEN (bruidspaar, wedding party, vendors, gasten) real-time ziet wat er wanneer gebeurt.

---

## 👥 User Roles & Permissions

| Role | Kan zien | Kan doen |
|------|----------|----------|
| **Couple** (bruidspaar) | Alles | Alles bewerken, timeline aanpassen, vendors beheren |
| **Wedding Party** | Timeline, vendor contacts, emergency info | Check-in, notities toevoegen |
| **Vendor** | Hun eigen tijdslots, relevante timeline, locatie-info | Status updates, checklist afvinken |
| **Guest** | Publieke timeline, locaties, FAQ | RSVP, foto's uploaden (optioneel) |

---

## 🏗️ Technische Architectuur

### Tech Stack
```
Frontend:     Next.js 15 (App Router)
Backend:      Next.js API Routes + Server Actions
Database:     PostgreSQL (Neon - serverless)
Realtime:     PartyKit (Cloudflare)
Auth:         NextAuth.js v5 + magic link (Resend)
Push:         Web Push API
File Storage: Cloudflare R2
Hosting:      Vercel
Styling:      Tailwind CSS + shadcn/ui
ORM:          Drizzle ORM
State:        Zustand (client) + React Query
```

### Waarom deze stack
- **Neon:** Serverless Postgres, scale-to-zero, ~€0-5/mo vs Supabase €25/mo
- **PartyKit:** Cloudflare-based realtime, generous free tier, edge-native
- **NextAuth.js:** Gratis, magic link via Resend (3000 emails/mo gratis)
- **Cloudflare R2:** 10GB gratis, no egress fees
- **Drizzle:** Type-safe ORM, lightweight, great DX
- **Vercel:** Zero-config deployments, edge functions

### Kosten Breakdown
| Service | Free Tier | Geschatte kosten |
|---------|-----------|------------------|
| Neon | 0.5GB storage, 190 compute hrs | €0 (MVP) |
| PartyKit | 100k msg/dag | €0 |
| Resend | 3000 emails/mo | €0 |
| Cloudflare R2 | 10GB storage | €0 |
| Vercel | 100GB bandwidth | €0 |
| **Totaal MVP** | | **€0/mo** |

### Architectuur Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Guest Portal │  │ Couple App   │  │ Vendor Portal│      │
│  │ (SSR + PWA)  │  │ (Dashboard)  │  │ (Dashboard)  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │               │
│         └─────────────────┼─────────────────┘               │
│                           │                                  │
│                    ┌──────▼───────┐                         │
│                    │  API Routes  │                         │
│                    │ + Server Act │                         │
│                    │ + NextAuth   │                         │
│                    └──────┬───────┘                         │
└───────────────────────────┼─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│     NEON      │   │   PARTYKIT    │   │ CLOUDFLARE R2 │
│   Postgres    │   │   Realtime    │   │    Storage    │
│  (serverless) │   │  (WebSocket)  │   │   (photos)    │
└───────────────┘   └───────────────┘   └───────────────┘
        │
        ▼
┌───────────────┐
│    RESEND     │
│  (magic link) │
└───────────────┘
```

---

## 🗃️ Database Schema

### Core Tables

```sql
-- Events (de bruiloft zelf)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,  -- "arnold-sarah-2026"
  couple_names VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  venue_name VARCHAR(255),
  venue_address TEXT,
  venue_lat DECIMAL(10, 8),
  venue_lng DECIMAL(11, 8),
  cover_image_url TEXT,
  theme_color VARCHAR(7) DEFAULT '#D4A574',  -- hex color
  timezone VARCHAR(50) DEFAULT 'Europe/Amsterdam',
  plan_type VARCHAR(20) DEFAULT 'premium',  -- basic, premium, ultimate
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (bruidspaar, wedding party, vendors)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Members (wie heeft welke rol)
CREATE TABLE event_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,  -- couple, wedding_party, vendor, guest
  role_label VARCHAR(100),    -- "Best Man", "Fotograaf", "Moeder bruid"
  can_edit_timeline BOOLEAN DEFAULT FALSE,
  invite_token VARCHAR(64) UNIQUE,
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ,
  UNIQUE(event_id, user_id)
);

-- Timeline Items (het hart van de app)
CREATE TABLE timeline_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location VARCHAR(255),       -- "Kapel", "Tuin", "Grote Zaal"
  location_notes TEXT,         -- "Ingang via zijdeur"
  icon VARCHAR(50),            -- emoji of icon name
  visibility VARCHAR(20) DEFAULT 'all',  -- all, wedding_party, vendors, couple_only
  is_milestone BOOLEAN DEFAULT FALSE,    -- grote momenten (ceremonie, diner)
  assigned_vendors UUID[],     -- array van user_ids
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, active, completed, delayed
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendors (extra info voor leveranciers)
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  category VARCHAR(50),  -- photographer, dj, catering, florist, etc
  phone VARCHAR(20),
  email VARCHAR(255),
  contact_person VARCHAR(255),
  arrival_time TIMESTAMPTZ,
  departure_time TIMESTAMPTZ,
  setup_notes TEXT,
  special_requirements TEXT,
  contract_url TEXT,
  UNIQUE(user_id, event_id)
);

-- Guest Info (voor gasten portaal)
CREATE TABLE event_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  section VARCHAR(50) NOT NULL,  -- parking, dresscode, gifts, accommodation
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  icon VARCHAR(50),
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Push Subscriptions
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  endpoint TEXT NOT NULL,
  keys_p256dh TEXT NOT NULL,
  keys_auth TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(endpoint)
);

-- Notifications Log
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  timeline_item_id UUID REFERENCES timeline_items(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  target_roles VARCHAR(20)[],  -- ['all'], ['wedding_party', 'vendors']
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Photo Uploads (voor Ultimate plan)
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  file_path TEXT NOT NULL,
  thumbnail_path TEXT,
  caption TEXT,
  taken_at TIMESTAMPTZ,
  is_approved BOOLEAN DEFAULT TRUE,  -- couple kan moderaten
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Emergency Contacts
CREATE TABLE emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),  -- "Day-of Coordinator", "Vader bruid"
  phone VARCHAR(20) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Realtime met PartyKit
```typescript
// partykit/timeline.ts - Server
import type { PartyKitServer } from "partykit/server";

export default {
  onConnect(conn, room) {
    // Room ID = event slug
    conn.send(JSON.stringify({ type: "connected", eventId: room.id }));
  },
  
  onMessage(message, conn, room) {
    const data = JSON.parse(message);
    if (data.type === "timeline_update") {
      // Broadcast to all connections in this room
      room.broadcast(message);
    }
  },
} satisfies PartyKitServer;

// Client-side
import PartySocket from "partysocket";

const socket = new PartySocket({
  host: "wedding-realtime.username.partykit.dev",
  room: eventSlug,  // "arnold-sarah-2026"
});

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "timeline_update") {
    updateTimeline(data.payload);
  }
};
```

### Drizzle ORM Schema
```typescript
// src/db/schema.ts
import { pgTable, uuid, varchar, text, timestamp, boolean, integer, decimal } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 50 }).unique().notNull(),
  coupleNames: varchar("couple_names", { length: 255 }).notNull(),
  eventDate: timestamp("event_date").notNull(),
  venueName: varchar("venue_name", { length: 255 }),
  venueAddress: text("venue_address"),
  coverImageUrl: text("cover_image_url"),
  themeColor: varchar("theme_color", { length: 7 }).default("#D4A574"),
  timezone: varchar("timezone", { length: 50 }).default("Europe/Amsterdam"),
  planType: varchar("plan_type", { length: 20 }).default("premium"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const timelineItems = pgTable("timeline_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id").references(() => events.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  location: varchar("location", { length: 255 }),
  visibility: varchar("visibility", { length: 20 }).default("all"),
  isMilestone: boolean("is_milestone").default(false),
  status: varchar("status", { length: 20 }).default("scheduled"),
  sortOrder: integer("sort_order"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

---

## 📱 User Flows

### Flow 1: Event Aanmaken (Couple)

```
[Landing Page]
     │
     ▼
[Sign Up/Login] ─── Magic Link email
     │
     ▼
[Event Wizard]
  ├── Stap 1: Basisinfo (namen, datum, venue)
  ├── Stap 2: Timeline template kiezen (klassiek, modern, casual)
  ├── Stap 3: Vendors toevoegen (naam, email, categorie)
  ├── Stap 4: Guest info invullen (parkeren, dresscode)
  └── Stap 5: Preview & betalen
     │
     ▼
[Dashboard] ─── Manage timeline, vendors, guests
```

### Flow 2: Vendor Onboarding

```
[Email Invite] ─── "Je bent uitgenodigd als fotograaf voor Arnold & Sarah"
     │
     ▼
[Accept Invite] ─── Vul contactgegevens in
     │
     ▼
[Vendor Portal]
  ├── Jouw tijdslots zien
  ├── Volledige timeline (relevante delen)
  ├── Locatie & parkeerinfo
  ├── Andere vendor contacts
  └── Notificatie voorkeuren
```

### Flow 3: Guest Experience

```
[QR Code / Link] ─── Op uitnodiging of via WhatsApp
     │
     ▼
[Guest Portal] (geen login nodig)
  ├── Timeline van de dag
  ├── Locatie met Google Maps
  ├── Parkeer instructies
  ├── Dresscode info
  ├── Cadeau suggesties
  └── [Ultimate] Upload foto's
     │
     ▼
[Push Notificaties] ─── "Ceremonie begint over 15 min"
```

### Flow 4: Day-of Usage

```
                  ┌─────────────────────────┐
                  │     WEDDING DAY         │
                  └───────────┬─────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
[Couple App]          [Vendor Portal]        [Guest Portal]
  │                        │                      │
  ├─ Timeline aanpassen    ├─ Check-in            ├─ Zie updates
  │  (delay, reorder)      │  "Ik ben er"         │
  │                        │                      │
  ├─ Push versturen        ├─ Status update       ├─ Notificaties
  │  "Naar de tuin!"       │  "Setup klaar"       │  ontvangen
  │                        │                      │
  ├─ Emergency bellen      ├─ Timeline volgen     ├─ Foto's uploaden
  │                        │                      │
  └─ Live status zien ◄────┴──────────────────────┘
       (wie is waar, wat is de status)
```

---

## 🚀 MVP Features (Fase 1)

**Doel:** Werkende versie voor Arnold's bruiloft  
**Deadline:** 15 mei 2026  
**Bouwtijd:** 6-8 weken

### Must-Have
1. **Event Creation**
   - Wizard met basis info
   - Template timelines (3 opties)
   - Custom theming (kleur, cover foto)

2. **Timeline Management**
   - CRUD voor timeline items
   - Drag & drop reordering
   - Visibility per rol
   - Real-time sync

3. **Role Management**
   - Invite wedding party via email/link
   - Invite vendors met specifieke rol
   - Guest access via publieke link

4. **Guest Portal**
   - Responsive web (geen app download)
   - Timeline view
   - Locatie met maps embed
   - Info sectie (parkeren, dresscode, etc.)

5. **Vendor Portal**
   - Eigen tijdslots zien
   - Contact info andere vendors
   - Check-in functie

6. **Push Notifications**
   - Web Push setup
   - Scheduled notifications
   - Ad-hoc push door couple

### Nice-to-Have (MVP)
- SMS fallback voor oudere gasten
- Offline support (PWA)
- Dark mode

---

## 📈 Fase 2 Features (Post-MVP)

**Timeline:** Na lancering Arnold's bruiloft

### Premium Features
1. **Photo Drop** (EventShare integratie)
   - Gasten uploaden naar centrale gallery
   - Auto-approval of moderatie
   - Slideshow mode voor TV

2. **Guest Messaging**
   - Broadcast naar alle gasten
   - Segment berichten (alleen ceremonie-gasten)

3. **Vendor Coordination Pro**
   - Gedeelde checklists
   - File sharing (contracts, mood boards)
   - Timeline conflicts detectie

4. **Analytics**
   - Hoeveel gasten checken timeline
   - Notificatie engagement
   - Populaire info secties

### Fase 3: Scale
1. **Wedding Planner White-Label**
2. **Venue Partnerships**
3. **Template Marketplace**
4. **Multi-language**

---

## 📁 Project Structuur

```
wedding-command-center/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (couple)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── timeline/
│   │   │   ├── vendors/
│   │   │   ├── guests/
│   │   │   └── settings/
│   │   ├── (vendor)/
│   │   │   └── v/[eventSlug]/
│   │   │       ├── page.tsx
│   │   │       └── checkin/
│   │   ├── (guest)/
│   │   │   └── [eventSlug]/
│   │   │       ├── page.tsx          # Guest portal home
│   │   │       ├── timeline/
│   │   │       ├── info/
│   │   │       └── photos/
│   │   ├── api/
│   │   │   ├── events/
│   │   │   ├── timeline/
│   │   │   ├── push/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   └── page.tsx                   # Landing page
│   ├── components/
│   │   ├── ui/                        # shadcn components
│   │   ├── timeline/
│   │   │   ├── TimelineView.tsx
│   │   │   ├── TimelineItem.tsx
│   │   │   └── TimelineEditor.tsx
│   │   ├── guest/
│   │   ├── vendor/
│   │   └── shared/
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── config.ts          # NextAuth config
│   │   │   └── permissions.ts     # Authorization helpers
│   │   ├── partykit/
│   │   │   └── client.ts          # PartySocket wrapper
│   │   ├── r2/
│   │   │   └── upload.ts          # R2 upload helpers
│   │   ├── push/
│   │   ├── utils/
│   │   └── validations/
│   ├── hooks/
│   │   ├── useTimeline.ts
│   │   ├── useRealtimeSync.ts
│   │   └── usePushNotifications.ts
│   ├── stores/
│   │   └── timelineStore.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── sw.js                          # Service worker
│   └── manifest.json                  # PWA manifest
├── src/db/
│   ├── schema.ts              # Drizzle schema
│   ├── index.ts               # DB client
│   └── migrations/
├── partykit/
│   └── timeline.ts            # Realtime server
└── tests/
```

---

## 🎨 UI/UX Richtlijnen

### Design Principles
1. **Mobile-first:** 70% van gasten gebruikt telefoon
2. **Glanceable:** Belangrijke info in 2 seconden zichtbaar
3. **Calm design:** Niet schreeuwerig, past bij bruiloft
4. **Accessible:** Oma moet het ook kunnen gebruiken

### Color System
```css
:root {
  /* Couple kan primary aanpassen */
  --primary: #D4A574;         /* Warm gold (default) */
  --primary-foreground: #FFF;
  
  /* Vast */
  --background: #FDFCFB;
  --foreground: #1A1A1A;
  --muted: #F5F3F0;
  --accent: #E8DFD5;
  
  /* Status kleuren */
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
}
```

### Typography
```css
--font-display: 'Cormorant Garamond', serif;  /* Headings */
--font-body: 'Inter', sans-serif;              /* Body text */
```

### Timeline Item States
| Status | Visual |
|--------|--------|
| Scheduled | Default, grijs accent |
| Active | Glow effect, primary color |
| Completed | Checkmark, muted |
| Delayed | Warning badge, oranje accent |

---

## 🔐 Security & Privacy

### Data Protection
- Foto's: Private Supabase bucket, signed URLs
- Guest portal: Geen login, maar obscure slug
- Vendor portal: Magic link auth
- GDPR: Auto-delete event data na 90 dagen

### Authorization (API Layer)
```typescript
// src/lib/auth/permissions.ts
import { db } from "@/db";
import { eventMembers } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function canViewEvent(userId: string, eventId: string) {
  const member = await db.query.eventMembers.findFirst({
    where: and(
      eq(eventMembers.userId, userId),
      eq(eventMembers.eventId, eventId)
    ),
  });
  return !!member;
}

export async function canEditTimeline(userId: string, eventId: string) {
  const member = await db.query.eventMembers.findFirst({
    where: and(
      eq(eventMembers.userId, userId),
      eq(eventMembers.eventId, eventId),
      eq(eventMembers.role, "couple")
    ),
  });
  return !!member;
}

// Usage in API route
export async function GET(req: Request, { params }: { params: { eventId: string } }) {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();
  
  if (!await canViewEvent(session.user.id, params.eventId)) {
    return forbidden();
  }
  
  const timeline = await db.query.timelineItems.findMany({
    where: eq(timelineItems.eventId, params.eventId),
    orderBy: timelineItems.sortOrder,
  });
  
  return Response.json(timeline);
}
```

---

## 💰 Pricing Implementation

### Plan Features Matrix
```typescript
const PLAN_FEATURES = {
  basic: {
    price: 29,
    timeline: true,
    guestPortal: true,
    vendors: 5,
    pushNotifications: false,
    photos: false,
    messaging: false,
  },
  premium: {
    price: 49,
    timeline: true,
    guestPortal: true,
    vendors: 15,
    pushNotifications: true,
    photos: false,
    messaging: false,
  },
  ultimate: {
    price: 79,
    timeline: true,
    guestPortal: true,
    vendors: -1, // unlimited
    pushNotifications: true,
    photos: true,  // EventShare integration
    messaging: true,
  },
};
```

### Payment
- Stripe Checkout (one-time)
- Geen recurring (per-event model)
- Webhook → activate plan features

---

## 📅 Development Timeline

### Week 1-2: Foundation
- [ ] Project setup (Next.js, Supabase, Tailwind)
- [ ] Database schema & migrations
- [ ] Auth flow (magic link)
- [ ] Basic couple dashboard

### Week 3-4: Timeline Core
- [ ] Timeline CRUD
- [ ] Drag & drop editor
- [ ] Realtime sync
- [ ] Role-based visibility

### Week 5-6: Portals
- [ ] Guest portal (public)
- [ ] Vendor portal
- [ ] Invite system
- [ ] Info sections

### Week 7-8: Notifications & Polish
- [ ] Web Push setup
- [ ] Scheduled notifications
- [ ] PWA manifest
- [ ] Testing & bugfixes

### Week 9-10: Launch Prep
- [ ] Arnold's bruiloft als beta test
- [ ] Landing page
- [ ] Stripe integration
- [ ] Documentation

---

## 🧪 Testing Strategy

### Manual Testing
- [ ] Couple flow: aanmaken → vendors toevoegen → dag simuleren
- [ ] Guest flow: link openen → timeline zien → notificatie ontvangen
- [ ] Vendor flow: invite accepteren → check-in doen
- [ ] Real-time: 2 browsers open, changes syncen

### Arnold's Bruiloft als Beta
- **Datum:** 12 juni 2026
- **Gasten:** ~80 (schatting)
- **Vendors:** Fotograaf, DJ, catering, bloemen, etc.
- **Locatie:** Kasteel Maurick, Vught

**Test scenarios:**
1. Push notificatie "Ceremonie begint over 15 min" → komt aan bij gasten?
2. Timeline delay door bruidspaar → synct real-time?
3. Vendor check-in → zichtbaar in dashboard?
4. 80 users tegelijk → performance OK?

---

## 🚨 Risico's & Mitigaties

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| Bug op de trouwdag | 😱 | Uitgebreide testing, fallback naar WhatsApp groep |
| Push werkt niet op alle devices | Medium | SMS fallback, test op vele devices |
| Supabase rate limits | Medium | Caching, connection pooling |
| Gasten downloaden geen PWA | Laag | Werkt ook als gewone website |
| Seasonal revenue | Business | Upsell photo packages, venue partnerships |

---

## 📊 Success Metrics

### MVP Launch
- [ ] 1 succesvolle bruiloft (Arnold's)
- [ ] < 5 critical bugs on day-of
- [ ] > 50% gasten bekijkt timeline
- [ ] > 30% gasten ontvangt push

### 6 Maanden Post-Launch
- [ ] 50 events
- [ ] €2.500 revenue
- [ ] < 5% refund rate
- [ ] 4.5+ sterren reviews

---

## 📝 Volgende Stappen

1. **Vandaag:**
   - [ ] GitHub repo aanmaken (JMS-wedding-command-center)
   - [ ] Project setup met boilerplate

2. **Deze week:**
   - [ ] Database schema implementeren
   - [ ] Basic auth flow
   - [ ] First timeline CRUD

3. **Volgende week:**
   - [ ] Guest portal prototype
   - [ ] Arnold's bruiloft details invoeren als test data

---

*Dit document is living - update het terwijl je bouwt!*
