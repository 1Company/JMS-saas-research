# 🛠️ MarketScout - Uitvoerbaar Bouwplan

**Versie:** 1.0  
**Datum:** 31 januari 2026  
**Doel:** Intern gebruik eerst, later SaaS  
**Email Provider:** SMTP2GO

---

## 📋 Project Setup

### Repository
```bash
# Nieuwe repo aanmaken
gh repo create 1Company/JMS-MarketScout --private
cd /root/clawd
git clone https://github.com/1Company/JMS-MarketScout.git
cd JMS-MarketScout
```

### Initiële Structuur
```
JMS-MarketScout/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/       # Protected routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   ├── research/      # Research module
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   └── new/
│   │   │   ├── leads/         # Leads module
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   └── search/
│   │   │   ├── campaigns/     # Campaigns module
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   └── new/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── research/
│   │   │   ├── leads/
│   │   │   ├── campaigns/
│   │   │   ├── scrape/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── research/
│   │   ├── leads/
│   │   ├── campaigns/
│   │   └── shared/
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── auth.ts            # NextAuth config
│   │   ├── ai.ts              # AI client (Claude/OpenAI)
│   │   ├── email.ts           # SMTP2GO client
│   │   ├── scraper/           # Browser automation
│   │   │   ├── browser.ts
│   │   │   ├── google.ts
│   │   │   ├── linkedin.ts
│   │   │   ├── website.ts
│   │   │   └── extractors.ts
│   │   ├── queue.ts           # BullMQ setup
│   │   └── utils.ts
│   ├── workers/               # Background jobs
│   │   ├── research.worker.ts
│   │   ├── scrape.worker.ts
│   │   ├── enrich.worker.ts
│   │   └── email.worker.ts
│   └── types/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── .env.example
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🗓️ Fase 1: Foundation (Week 1-2)

### Week 1, Dag 1-2: Project Setup

**Taken:**
- [ ] Repository aanmaken
- [ ] Next.js 14 project initialiseren
- [ ] Dependencies installeren
- [ ] Tailwind + shadcn/ui configureren
- [ ] Prisma setup met Neon
- [ ] Environment variables

**Commands:**
```bash
# Project init
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir

# Dependencies
npm install @prisma/client @auth/prisma-adapter next-auth
npm install @tanstack/react-query @tanstack/react-table
npm install zustand zod react-hook-form @hookform/resolvers
npm install lucide-react recharts framer-motion
npm install -D prisma

# shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog dropdown-menu form input label select table tabs toast

# Prisma
npx prisma init
```

**Bestanden:**

`.env.example`:
```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI
ANTHROPIC_API_KEY=""
OPENAI_API_KEY=""

# Email (SMTP2GO)
SMTP2GO_API_KEY=""
SMTP2GO_SENDER_EMAIL="noreply@marketscout.nl"
SMTP2GO_SENDER_NAME="MarketScout"

# Scraping
BRIGHTDATA_USERNAME=""
BRIGHTDATA_PASSWORD=""
BRIGHTDATA_HOST=""

# Redis (Upstash)
UPSTASH_REDIS_URL=""
UPSTASH_REDIS_TOKEN=""

# Storage (Cloudflare R2)
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET=""
R2_ENDPOINT=""
```

---

### Week 1, Dag 3-4: Database Schema

**`prisma/schema.prisma`:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============ AUTH ============

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  password      String?   // For email/password auth
  
  emailVerified DateTime?
  
  // Subscription
  plan          Plan      @default(FREE)
  credits       Int       @default(100)
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  projects      Project[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ============ CORE ============

model Project {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name        String
  description String?
  
  // Relations
  analyses    Analysis[]
  leads       Lead[]
  campaigns   Campaign[]
  competitors Competitor[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
}

// ============ RESEARCH ============

model Analysis {
  id          String       @id @default(cuid())
  projectId   String
  project     Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  name        String
  type        AnalysisType
  status      JobStatus    @default(PENDING)
  
  // Input
  query       String       @db.Text
  config      Json?
  
  // Output
  result      Json?
  summary     String?      @db.Text
  
  // Timing
  startedAt   DateTime?
  completedAt DateTime?
  error       String?
  
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  @@index([projectId])
  @@index([status])
}

model Competitor {
  id          String   @id @default(cuid())
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  name        String
  website     String
  description String?  @db.Text
  
  // Scraped data
  pricing     Json?
  features    Json?
  techStack   String[]
  
  // Reviews
  reviewScore Float?
  reviewCount Int?
  reviews     Json?
  
  // Tracking
  lastScraped DateTime?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([projectId, website])
  @@index([projectId])
}

// ============ LEADS ============

model Lead {
  id            String     @id @default(cuid())
  projectId     String
  project       Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  // Basic info
  companyName   String
  website       String?
  
  // Contact
  email         String?
  phone         String?
  address       String?
  city          String?
  country       String?    @default("NL")
  
  // Social
  linkedin      String?
  twitter       String?
  facebook      String?
  instagram     String?
  
  // Enrichment
  industry      String?
  employeeCount Int?
  revenue       String?
  technologies  String[]
  
  // Scoring
  score         Int        @default(0)
  scoreDetails  Json?
  
  // Status
  status        LeadStatus @default(NEW)
  notes         String?    @db.Text
  
  // Source
  source        String?    // google_maps, linkedin, manual, etc.
  sourceUrl     String?
  
  // Campaign tracking
  campaignLeads CampaignLead[]
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([projectId])
  @@index([status])
  @@index([score])
}

// ============ CAMPAIGNS ============

model Campaign {
  id          String         @id @default(cuid())
  projectId   String
  project     Project        @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  name        String
  type        CampaignType
  status      CampaignStatus @default(DRAFT)
  
  // Email config
  fromName    String?
  fromEmail   String?
  subject     String?
  content     String?        @db.Text
  
  // Sequence (for multi-step)
  sequence    Json?
  
  // Stats
  totalLeads  Int            @default(0)
  sent        Int            @default(0)
  delivered   Int            @default(0)
  opened      Int            @default(0)
  clicked     Int            @default(0)
  replied     Int            @default(0)
  bounced     Int            @default(0)
  
  // Timing
  scheduledAt DateTime?
  startedAt   DateTime?
  completedAt DateTime?
  
  // Relations
  leads       CampaignLead[]
  
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  
  @@index([projectId])
  @@index([status])
}

model CampaignLead {
  id          String        @id @default(cuid())
  campaignId  String
  campaign    Campaign      @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  leadId      String
  lead        Lead          @relation(fields: [leadId], references: [id], onDelete: Cascade)
  
  status      OutreachStatus @default(PENDING)
  
  // Personalization
  personalizedSubject String?
  personalizedContent String? @db.Text
  
  // Tracking
  sentAt      DateTime?
  deliveredAt DateTime?
  openedAt    DateTime?
  clickedAt   DateTime?
  repliedAt   DateTime?
  bouncedAt   DateTime?
  
  // Sequence tracking
  currentStep Int           @default(0)
  nextStepAt  DateTime?
  
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  @@unique([campaignId, leadId])
  @@index([campaignId])
  @@index([leadId])
  @@index([status])
}

// ============ JOBS ============

model Job {
  id          String    @id @default(cuid())
  type        String    // research, scrape, enrich, email
  status      JobStatus @default(PENDING)
  
  payload     Json
  result      Json?
  error       String?
  
  attempts    Int       @default(0)
  maxAttempts Int       @default(3)
  
  startedAt   DateTime?
  completedAt DateTime?
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([type, status])
}

// ============ ENUMS ============

enum Plan {
  FREE
  STARTER
  PRO
  ENTERPRISE
}

enum AnalysisType {
  MARKET
  COMPETITOR
  KEYWORD
  TREND
}

enum JobStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
}

enum LeadStatus {
  NEW
  CONTACTED
  INTERESTED
  QUALIFIED
  CONVERTED
  LOST
  DO_NOT_CONTACT
}

enum CampaignType {
  EMAIL_SINGLE
  EMAIL_SEQUENCE
  LINKEDIN
  MULTICHANNEL
}

enum CampaignStatus {
  DRAFT
  SCHEDULED
  RUNNING
  PAUSED
  COMPLETED
  CANCELLED
}

enum OutreachStatus {
  PENDING
  SCHEDULED
  SENT
  DELIVERED
  OPENED
  CLICKED
  REPLIED
  BOUNCED
  UNSUBSCRIBED
  FAILED
}
```

**Commands:**
```bash
npx prisma generate
npx prisma db push
```

---

### Week 1, Dag 5: Authentication

**`src/lib/auth.ts`:**
```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email en wachtwoord zijn verplicht");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Gebruiker niet gevonden");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Ongeldig wachtwoord");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};
```

---

### Week 2, Dag 1-2: Base UI Components

**`src/app/(dashboard)/layout.tsx`:**
```tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/shared/sidebar";
import { Header } from "@/components/shared/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

**`src/components/shared/sidebar.tsx`:**
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  Mail, 
  Settings,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Research", href: "/research", icon: Search },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: Mail },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl">MarketScout</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-700"
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </div>
  );
}
```

---

### Week 2, Dag 3-5: Dashboard & Stats

**`src/app/(dashboard)/page.tsx`:**
```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { ActiveCampaigns } from "@/components/dashboard/active-campaigns";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  const [analysisCount, leadCount, campaignStats] = await Promise.all([
    prisma.analysis.count({
      where: { project: { userId: session!.user.id } },
    }),
    prisma.lead.count({
      where: { project: { userId: session!.user.id } },
    }),
    prisma.campaign.aggregate({
      where: { project: { userId: session!.user.id } },
      _sum: { sent: true, opened: true },
    }),
  ]);

  const openRate = campaignStats._sum.sent 
    ? Math.round((campaignStats._sum.opened! / campaignStats._sum.sent) * 100)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welkom terug, {session?.user?.name?.split(' ')[0]}
        </p>
      </div>

      <StatsCards
        analyses={analysisCount}
        leads={leadCount}
        sent={campaignStats._sum.sent || 0}
        openRate={openRate}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentActivity userId={session!.user.id} />
        <ActiveCampaigns userId={session!.user.id} />
      </div>
    </div>
  );
}
```

---

## 🗓️ Fase 2: Research Engine (Week 3-4)

### Week 3, Dag 1-2: Scraper Foundation

**`src/lib/scraper/browser.ts`:**
```typescript
import { chromium, Browser, Page, BrowserContext } from "playwright";

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });
  }
  return browser;
}

export async function createContext(options?: {
  proxy?: { server: string; username: string; password: string };
}): Promise<BrowserContext> {
  const browser = await getBrowser();
  
  return browser.newContext({
    userAgent: getRandomUserAgent(),
    viewport: { width: 1920, height: 1080 },
    locale: 'nl-NL',
    timezoneId: 'Europe/Amsterdam',
    proxy: options?.proxy,
  });
}

export async function scrapePage<T>(
  url: string,
  extractor: (page: Page) => Promise<T>,
  options?: { timeout?: number; waitFor?: string }
): Promise<T> {
  const context = await createContext();
  const page = await context.newPage();
  
  try {
    await page.goto(url, { 
      timeout: options?.timeout || 30000,
      waitUntil: 'domcontentloaded',
    });
    
    if (options?.waitFor) {
      await page.waitForSelector(options.waitFor, { timeout: 10000 });
    }
    
    return await extractor(page);
  } finally {
    await context.close();
  }
}

function getRandomUserAgent(): string {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}
```

**`src/lib/scraper/google.ts`:**
```typescript
import { Page } from "playwright";
import { scrapePage } from "./browser";

export interface GoogleResult {
  title: string;
  url: string;
  snippet: string;
}

export async function searchGoogle(query: string, limit = 10): Promise<GoogleResult[]> {
  return scrapePage(
    `https://www.google.com/search?q=${encodeURIComponent(query)}&num=${limit}&hl=nl`,
    async (page: Page) => {
      await page.waitForSelector('#search', { timeout: 10000 });
      
      return page.$$eval('div.g', (elements) =>
        elements.map((el) => ({
          title: el.querySelector('h3')?.textContent || '',
          url: el.querySelector('a')?.href || '',
          snippet: el.querySelector('.VwiC3b')?.textContent || '',
        })).filter(r => r.url && r.title)
      );
    }
  );
}

export async function searchGoogleMaps(
  query: string, 
  location: string
): Promise<GoogleMapsResult[]> {
  const searchQuery = `${query} ${location}`;
  
  return scrapePage(
    `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`,
    async (page: Page) => {
      await page.waitForSelector('[role="feed"]', { timeout: 15000 });
      
      // Scroll to load more results
      for (let i = 0; i < 3; i++) {
        await page.evaluate(() => {
          const feed = document.querySelector('[role="feed"]');
          if (feed) feed.scrollTop = feed.scrollHeight;
        });
        await page.waitForTimeout(1000);
      }
      
      return page.$$eval('div[role="feed"] > div', (elements) =>
        elements.map((el) => {
          const link = el.querySelector('a[href^="https://www.google.com/maps/place"]');
          const name = el.querySelector('.fontHeadlineSmall')?.textContent;
          const rating = el.querySelector('.fontBodyMedium span[aria-label*="sterren"]')?.getAttribute('aria-label');
          const address = el.querySelector('.fontBodyMedium')?.textContent;
          
          return {
            name: name || '',
            url: link?.href || '',
            rating: rating ? parseFloat(rating) : null,
            address: address || '',
          };
        }).filter(r => r.name && r.url)
      );
    },
    { timeout: 60000 }
  );
}

interface GoogleMapsResult {
  name: string;
  url: string;
  rating: number | null;
  address: string;
}
```

---

### Week 3, Dag 3-4: Website Data Extraction

**`src/lib/scraper/website.ts`:**
```typescript
import { Page } from "playwright";
import { scrapePage } from "./browser";
import { extractWithAI } from "../ai";

export interface WebsiteData {
  title: string;
  description: string;
  emails: string[];
  phones: string[];
  address: string | null;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  technologies: string[];
}

export async function scrapeWebsite(url: string): Promise<WebsiteData> {
  return scrapePage(url, async (page: Page) => {
    const html = await page.content();
    const text = await page.evaluate(() => document.body.innerText);
    
    // Extract basic data
    const title = await page.title();
    const description = await page.$eval(
      'meta[name="description"]',
      (el) => el.getAttribute('content')
    ).catch(() => '');
    
    // Extract emails with regex
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = [...new Set(text.match(emailRegex) || [])];
    
    // Extract phones (Dutch format)
    const phoneRegex = /(?:\+31|0)[\s.-]?[1-9](?:[\s.-]?\d){8}/g;
    const phones = [...new Set(text.match(phoneRegex) || [])];
    
    // Extract social links
    const socialLinks = await page.evaluate(() => {
      const links: Record<string, string> = {};
      document.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') || '';
        if (href.includes('linkedin.com')) links.linkedin = href;
        if (href.includes('twitter.com') || href.includes('x.com')) links.twitter = href;
        if (href.includes('facebook.com')) links.facebook = href;
        if (href.includes('instagram.com')) links.instagram = href;
      });
      return links;
    });
    
    // Detect technologies
    const technologies = await detectTechnologies(page);
    
    // Use AI for address extraction if needed
    const address = await extractWithAI(text, 'address');
    
    return {
      title,
      description: description || '',
      emails: emails.filter(e => !e.includes('example') && !e.includes('test')),
      phones,
      address,
      socialLinks,
      technologies,
    };
  });
}

async function detectTechnologies(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const techs: string[] = [];
    
    // Check for common technologies
    if (document.querySelector('[data-reactroot], #__next')) techs.push('React');
    if ((window as any).__NUXT__) techs.push('Vue/Nuxt');
    if (document.querySelector('script[src*="shopify"]')) techs.push('Shopify');
    if (document.querySelector('script[src*="wordpress"]')) techs.push('WordPress');
    if (document.querySelector('script[src*="wix"]')) techs.push('Wix');
    if (document.querySelector('[data-salonized]')) techs.push('Salonized');
    if (document.querySelector('[data-fresha]')) techs.push('Fresha');
    
    return techs;
  });
}
```

---

### Week 3, Dag 5 - Week 4, Dag 2: AI Analysis

**`src/lib/ai.ts`:**
```typescript
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeMarket(data: {
  query: string;
  competitors: any[];
  trends?: any[];
}): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `Je bent een senior marktanalist. Analyseer de volgende markt.

ONDERZOEKSVRAAG:
${data.query}

GEVONDEN CONCURRENTEN:
${JSON.stringify(data.competitors, null, 2)}

${data.trends ? `TRENDS:\n${JSON.stringify(data.trends, null, 2)}` : ''}

TAKEN:
1. Geef een executive summary (3-4 zinnen)
2. Analyseer elke concurrent: sterke/zwakke punten
3. Identificeer gaten in de markt
4. Schat de opportunity score (1-10) met onderbouwing
5. Geef concrete aanbevelingen

FORMAT: Gestructureerd rapport met duidelijke headers.`,
      },
    ],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

export async function personalizeEmail(
  template: string,
  lead: { companyName: string; website?: string; industry?: string }
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "Je schrijft gepersonaliseerde sales emails in het Nederlands. Kort, vriendelijk, niet pushy.",
      },
      {
        role: "user",
        content: `Personaliseer deze email template voor ${lead.companyName}.
        
Website: ${lead.website || 'onbekend'}
Industrie: ${lead.industry || 'onbekend'}

TEMPLATE:
${template}

Vervang {{personalization}} met een relevante, specifieke opening zin gebaseerd op het bedrijf.`,
      },
    ],
    max_tokens: 500,
  });

  return response.choices[0].message.content || template;
}

export async function extractWithAI(
  text: string,
  extractType: 'address' | 'pricing' | 'features'
): Promise<any> {
  const prompts: Record<string, string> = {
    address: "Extraheer het adres uit deze tekst. Return alleen het adres of null als niet gevonden.",
    pricing: "Extraheer pricing informatie uit deze tekst. Return als JSON met plans en prijzen.",
    features: "Extraheer de belangrijkste product features uit deze tekst. Return als JSON array.",
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: prompts[extractType] },
      { role: "user", content: text.substring(0, 4000) },
    ],
    max_tokens: 500,
  });

  try {
    return JSON.parse(response.choices[0].message.content || 'null');
  } catch {
    return response.choices[0].message.content;
  }
}
```

---

### Week 4, Dag 3-5: Research UI

**`src/app/(dashboard)/research/new/page.tsx`:**
```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, Sparkles } from "lucide-react";

export default function NewResearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [market, setMarket] = useState("NL");
  const [depth, setDepth] = useState("standard");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    
    const response = await fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, market, depth }),
    });
    
    const { id } = await response.json();
    router.push(`/research/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Search className="w-8 h-8 text-primary" />
          Nieuwe Analyse
        </h1>
        <p className="text-gray-500 mt-2">
          Beschrijf je product of markt en laat AI het onderzoek doen.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Wat wil je onderzoeken?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Textarea
              placeholder="Bijv: Salon software voor kappers met Google Calendar sync in Nederland"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Wees specifiek over je product, doelgroep en regio
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Doelmarkt</label>
              <Select value={market} onValueChange={setMarket}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NL">🇳🇱 Nederland</SelectItem>
                  <SelectItem value="BE">🇧🇪 België</SelectItem>
                  <SelectItem value="DE">🇩🇪 Duitsland</SelectItem>
                  <SelectItem value="EU">🇪🇺 Europa</SelectItem>
                  <SelectItem value="US">🇺🇸 Verenigde Staten</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Diepte</label>
              <Select value={depth} onValueChange={setDepth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick scan (5 min)</SelectItem>
                  <SelectItem value="standard">Standaard (15 min)</SelectItem>
                  <SelectItem value="deep">Diepgaand (30 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!query || loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyse starten...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Start Analyse
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🗓️ Fase 3: Lead Generation (Week 5-6)

### Week 5: Lead Discovery & Scraping

**`src/app/api/leads/search/route.ts`:**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { searchGoogleMaps } from "@/lib/scraper/google";
import { scrapeWebsite } from "@/lib/scraper/website";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId, query, location, filters } = await req.json();

  // Search Google Maps
  const results = await searchGoogleMaps(query, location);

  // Enrich each result
  const leads = await Promise.all(
    results.slice(0, 20).map(async (result) => {
      try {
        // Get website from Google Maps listing
        const websiteData = result.url 
          ? await scrapeWebsite(result.url)
          : null;

        // Create lead
        const lead = await prisma.lead.create({
          data: {
            projectId,
            companyName: result.name,
            website: result.url,
            address: result.address,
            email: websiteData?.emails?.[0],
            phone: websiteData?.phones?.[0],
            linkedin: websiteData?.socialLinks?.linkedin,
            instagram: websiteData?.socialLinks?.instagram,
            technologies: websiteData?.technologies || [],
            source: "google_maps",
            sourceUrl: result.url,
          },
        });

        return lead;
      } catch (error) {
        console.error(`Failed to scrape ${result.name}:`, error);
        return null;
      }
    })
  );

  return NextResponse.json({
    leads: leads.filter(Boolean),
    total: results.length,
  });
}
```

### Week 6: Lead Scoring & Enrichment

**`src/lib/scoring.ts`:**
```typescript
import { Lead } from "@prisma/client";

interface ScoreResult {
  score: number;
  details: {
    category: string;
    points: number;
    reason: string;
  }[];
}

export function calculateLeadScore(lead: Lead): ScoreResult {
  const details: ScoreResult['details'] = [];
  let score = 50; // Base score

  // Contact info
  if (lead.email) {
    score += 20;
    details.push({ category: "contact", points: 20, reason: "Heeft email" });
  }
  if (lead.phone) {
    score += 10;
    details.push({ category: "contact", points: 10, reason: "Heeft telefoon" });
  }

  // Social presence
  if (lead.linkedin) {
    score += 10;
    details.push({ category: "social", points: 10, reason: "Heeft LinkedIn" });
  }
  if (lead.instagram) {
    score += 5;
    details.push({ category: "social", points: 5, reason: "Heeft Instagram" });
  }

  // Business signals
  if (lead.website) {
    score += 10;
    details.push({ category: "business", points: 10, reason: "Heeft website" });
  }
  if (lead.employeeCount && lead.employeeCount > 5) {
    score += 15;
    details.push({ category: "business", points: 15, reason: ">5 medewerkers" });
  }

  // Technology fit (example: looking for salons without modern software)
  if (lead.technologies?.length === 0 || !lead.technologies?.some(t => 
    ['Salonized', 'Fresha', 'SimplyBook'].includes(t)
  )) {
    score += 10;
    details.push({ category: "fit", points: 10, reason: "Geen moderne software gedetecteerd" });
  }

  return { 
    score: Math.min(100, Math.max(0, score)), 
    details 
  };
}
```

---

## 🗓️ Fase 4: Campaign Engine (Week 7-8)

### Week 7: Email Sending with SMTP2GO

**`src/lib/email.ts`:**
```typescript
interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  trackOpens?: boolean;
  trackClicks?: boolean;
  customHeaders?: Record<string, string>;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const { to, subject, html, text, replyTo, trackOpens = true, trackClicks = true } = params;

  try {
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.SMTP2GO_API_KEY!,
      },
      body: JSON.stringify({
        sender: `${process.env.SMTP2GO_SENDER_NAME} <${process.env.SMTP2GO_SENDER_EMAIL}>`,
        to: [to],
        subject,
        html_body: html,
        text_body: text || stripHtml(html),
        custom_headers: [
          ...(replyTo ? [{ header: "Reply-To", value: replyTo }] : []),
          { header: "X-Campaign-ID", value: params.customHeaders?.["X-Campaign-ID"] || "" },
        ],
        track_opens: trackOpens,
        track_clicks: trackClicks,
      }),
    });

    const data = await response.json();

    if (data.data?.succeeded) {
      return {
        success: true,
        messageId: data.data.email_id,
      };
    }

    return {
      success: false,
      error: data.data?.failures?.[0]?.error || "Unknown error",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function sendBulkEmails(
  emails: SendEmailParams[]
): Promise<SendEmailResult[]> {
  // SMTP2GO rate limit: 100 emails per batch
  const batches = chunk(emails, 100);
  const results: SendEmailResult[] = [];

  for (const batch of batches) {
    const batchResults = await Promise.all(
      batch.map(email => sendEmail(email))
    );
    results.push(...batchResults);
    
    // Respecteer rate limits
    if (batches.indexOf(batch) < batches.length - 1) {
      await sleep(1000);
    }
  }

  return results;
}

// SMTP2GO Webhook handler voor tracking
export async function handleSMTP2GOWebhook(event: {
  event: 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained';
  email: string;
  timestamp: string;
  email_id: string;
}) {
  const { prisma } = await import("@/lib/db");
  
  const statusMap = {
    delivered: 'DELIVERED',
    opened: 'OPENED',
    clicked: 'CLICKED',
    bounced: 'BOUNCED',
    complained: 'UNSUBSCRIBED',
  };

  await prisma.campaignLead.updateMany({
    where: {
      lead: { email: event.email },
      // Match by campaign using custom header
    },
    data: {
      status: statusMap[event.event] as any,
      [`${event.event}At`]: new Date(event.timestamp),
    },
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

**`src/app/api/webhooks/smtp2go/route.ts`:**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { handleSMTP2GOWebhook } from "@/lib/email";

export async function POST(req: NextRequest) {
  const event = await req.json();
  
  await handleSMTP2GOWebhook(event);
  
  return NextResponse.json({ received: true });
}
```

---

### Week 8: Campaign UI & Sequence Builder

**`src/app/(dashboard)/campaigns/new/page.tsx`:**
```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Sparkles, Eye } from "lucide-react";

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [campaign, setCampaign] = useState({
    name: "",
    subject: "",
    content: "",
    projectId: "",
  });

  const handleCreate = async () => {
    const response = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaign),
    });
    
    const { id } = await response.json();
    router.push(`/campaigns/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Nieuwe Campagne</h1>

      <Card>
        <CardHeader>
          <CardTitle>Email Campagne</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium">Campagne Naam</label>
            <Input
              placeholder="Bijv: Q1 Salon Outreach"
              value={campaign.name}
              onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Onderwerp</label>
            <Input
              placeholder="Bijv: Nooit meer dubbele boekingen"
              value={campaign.subject}
              onChange={(e) => setCampaign({ ...campaign, subject: e.target.value })}
            />
            <p className="text-sm text-gray-500 mt-1">
              Variabelen: {"{{companyName}}"}, {"{{firstName}}"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Email Content</label>
            <Tabs defaultValue="edit">
              <TabsList>
                <TabsTrigger value="edit">Bewerken</TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <Textarea
                  rows={12}
                  placeholder={`Hoi {{firstName}},

{{ai_personalization}}

[Je boodschap hier]

Groet,
Arnold`}
                  value={campaign.content}
                  onChange={(e) => setCampaign({ ...campaign, content: e.target.value })}
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="border rounded-lg p-6 bg-white min-h-[300px]">
                  <div dangerouslySetInnerHTML={{ 
                    __html: campaign.content
                      .replace(/{{companyName}}/g, '<span class="bg-yellow-100 px-1">Salon de Luxe</span>')
                      .replace(/{{firstName}}/g, '<span class="bg-yellow-100 px-1">Anna</span>')
                      .replace(/{{ai_personalization}}/g, '<span class="bg-blue-100 px-1 italic">Ik zag dat jullie prachtige balayage werk doen...</span>')
                      .replace(/\n/g, '<br>')
                  }} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-800">
              Gebruik {"{{ai_personalization}}"} voor een AI-gegenereerde opening zin per lead
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Annuleren
            </Button>
            <Button onClick={handleCreate}>
              <Mail className="w-4 h-4 mr-2" />
              Campagne Aanmaken
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🗓️ Fase 5: Polish & Launch (Week 9-10)

### Week 9: Testing & Bug Fixes

**Taken:**
- [ ] Unit tests voor scraping functions
- [ ] Integration tests voor API routes
- [ ] E2E tests voor critical flows
- [ ] Performance optimization
- [ ] Error handling verbeteren
- [ ] Loading states overal

### Week 10: Documentation & Deployment

**`README.md`:**
```markdown
# MarketScout

AI-powered marketing research platform.

## Setup

1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env.local`
4. Fill in environment variables
5. `npx prisma db push`
6. `npm run dev`

## Environment Variables

See `.env.example` for all required variables.

## Deployment

- Frontend: Vercel
- Database: Neon
- Browser workers: Railway/Fly.io

## Architecture

[Link to architecture diagram]
```

---

## 📊 Totaaloverzicht

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Setup | Project, DB, Auth |
| 2 | UI | Dashboard, Navigation, Components |
| 3 | Scraping | Google, Website extraction |
| 4 | AI | Analysis, Reports |
| 5 | Leads | Discovery, Scraping |
| 6 | Leads | Scoring, Enrichment |
| 7 | Email | SMTP2GO, Templates |
| 8 | Campaigns | UI, Sequences |
| 9 | Testing | Tests, Bugs, Polish |
| 10 | Launch | Docs, Deploy |

---

## 💰 Kosten Schatting (Maandelijks)

| Service | Plan | Kosten |
|---------|------|--------|
| Vercel | Pro | €20 |
| Neon | Launch | €19 |
| Upstash Redis | Pay-as-you-go | ~€5 |
| SMTP2GO | 1000 emails | €10 |
| Anthropic | Pay-as-you-go | ~€30 |
| OpenAI | Pay-as-you-go | ~€20 |
| BrightData (optioneel) | Pay-as-you-go | ~€50 |
| **Totaal** | | **~€150/maand** |

---

## ✅ Eerste Stappen (Vandaag)

1. [ ] Repo aanmaken: `JMS-MarketScout`
2. [ ] Project setup met Next.js
3. [ ] Prisma schema toevoegen
4. [ ] Eerste database push
5. [ ] Basic auth werkend

Klaar om te starten?
