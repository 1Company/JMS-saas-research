# MarketScout - AI Market Intelligence

## Status: IN_DEVELOPMENT

## Samenvatting
SaaS platform voor AI-powered marktanalyse, concurrentiemonitoring, lead generation en outreach campagnes. Gericht op Europese MKB bedrijven die Semrush te duur vinden en Apollo.io te US-focused.

## Kernfeatures
- AI marktanalyse (Claude + OpenAI)
- Concurrentie monitoring (automatisch)
- Lead generation & scoring
- Email campagnes met personalisatie
- Team management & billing
- Scheduled tasks (dagelijks/wekelijks)
- Intelligence dashboard (in development)

## Marktanalyse
### Target Market
- MKB bedrijven (10-200 medewerkers)
- Startups die PMF zoeken
- Marketing agencies
- Sales teams

### Waarom nu?
- AI maakt marktonderzoek 10x goedkoper
- Europese bedrijven willen EU-compliant tools
- Apollo/Semrush te duur voor MKB
- GDPR maakt US-alternatieven risicovol

## Blue Ocean Canvas
| Factor | Semrush/Apollo | MarketScout |
|--------|---------------|-------------|
| Prijs | €100-500/maand | €0-149/maand |
| AI analyse | Beperkt | Kern feature |
| EU focus | Nee | Ja (GDPR first) |
| Setup tijd | Dagen | Minuten |
| Data bronnen | Eigen databases | AI + web search |
| Email outreach | Aparte tool | Ingebouwd |
| Team management | Enterprise tier | Standaard |

## Tech Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Recharts, TanStack Table
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **AI**: Anthropic Claude, OpenAI
- **Search**: Brave Search API
- **Email**: SMTP2Go
- **Payments**: Stripe
- **Auth**: NextAuth.js

## Go-to-Market
1. Freemium model (100 gratis credits)
2. Content marketing (marktanalyse templates)
3. ProductHunt launch
4. LinkedIn outreach naar MKB eigenaren

## Risico's
- AI kosten kunnen oplopen
- Datakwaliteit afhankelijk van publieke bronnen
- Enterprise features verwacht maar complex
- Concurrentie van gevestigde partijen

## Roadmap
- [x] Core platform (auth, teams, projects)
- [x] AI marktanalyse
- [x] Lead generation
- [x] Email campagnes
- [x] Billing & credits
- [x] Competitor tracking
- [ ] Intelligence dashboard
- [ ] Scheduled tasks engine
- [ ] API voor externe integraties
- [ ] Mobile responsive dashboard
