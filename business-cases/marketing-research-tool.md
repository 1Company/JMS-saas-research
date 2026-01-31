# 🔍 MarketScout - AI-Powered Marketing Research Platform

**Datum:** 31 januari 2026  
**Auteur:** James (Opus 4.5)  
**Status:** Plan ter beoordeling

---

## 📋 Executive Summary

**MarketScout** is een AI-gestuurde marketing research tool die het hele proces automatiseert: van marktanalyse tot lead generatie tot campagne uitvoering. Met een moderne, intuïtieve UI en krachtige browser automation kunnen marketeers en ondernemers in uren doen wat normaal weken kost.

### Core Value Proposition
> "Van idee tot leads in één platform. AI doet het research, jij neemt de beslissingen."

---

## 🎯 Probleemstelling

### Huidige Situatie
Marketeers en ondernemers besteden enorm veel tijd aan:
1. **Marktonderzoek** - Handmatig googelen, websites bezoeken, data kopiëren
2. **Concurrentieanalyse** - Prijzen vergelijken, features in kaart brengen
3. **Lead generatie** - LinkedIn scrapen, email adressen zoeken, lijsten opbouwen
4. **Campagne setup** - Elke keer opnieuw templates maken, A/B tests opzetten

### Pijnpunten
- **Tijdrovend:** 10-20 uur per marktonderzoek
- **Inconsistent:** Geen gestandaardiseerde methode
- **Versnipperd:** Data in 10+ tools/spreadsheets
- **Duur:** Aparte tools voor elke stap (€50-500/maand elk)

### Doelgroep
1. **Primair:** Solo-ondernemers en kleine teams (1-10 personen)
2. **Secundair:** Marketing agencies
3. **Tertiair:** Product managers bij startups

---

## 🚀 Product Visie

### Kernmodules

```
┌─────────────────────────────────────────────────────────────────┐
│                        MARKETSCOUT                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   RESEARCH   │  │    LEADS     │  │  CAMPAIGNS   │          │
│  │              │  │              │  │              │          │
│  │ • Markt      │  │ • Prospect   │  │ • Email      │          │
│  │ • Concurrent │  │ • Enrichment │  │ • LinkedIn   │          │
│  │ • Trends     │  │ • Scoring    │  │ • Outreach   │          │
│  │ • Keywords   │  │ • Export     │  │ • A/B Tests  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│           │                │                │                   │
│           └────────────────┴────────────────┘                   │
│                           │                                      │
│                    ┌──────────────┐                              │
│                    │  AI ENGINE   │                              │
│                    │              │                              │
│                    │ Claude/GPT-4 │                              │
│                    │ Embeddings   │                              │
│                    │ Analysis     │                              │
│                    └──────────────┘                              │
│                           │                                      │
│                    ┌──────────────┐                              │
│                    │   BROWSER    │                              │
│                    │  AUTOMATION  │                              │
│                    │              │                              │
│                    │ Playwright   │                              │
│                    │ Scraping     │                              │
│                    │ Screenshots  │                              │
│                    └──────────────┘                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔬 Module 1: Research Engine

### 1.1 Marktanalyse
**Doel:** Automatisch een markt in kaart brengen

**Workflow:**
```
Input: "Ik wil een salon software bouwen voor kappers in Nederland"
           ↓
    [AI Analyse Prompt]
           ↓
    [Browser: Zoek concurrenten]
           ↓
    [Browser: Bezoek elk, extract data]
           ↓
    [AI: Synthetiseer bevindingen]
           ↓
Output: Gestructureerd marktrapport
```

**Features:**
- **Smart Search:** AI formuleert zoektermen op basis van input
- **Auto-Discovery:** Vindt concurrenten via Google, ProductHunt, G2, Capterra
- **Deep Scrape:** Haalt pricing, features, reviews automatisch op
- **Trend Detection:** Analyseert Google Trends, social mentions

**UI/UX:**
```
┌─────────────────────────────────────────────────────────────────┐
│  🔍 Nieuwe Marktanalyse                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Beschrijf je product of markt:                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Salon software voor kappers met Google Calendar sync    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Doelmarkt:  🇳🇱 Nederland  ▼                                   │
│                                                                  │
│  Diepte:  ○ Quick scan (5 min)                                  │
│           ● Standaard (15 min)                                   │
│           ○ Diepgaand (30 min)                                   │
│                                                                  │
│  [🚀 Start Analyse]                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Marktrapport: Salon Software NL                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Samenvatting (AI-generated)                                    │
│  ────────────────────────────────────────────────────────────   │
│  De Nederlandse salon software markt wordt gedomineerd door     │
│  Salonized (15K+ gebruikers) en Fresha. Key differentiator:     │
│  geen enkele speler biedt real-time twee-weg calendar sync.     │
│                                                                  │
│  Concurrenten                                                    │
│  ┌────────────┬──────────┬───────────┬─────────┬───────────┐   │
│  │ Naam       │ Pricing  │ Users     │ Rating  │ Gap       │   │
│  ├────────────┼──────────┼───────────┼─────────┼───────────┤   │
│  │ Salonized  │ €21-59   │ 15K+      │ 4.2/5   │ Calendar  │   │
│  │ Fresha     │ €20-75   │ 120K+     │ 4.8/5   │ Branding  │   │
│  │ SimplyBook │ €10-60   │ 10K+      │ 4.6/5   │ UX        │   │
│  └────────────┴──────────┴───────────┴─────────┴───────────┘   │
│                                                                  │
│  📈 Trends                        🎯 Opportunity Score          │
│  • +23% "salon boeken online"     ████████░░ 7.5/10            │
│  • -5% "kapper software"                                        │
│                                                                  │
│  [📥 Export PDF]  [📊 Spreadsheet]  [🔄 Verdiepen]              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Concurrentie Monitoring
**Doel:** Continu concurrenten volgen

**Features:**
- **Price Tracking:** Alert bij prijswijzigingen
- **Feature Tracking:** Detecteer nieuwe features op websites
- **Review Monitoring:** Track sentiment op G2, Capterra, Trustpilot
- **Social Listening:** Mentions op LinkedIn, Twitter, Reddit

**Automation:**
```javascript
// Voorbeeld: Dagelijkse price check
schedule: "0 8 * * *"
action: {
  visit: competitor.pricingPage,
  extract: pricing,
  compare: previousPricing,
  if: changed → notify(user)
}
```

### 1.3 Keyword Research
**Doel:** SEO/SEM keywords vinden

**Features:**
- **Seed Expansion:** Van 1 keyword naar 100+ variaties
- **Intent Classification:** Informational vs Commercial vs Transactional
- **Difficulty Score:** Gebaseerd op SERP analyse
- **Content Gaps:** Wat ranken concurrenten wel, jij niet?

---

## 👥 Module 2: Lead Generation

### 2.1 Prospect Discovery
**Doel:** Potentiële klanten vinden

**Bronnen:**
| Bron | Type Data | Methode |
|------|-----------|---------|
| LinkedIn | Bedrijven, personen | API + scraping |
| Google Maps | Lokale bedrijven | Places API |
| KvK/Chamber | Bedrijfsinfo | API |
| Websites | Contact info | Scraping |
| Social Media | Profielen | API |

**Workflow:**
```
Input: "Kappers in Amsterdam met 3+ medewerkers"
           ↓
    [Google Maps: zoek "kapper Amsterdam"]
           ↓
    [Voor elk resultaat: scrape website]
           ↓
    [Extract: email, telefoon, social links]
           ↓
    [Enrich: LinkedIn, reviews, bedrijfsinfo]
           ↓
    [Score: fit met ICP]
           ↓
Output: Gescoorde lead lijst
```

**UI/UX:**
```
┌─────────────────────────────────────────────────────────────────┐
│  👥 Leads Zoeken                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Zoek naar:                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ kappers salon                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Locatie: Amsterdam          Radius: 25 km                      │
│                                                                  │
│  Filters:                                                        │
│  ☑ Heeft website              ☑ Heeft email op website          │
│  ☐ Heeft social media         ☐ Reviews > 4.0                   │
│  ☐ >3 medewerkers                                               │
│                                                                  │
│  [🔍 Zoek Leads]                                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  📋 Gevonden: 127 leads                        [Export ▼]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ☑ │ 🏢 Salon de Luxe              │ ⭐⭐⭐⭐⭐ │ Score: 92  │   │
│    │ 📍 Amsterdam-Zuid             │ 4.8/5    │             │   │
│    │ 📧 info@salondeluxe.nl        │ 127 rev  │             │   │
│    │ 📞 020-1234567                │          │             │   │
│  ──┼───────────────────────────────┼──────────┼─────────────│   │
│  ☑ │ 🏢 Kapsalon Nieuw             │ ⭐⭐⭐⭐  │ Score: 85  │   │
│    │ 📍 Amsterdam-Oost             │ 4.2/5    │             │   │
│    │ 📧 contact@kapsalonnieuw.nl   │ 89 rev   │             │   │
│  ──┼───────────────────────────────┼──────────┼─────────────│   │
│  ☐ │ 🏢 Hair by Demi               │ ⭐⭐⭐⭐⭐ │ Score: 78  │   │
│    │ 📍 Amsterdam-West             │ 4.9/5    │             │   │
│                                                                  │
│  Geselecteerd: 2                    [➕ Aan campagne toevoegen] │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Enrichment
**Doel:** Leads verrijken met extra informatie

**Enrichment Sources:**
| Datapunt | Bron | Methode |
|----------|------|---------|
| Bedrijfsgrootte | LinkedIn, KvK | API |
| Technologie stack | BuiltWith, Wappalyzer | API |
| Social profielen | Direct scrape | Browser |
| Beslissers | LinkedIn | API |
| Huidige software | Website analyse | AI |

**AI-Powered Insights:**
```
Voor lead "Salon de Luxe":
- Gebruikt momenteel: Salonized (detectie via booking widget)
- Team grootte: ~5 (LinkedIn analyse)
- Receptief voor switch: HOOG (recente negatieve Salonized review)
- Beste contactpersoon: Anna de Vries (Owner)
- Beste tijdstip: Dinsdag ochtend (historische open rates)
```

### 2.3 Lead Scoring
**Doel:** Prioriteer beste leads

**Scoring Model:**
```
Base Score = 50

+ 20 als: Heeft email op website
+ 15 als: Actief op social media
+ 10 als: >10 reviews
+ 10 als: Review score > 4.0
+ 15 als: Fit met ICP (AI bepaald)
- 10 als: Geen telefoon
- 15 als: Gebruikt al concurrent
- 20 als: Recent negatieve review over niche

Final Score = Base + Modifiers (0-100)
```

---

## 📨 Module 3: Campaign Engine

### 3.1 Email Campaigns
**Doel:** Geautomatiseerde outreach

**Features:**
- **Template Builder:** Drag & drop met personalisatie
- **Sequence Builder:** Multi-step follow-up flows
- **AI Personalization:** Unieke eerste zin per lead op basis van hun website
- **Send Optimization:** Beste tijdstip per ontvanger
- **A/B Testing:** Subject lines, content, timing

**Sequence Builder UI:**
```
┌─────────────────────────────────────────────────────────────────┐
│  📧 Campagne: Salon Software Launch                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐   │
│  │ Email 1 │────▶│ Wacht   │────▶│ Email 2 │────▶│ Email 3 │   │
│  │ Intro   │     │ 3 dagen │     │ Value   │     │ CTA     │   │
│  └─────────┘     └─────────┘     └─────────┘     └─────────┘   │
│       │                               │                         │
│       ▼                               ▼                         │
│  [Opened?]                       [Clicked?]                     │
│   ├─ Ja → Prioriteit hoog         ├─ Ja → Stuur demo link      │
│   └─ Nee → Extra follow-up        └─ Nee → Soft reminder       │
│                                                                  │
│  📊 Stats                                                        │
│  ────────                                                        │
│  Verzonden: 127  │  Geopend: 43 (34%)  │  Geklikt: 12 (9%)     │
│  Replied: 5 (4%) │  Bounced: 2 (2%)    │  Unsub: 0             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**AI Personalization:**
```
Template:
"Hoi {{firstName}}, ik zag dat {{companyName}} {{ai_personalization}}..."

AI generates per lead:
- "...prachtige balayage werk doet op jullie Instagram"
- "...al 15 jaar actief is in Amsterdam-Zuid"  
- "...recent 5 sterren reviews krijgt voor jullie service"
```

### 3.2 LinkedIn Outreach
**Doel:** Semi-geautomatiseerde LinkedIn campagnes

**Features:**
- **Profile Visiting:** Automated profile views (binnen limits)
- **Connection Requests:** Met gepersonaliseerde notitie
- **Message Sequences:** Follow-up na connectie
- **InMail Templates:** Voor Sales Navigator users

**Compliance:**
- Respecteert LinkedIn rate limits
- Geen volledige automation (semi-automated)
- User moet acties bevestigen
- Opt-out na eerste reply

### 3.3 Multi-Channel Orchestration
**Doel:** Coördineer across channels

**Voorbeeld Flow:**
```
Dag 1: LinkedIn profile visit
Dag 2: Connection request
Dag 3: (wacht op accept)
Dag 4: LinkedIn message (intro)
Dag 5: Email (value proposition)
Dag 7: Email follow-up
Dag 10: LinkedIn message (case study)
Dag 14: Final email (FOMO)
```

---

## 🤖 AI Engine

### Modellen & Use Cases

| Use Case | Model | Waarom |
|----------|-------|--------|
| Marktanalyse rapport | Claude 3.5 Sonnet | Lange context, nuance |
| Email personalisatie | GPT-4 Turbo | Snelheid, creativiteit |
| Lead scoring | Fine-tuned embeddings | Consistentie |
| Website analyse | Claude 3 Haiku | Cost-effective |
| Chatbot | GPT-4 | Conversational |

### Prompt Engineering

**Marktanalyse Prompt (voorbeeld):**
```
Je bent een senior marktanalist. Analyseer de volgende markt:

CONTEXT:
- Product: {{productDescription}}
- Doelmarkt: {{targetMarket}}
- Verzamelde data: {{scrapedData}}

TAKEN:
1. Identificeer top 5 concurrenten met hun positionering
2. Analyseer prijsstrategieën en verdienmodellen
3. Vind gaten in de markt (unmet needs)
4. Schat marktomvang (TAM/SAM/SOM)
5. Geef een opportunity score (1-10) met onderbouwing

FORMAT:
Gestructureerd rapport met headers, bullets, en een executive summary.
Wees specifiek, gebruik cijfers waar mogelijk.
```

### RAG (Retrieval Augmented Generation)

**Knowledge Base:**
- Industrie rapporten
- Historische analyses
- Best practices
- Template library

**Workflow:**
```
Query → Embed → Vector Search → Top-K chunks → Inject in prompt → LLM → Response
```

---

## 🌐 Browser Automation Layer

### Technologie Stack

| Component | Technologie | Reden |
|-----------|-------------|-------|
| Browser Engine | Playwright | Multi-browser, reliable |
| Stealth | playwright-extra | Anti-detection |
| Proxy Rotation | BrightData / Oxylabs | IP rotation |
| CAPTCHA | 2Captcha / Anti-Captcha | Als nodig |
| Queue | BullMQ | Job management |
| Storage | S3 | Screenshots, HTML cache |

### Scraping Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       SCRAPING ORCHESTRATOR                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐                                               │
│  │  Job Queue   │ ◀── New scrape requests                       │
│  │  (BullMQ)    │                                               │
│  └──────┬───────┘                                               │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐    │
│  │  Worker 1    │     │  Worker 2    │     │  Worker 3    │    │
│  │  (Playwright)│     │  (Playwright)│     │  (Playwright)│    │
│  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘    │
│         │                    │                    │              │
│         └────────────────────┼────────────────────┘              │
│                              │                                   │
│                              ▼                                   │
│                    ┌──────────────────┐                         │
│                    │   Proxy Pool     │                         │
│                    │   (Rotating)     │                         │
│                    └──────────────────┘                         │
│                              │                                   │
│                              ▼                                   │
│                    ┌──────────────────┐                         │
│                    │   Result Store   │                         │
│                    │   (PostgreSQL)   │                         │
│                    └──────────────────┘                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Scraping Patterns

**1. Google Search Results:**
```typescript
async function scrapeGoogleResults(query: string) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
  
  const results = await page.$$eval('.g', elements => 
    elements.map(el => ({
      title: el.querySelector('h3')?.textContent,
      url: el.querySelector('a')?.href,
      snippet: el.querySelector('.VwiC3b')?.textContent
    }))
  );
  
  return results;
}
```

**2. Website Data Extraction:**
```typescript
async function extractBusinessInfo(url: string) {
  const page = await browser.newPage();
  await page.goto(url);
  
  // AI-powered extraction
  const html = await page.content();
  const extraction = await ai.extract({
    html,
    schema: {
      companyName: "string",
      email: "email[]",
      phone: "phone[]",
      address: "string",
      socialLinks: "url[]",
      pricing: "object?"
    }
  });
  
  return extraction;
}
```

**3. LinkedIn (Semi-automated):**
```typescript
// Requires user's LinkedIn session
async function visitLinkedInProfile(profileUrl: string, userSession: Session) {
  const context = await browser.newContext({
    storageState: userSession.cookies
  });
  
  const page = await context.newPage();
  await page.goto(profileUrl);
  
  // Log activity, don't automate actions
  await logProfileVisit(profileUrl);
  
  // User must manually send connection request
  return { visited: true, profileData: await extractProfileData(page) };
}
```

---

## 🎨 UI/UX Design

### Design Principles

1. **Clean & Modern:** Whitespace, subtle shadows, smooth animations
2. **Dashboard-First:** Key metrics immediately visible
3. **Wizard-Based:** Complex tasks broken into steps
4. **Dark Mode:** Because professionals work late
5. **Mobile-Responsive:** Check campaigns on the go

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Charts | Recharts |
| Tables | TanStack Table |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Animations | Framer Motion |

### Key Screens

**1. Dashboard:**
```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 Dashboard                              Arnold ▼  🔔  ⚙️     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │ 📊 Analyses │ │ 👥 Leads    │ │ 📧 Sent     │ │ 📈 Opens  │ │
│  │     12      │ │    847      │ │   1,234     │ │   34%     │ │
│  │   +3 week   │ │  +127 week  │ │  this week  │ │  ↑ 5%     │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
│                                                                  │
│  📋 Recente Activiteit                                          │
│  ────────────────────────────────────────────────────────────   │
│  • Marktanalyse "Salon Software NL" voltooid          2u geleden│
│  • 45 nieuwe leads gevonden in Amsterdam              3u geleden│
│  • Campagne "Q1 Outreach" heeft 12 replies           gisteren   │
│                                                                  │
│  🎯 Actieve Campagnes                                           │
│  ┌─────────────────────────────────────────┬───────┬──────────┐│
│  │ Campagne                                │ Status│ Response ││
│  ├─────────────────────────────────────────┼───────┼──────────┤│
│  │ Salon Software Launch                   │ 🟢    │ 8.5%     ││
│  │ EventShare Fotografen                   │ 🟡    │ 3.2%     ││
│  │ HorecaMaster Catering                   │ 🟢    │ 6.1%     ││
│  └─────────────────────────────────────────┴───────┴──────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**2. Research Wizard:**
```
┌─────────────────────────────────────────────────────────────────┐
│  🔍 Nieuwe Analyse                                    Stap 1/4  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                              ││
│  │        Beschrijf wat je wilt onderzoeken                    ││
│  │                                                              ││
│  │   ┌──────────────────────────────────────────────────────┐  ││
│  │   │ Ik wil een SaaS bouwen voor...                       │  ││
│  │   │                                                       │  ││
│  │   │                                                       │  ││
│  │   └──────────────────────────────────────────────────────┘  ││
│  │                                                              ││
│  │   💡 Voorbeelden:                                           ││
│  │   • "Salon software voor kappers met calendar sync"         ││
│  │   • "Event management tool voor bruiloften"                 ││
│  │   • "Flexpool platform voor horeca"                         ││
│  │                                                              ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│                              [Volgende →]                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**3. Live Scraping View:**
```
┌─────────────────────────────────────────────────────────────────┐
│  🔄 Analyse bezig...                                    34%     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────┬────────────────────────────┐│
│  │                                │                             ││
│  │   🌐 Live Browser View         │  📋 Gevonden Data          ││
│  │   ┌────────────────────────┐   │                             ││
│  │   │ ┌────────────────────┐ │   │  Concurrenten: 5           ││
│  │   │ │  Salonized.com     │ │   │  ├─ Salonized ✅           ││
│  │   │ │  [pricing page]    │ │   │  ├─ Fresha ✅              ││
│  │   │ │                    │ │   │  ├─ SimplyBook ✅          ││
│  │   │ │  Extracting...     │ │   │  ├─ Treatwell 🔄          ││
│  │   │ │                    │ │   │  └─ Planyo ⏳              ││
│  │   │ └────────────────────┘ │   │                             ││
│  │   └────────────────────────┘   │  Pricing data: 3/5         ││
│  │                                │  Reviews: 127 verzameld     ││
│  │   Currently: Extracting        │  Keywords: 45               ││
│  │   pricing from Treatwell       │                             ││
│  │                                │                             ││
│  └────────────────────────────────┴────────────────────────────┘│
│                                                                  │
│  [⏸️ Pauzeer]  [⏹️ Stop]                    ETA: 8 minuten      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Experience

```
┌─────────────────────┐
│ ≡  MarketScout   🔔 │
├─────────────────────┤
│                     │
│  Welkom, Arnold     │
│                     │
│  ┌───────────────┐  │
│  │ 📊 12        │  │
│  │ Analyses      │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ 👥 847       │  │
│  │ Leads         │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ 📧 34%       │  │
│  │ Open rate     │  │
│  └───────────────┘  │
│                     │
│  Recent             │
│  ─────────────────  │
│  Analyse voltooid   │
│  2u geleden         │
│                     │
│  45 nieuwe leads    │
│  3u geleden         │
│                     │
│ [+ Nieuwe Analyse]  │
│                     │
└─────────────────────┘
```

---

## 🛠️ Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    (Vercel + Next.js)                           │
├─────────────────────────────────────────────────────────────────┤
│                              │                                   │
│                              ▼                                   │
│                    ┌──────────────────┐                         │
│                    │    API Gateway   │                         │
│                    │    (Next.js)     │                         │
│                    └────────┬─────────┘                         │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │  Research   │     │    Lead     │     │  Campaign   │       │
│  │  Service    │     │   Service   │     │  Service    │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│         │                    │                    │             │
│         └────────────────────┼────────────────────┘             │
│                              │                                   │
│                              ▼                                   │
│                    ┌──────────────────┐                         │
│                    │  Browser Workers │                         │
│                    │   (Playwright)   │                         │
│                    └──────────────────┘                         │
│                              │                                   │
├──────────────────────────────┼──────────────────────────────────┤
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │ PostgreSQL  │     │   Redis     │     │     S3      │       │
│  │   (Neon)    │     │  (Upstash)  │     │ (Cloudflare)│       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│                                                                  │
│                     EXTERNAL SERVICES                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │  OpenAI /   │ │   Resend    │ │  BrightData │               │
│  │  Anthropic  │ │  (Email)    │ │  (Proxies)  │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack Detail

| Layer | Technology | Deployment |
|-------|------------|------------|
| **Frontend** | Next.js 14, React, Tailwind | Vercel |
| **API** | Next.js API Routes, tRPC | Vercel Functions |
| **Auth** | NextAuth.js + Google/Email | - |
| **Database** | PostgreSQL (Prisma ORM) | Neon |
| **Cache/Queue** | Redis + BullMQ | Upstash |
| **Browser** | Playwright | Railway/Fly.io |
| **Storage** | S3-compatible | Cloudflare R2 |
| **AI** | Claude API, OpenAI API | - |
| **Email** | Resend | - |
| **Proxies** | BrightData | - |
| **Monitoring** | Sentry, Posthog | - |

### Database Schema (Core)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  plan          Plan      @default(FREE)
  
  projects      Project[]
  leads         Lead[]
  campaigns     Campaign[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Project {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  name          String
  description   String?
  
  analyses      Analysis[]
  leads         Lead[]
  campaigns     Campaign[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Analysis {
  id            String    @id @default(cuid())
  projectId     String
  project       Project   @relation(fields: [projectId], references: [id])
  
  type          AnalysisType
  status        Status    @default(PENDING)
  input         Json
  result        Json?
  
  competitors   Competitor[]
  
  startedAt     DateTime?
  completedAt   DateTime?
  createdAt     DateTime  @default(now())
}

model Competitor {
  id            String    @id @default(cuid())
  analysisId    String
  analysis      Analysis  @relation(fields: [analysisId], references: [id])
  
  name          String
  website       String
  pricing       Json?
  features      Json?
  reviews       Json?
  
  lastScraped   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Lead {
  id            String    @id @default(cuid())
  projectId     String
  project       Project   @relation(fields: [projectId], references: [id])
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  companyName   String
  website       String?
  email         String?
  phone         String?
  address       String?
  
  // Enrichment
  employees     Int?
  industry      String?
  technologies  String[]
  socialLinks   Json?
  
  // Scoring
  score         Int       @default(0)
  status        LeadStatus @default(NEW)
  
  // Campaign tracking
  campaignLeads CampaignLead[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Campaign {
  id            String    @id @default(cuid())
  projectId     String
  project       Project   @relation(fields: [projectId], references: [id])
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  
  name          String
  type          CampaignType
  status        CampaignStatus @default(DRAFT)
  
  // Email campaign specific
  subject       String?
  content       String?   @db.Text
  sequence      Json?     // Multi-step sequence
  
  // Stats
  sent          Int       @default(0)
  opened        Int       @default(0)
  clicked       Int       @default(0)
  replied       Int       @default(0)
  
  leads         CampaignLead[]
  
  scheduledAt   DateTime?
  startedAt     DateTime?
  completedAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model CampaignLead {
  id            String    @id @default(cuid())
  campaignId    String
  campaign      Campaign  @relation(fields: [campaignId], references: [id])
  leadId        String
  lead          Lead      @relation(fields: [leadId], references: [id])
  
  status        OutreachStatus @default(PENDING)
  sentAt        DateTime?
  openedAt      DateTime?
  clickedAt     DateTime?
  repliedAt     DateTime?
  
  @@unique([campaignId, leadId])
}

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

enum Status {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  CONVERTED
  LOST
}

enum CampaignType {
  EMAIL
  LINKEDIN
  MULTICHANNEL
}

enum CampaignStatus {
  DRAFT
  SCHEDULED
  RUNNING
  PAUSED
  COMPLETED
}

enum OutreachStatus {
  PENDING
  SENT
  OPENED
  CLICKED
  REPLIED
  BOUNCED
  UNSUBSCRIBED
}
```

---

## 💰 Business Model

### Pricing Tiers

| Plan | Prijs | Analyses | Leads | Campaigns | Features |
|------|-------|----------|-------|-----------|----------|
| **Free** | €0 | 2/maand | 50 | 1 | Basis research |
| **Starter** | €49/maand | 10/maand | 500 | 5 | + AI insights |
| **Pro** | €149/maand | Unlimited | 2500 | 20 | + Browser automation |
| **Enterprise** | Custom | Unlimited | Unlimited | Unlimited | + API, SSO, support |

### Add-ons

| Add-on | Prijs |
|--------|-------|
| Extra leads (1000) | €29 |
| Extra analyses (10) | €19 |
| LinkedIn automation | €49/maand |
| Dedicated proxy pool | €99/maand |
| Priority support | €79/maand |

### Revenue Projections

| Milestone | Users | MRR | ARR |
|-----------|-------|-----|-----|
| Month 6 | 100 | €4,900 | €58,800 |
| Month 12 | 500 | €24,500 | €294,000 |
| Month 24 | 2000 | €98,000 | €1,176,000 |

---

## 📅 Roadmap

### Phase 1: MVP (8-10 weken)

**Week 1-2: Foundation**
- [ ] Project setup (Next.js, Prisma, auth)
- [ ] Database schema
- [ ] Basic UI framework
- [ ] User authentication

**Week 3-4: Research Engine**
- [ ] Google search scraping
- [ ] Basic website scraping
- [ ] AI analysis integration
- [ ] Simple report generation

**Week 5-6: Lead Generation**
- [ ] Google Maps scraping
- [ ] Contact extraction
- [ ] Basic enrichment
- [ ] Lead scoring v1

**Week 7-8: Campaign Engine**
- [ ] Email template builder
- [ ] Single email sending
- [ ] Basic tracking (opens)
- [ ] Lead management

**Week 9-10: Polish & Launch**
- [ ] UI refinement
- [ ] Bug fixes
- [ ] Documentation
- [ ] Beta launch

### Phase 2: Growth (Week 11-20)

- [ ] Sequence builder (multi-step)
- [ ] A/B testing
- [ ] Advanced analytics
- [ ] LinkedIn integration
- [ ] Competitor monitoring
- [ ] API for power users

### Phase 3: Scale (Week 21+)

- [ ] Team features
- [ ] White-label option
- [ ] Marketplace (templates, integrations)
- [ ] AI improvements
- [ ] Enterprise features

---

## ⚠️ Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Scraping blocked** | High | Proxy rotation, browser fingerprinting, fallback APIs |
| **AI costs too high** | Medium | Caching, efficient prompts, model selection per task |
| **Legal (GDPR)** | High | Clear consent, opt-out, data processing agreements |
| **LinkedIn blocks** | Medium | Semi-automated only, respect rate limits |
| **Competition** | Medium | Focus on UX, AI-first approach, niche focus |

---

## 🔗 Synergies met Bestaande Projecten

| Project | Synergy |
|---------|---------|
| **EventShare** | Research tool kan events/photographers vinden |
| **AnswerThis** | Lead gen voor speakers/trainers |
| **HorecaMaster** | Horeca leads automatiseren |
| **SalonPro** | Salon leads vinden |
| **GoldenDeal** | Lokale businesses discoveren |

**Meta-synergy:** MarketScout kan worden gebruikt om leads te vinden voor ALLE andere producten.

---

## 📋 Volgende Stappen

1. **Beslissing:** Bouw dit als:
   - A) Intern tool (alleen voor eigen gebruik)
   - B) SaaS product (verkopen aan anderen)
   - C) Beide (dogfooding + verkoop)

2. **Validatie (als B of C):**
   - Interview 5 marketeers/ondernemers
   - Landing page test
   - Prijsgevoeligheid testen

3. **Technical Spike:**
   - Playwright scraping proof-of-concept
   - AI analysis proof-of-concept
   - Cost estimation (AI, proxies, infra)

---

*Plan opgesteld door James (Opus 4.5) op 31 januari 2026. Klaar voor review.*
