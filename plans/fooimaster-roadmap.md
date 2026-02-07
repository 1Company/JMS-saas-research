# FooiMaster - Product Roadmap

> Fooi verdeling & administratie voor MKB Horeca

---

## 🎯 Visie

De #1 fooi-management tool voor Nederlandse horeca. Van handmatige Excel-chaos naar geautomatiseerde, transparante en fiscaal correcte fooienverdeling.

---

## Fase 1: MVP (4-5 weken)

### Doel
Werkend product waarmee één restaurant fooien kan registreren, verdelen en uitkeren. Valideer product-market fit met 10-20 beta-gebruikers.

### Core Features

#### 1.1 Bedrijfsbeheer
- [ ] Restaurant aanmaken (naam, adres, KvK)
- [ ] Eigenaar/manager account
- [ ] Basis instellingen (valuta €, taal NL)

#### 1.2 Medewerkersbeheer
- [ ] Medewerkers toevoegen (naam, email, telefoon, bankrekening)
- [ ] Rollen toewijzen (Chef, Sous-chef, Kok, Bediening, Bar, Afwas, Runner, Host)
- [ ] Actief/inactief status
- [ ] Medewerker kan eigen profiel bekijken (read-only)

#### 1.3 Diensten/Shifts
- [ ] Handmatig diensten invoeren (datum, start, eind, medewerker, rol)
- [ ] Weekoverzicht van alle diensten
- [ ] Uren automatisch berekend

#### 1.4 Fooi Registratie
- [ ] Dagelijkse fooi invoeren (datum, bedrag contant, bedrag PIN)
- [ ] Notitieveld (bijv. "drukke zaterdagavond")
- [ ] Maand/week totalen dashboard

#### 1.5 Verdeelregels
- [ ] Configureer verdeling per rol:
  - Percentage-based (Chef 10%, Bediening 30%, etc.)
  - OF uren-based (iedereen naar gewerkte uren)
  - OF hybride (rollen hebben gewicht, × uren)
- [ ] Regels opslaan als template
- [ ] Preview verdeling voordat je bevestigt

#### 1.6 Verdeling Uitvoeren
- [ ] Selecteer periode (dag/week)
- [ ] Systeem berekent automatisch per medewerker
- [ ] Review scherm met breakdown
- [ ] Bevestigen → verdeling vastleggen

#### 1.7 Medewerker Dashboard
- [ ] Eigen fooi per shift zien
- [ ] Week/maand totalen
- [ ] Mobiel-vriendelijke webview (geen app nodig)
- [ ] Login via magic link (email)

#### 1.8 Uitbetaling Tracking
- [ ] Markeer als "uitbetaald" (contant of via salaris)
- [ ] Datum + methode vastleggen
- [ ] Openstaand bedrag per medewerker

#### 1.9 Export
- [ ] CSV export van verdelingen
- [ ] PDF overzicht per periode
- [ ] Klaar voor boekhouder

### Tech Stack MVP
```
Frontend: Next.js 14 + TypeScript + Tailwind
Backend: Next.js API routes + Prisma
Database: PostgreSQL (Supabase of Railway)
Auth: NextAuth.js met magic link
Hosting: Vercel
```

### MVP Deliverables
- [ ] Landing page met waitlist
- [ ] Werkende applicatie (responsive web)
- [ ] 10-20 beta testers actief
- [ ] Basis documentatie/FAQ

### MVP Kosten
| Item | Kosten |
|------|--------|
| Domein (fooimaster.nl) | €15/jaar |
| Supabase (free tier) | €0 |
| Vercel (free tier) | €0 |
| Totaal MVP | **~€15** |

### Success Metrics MVP
- 20+ waitlist signups
- 10+ actieve beta gebruikers
- 50+ verdelingen uitgevoerd
- NPS > 7 van beta testers
- Gemiddeld 15 min/week tijdsbesparing gerapporteerd

---

## Fase 2: V1.0 Launch (6-8 weken na MVP)

### Doel
Betalende klanten werven. Integraties met kassasystemen en salarissoftware.

### Nieuwe Features

#### 2.1 Betalingen & Subscriptions
- [ ] Stripe integratie
- [ ] Plan selectie (Starter €9, Pro €19, Business €39)
- [ ] 14 dagen gratis trial
- [ ] Facturen automatisch via Stripe

#### 2.2 Kassasysteem Integraties
- [ ] **Lightspeed K-Series** - PIN-fooi automatisch ophalen
- [ ] **Untill** - Shift data + fooi import
- [ ] **Orderbird** - Basisintegratie
- [ ] Fallback: CSV upload vanuit kassasysteem

#### 2.3 Rooster Koppelingen
- [ ] **Shiftbase** integratie - diensten automatisch importeren
- [ ] **Workforce** integratie
- [ ] iCal import (universeel)

#### 2.4 Salarissoftware Export
- [ ] **Nmbrs** export format
- [ ] **Loket.nl** export format
- [ ] **AFAS** export format
- [ ] Universele CSV met alle vereiste velden

#### 2.5 Verbeterd Dashboard
- [ ] Grafische weergave (charts) van fooi trends
- [ ] Vergelijking met vorige periode
- [ ] Drukste dagen/shifts identificeren
- [ ] Fooi per gast berekening (indien covers bekend)

#### 2.6 Team Features
- [ ] Meerdere managers per locatie
- [ ] Rollen: Owner, Manager, Viewer
- [ ] Activiteit log (wie deed wat)

#### 2.7 Medewerker App Verbeteringen
- [ ] Push notificaties (nieuwe verdeling beschikbaar)
- [ ] Eigen uren/shifts inzien
- [ ] Fooi historie volledig doorzoekbaar

#### 2.8 Compliance & Audit
- [ ] Complete audit trail van alle wijzigingen
- [ ] Jaaroverzicht voor belastingaangifte
- [ ] BTW/loonheffing notities per export

### Tech Additions V1.0
```
Payments: Stripe
Integrations: REST APIs + Webhooks
Notifications: Resend (email) + web push
Analytics: PostHog of Plausible
```

### Pricing Actief
| Plan | Prijs/maand | Limiet |
|------|-------------|--------|
| Starter | €9 | 10 medewerkers, handmatig |
| Professional | €19 | 25 medewerkers, 1 POS-integratie |
| Business | €39 | Onbeperkt, alle integraties |

### V1.0 Kosten
| Item | Kosten/maand |
|------|--------------|
| Supabase Pro | €25 |
| Vercel Pro | €20 |
| Stripe fees | 1.4% + €0.25/tx |
| Resend | €20 |
| **Totaal** | ~€70/maand + tx fees |

### Success Metrics V1.0
- 50+ betalende klanten
- €1.000+ MRR
- <5% monthly churn
- 3+ kassasysteem-integraties live
- 50+ Google reviews / testimonials

---

## Fase 3: Growth (3-6 maanden na V1.0)

### Doel
Schalen naar 500+ klanten. Multi-locatie support. Partnership kanaal opbouwen.

### Nieuwe Features

#### 3.1 Multi-Locatie
- [ ] Meerdere vestigingen onder één account
- [ ] Centraal dashboard voor groepseigenaar
- [ ] Per-locatie managers
- [ ] Geconsolideerde rapportages
- [ ] Groepsbrede verdeelregels (optioneel)

#### 3.2 Geavanceerde Verdeling
- [ ] Shift-type gewichten (avond × 1.2, weekend × 1.3)
- [ ] Anciënniteit bonus (meer ervaring = hoger gewicht)
- [ ] Trainee-regels (eerste 3 maanden 80%)
- [ ] "Faire verdeling" algoritme suggesties
- [ ] A/B test verschillende verdeelmodellen

#### 3.3 Direct Uitbetalen
- [ ] Stripe Connect: direct naar bankrekening medewerker
- [ ] Instant payout (dezelfde dag)
- [ ] Fee: 1% van uitbetaald bedrag
- [ ] Medewerker kiest: via salaris of direct

#### 3.4 WhatsApp Integratie
- [ ] Medewerker ontvangt verdeling via WhatsApp
- [ ] "Jouw fooi deze week: €127,50"
- [ ] Opt-in per medewerker

#### 3.5 HorecaMaster Module
- [ ] Native integratie in HorecaMaster
- [ ] Gedeeld medewerkersbeheer
- [ ] Roosters automatisch gesync'd
- [ ] Unified billing

#### 3.6 API & Webhooks
- [ ] Publieke REST API (voor eigen integraties)
- [ ] Webhooks voor events (nieuwe verdeling, uitbetaling, etc.)
- [ ] API documentatie + sandbox

#### 3.7 Geavanceerde Rapportages
- [ ] Fooi trends over tijd
- [ ] Seizoenspatronen
- [ ] Benchmark vs branche (geanonimiseerd)
- [ ] Export naar Google Sheets (live sync)

#### 3.8 Partnerships Dashboard
- [ ] White-label optie voor payroll providers
- [ ] Referral tracking voor partners
- [ ] Commissie automatisch berekend

### Growth Marketing
- [ ] KHN partnerschap actief
- [ ] Aanwezig op Horecava beurs
- [ ] Case studies met bekende restaurants
- [ ] "Fooi Calculator" gratis tool voor leadgen
- [ ] SEO: #1 op "fooi verdelen restaurant"

### Success Metrics Fase 3
- 500+ betalende klanten
- €15.000+ MRR
- 10+ multi-locatie klanten (groepen)
- 3+ actieve partnerships (payroll/kassa)
- 20%+ klanten via referral

---

## Fase 4: Scale & Internationaal (12+ maanden)

### Doel
Marktleider NL, uitbreiding naar België en Duitsland.

### Nieuwe Features

#### 4.1 België Uitrol
- [ ] Belgische fiscale regels implementeren
- [ ] iDEAL + Bancontact betalingen
- [ ] NL + FR taal support
- [ ] Belgische kassasystemen integreren

#### 4.2 Duitsland Uitrol
- [ ] Duitse loonbelasting regels (Trinkgeld)
- [ ] SEPA Direct Debit
- [ ] Duitse taal
- [ ] Duitse kassasystemen (Orderbird, Gastrofix)

#### 4.3 Enterprise Features
- [ ] SSO (Single Sign-On)
- [ ] Dedicated account manager
- [ ] Custom integraties
- [ ] SLA garanties
- [ ] On-premise optie (voor grote ketens)

#### 4.4 AI Features
- [ ] "Eerlijke verdeling" suggesties op basis van data
- [ ] Anomalie detectie (ongebruikelijke fooien)
- [ ] Forecasting: verwachte fooi komende week
- [ ] Automatische shift-toewijzing optimalisatie

#### 4.5 Franchise Module
- [ ] Franchise-eigenaar dashboard
- [ ] Verplichte verdeelregels afdwingen
- [ ] Compliance monitoring per vestiging
- [ ] Benchmark franchisenemers onderling

### Success Metrics Fase 4
- 2.000+ klanten (NL + BE + DE)
- €75.000+ MRR
- 5+ enterprise klanten (20+ locaties)
- Break-even of winstgevend
- Team: 3-5 FTE

---

## 📅 Timeline Overzicht

```
Maand 1-2:      MVP ontwikkeling
Maand 2:        Beta launch (20 gebruikers)
Maand 3-4:      V1.0 ontwikkeling  
Maand 4:        V1.0 launch + eerste betalende klanten
Maand 5-6:      Growth features + integraties
Maand 7-12:     Scale naar 500+ klanten
Maand 12+:      Internationaal (BE, DE)
```

---

## 💰 Financiële Projectie

### Jaar 1
| Maand | Klanten | MRR | Kosten | Netto |
|-------|---------|-----|--------|-------|
| 1-2 | 0 | €0 | €100 | -€100 |
| 3 | 10 | €150 | €150 | €0 |
| 4 | 30 | €500 | €200 | €300 |
| 5 | 60 | €1.000 | €300 | €700 |
| 6 | 100 | €1.800 | €400 | €1.400 |
| 7-12 | 250 | €4.500 | €800 | €3.700 |

**Jaar 1 totaal:** ~€30K revenue, ~€15K kosten, **~€15K winst**

### Jaar 2+
- Target: 1.000+ klanten
- MRR: €20.000+
- ARR: €240.000+
- Potentiële exit/overname door kassasysteem of payroll provider

---

## 🚀 Directe Volgende Stappen

### Deze week:
1. [ ] Domein registreren: fooimaster.nl
2. [ ] Repo aanmaken: JMS-fooimaster
3. [ ] Next.js project setup
4. [ ] Database schema ontwerpen
5. [ ] Landing page met waitlist live

### Volgende week:
6. [ ] Core models bouwen (Employee, Shift, Tip, Distribution)
7. [ ] Basic CRUD operaties
8. [ ] Eerste verdeellogica implementeren
9. [ ] Medewerker login (magic link)

### Week 3-4:
10. [ ] Dashboard UI (manager)
11. [ ] Medewerker dashboard (mobiel)
12. [ ] Export functionaliteit
13. [ ] Beta testers uitnodigen

---

## 📋 Risico's & Mitigatie

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| Lage adoptie | Hoog | Gratis trial, ROI calculator, KHN partnership |
| Kassasysteem weigert integratie | Medium | CSV fallback, meerdere systemen targeten |
| Concurrentie komt | Medium | First-mover voordeel, snelle feature velocity |
| Fiscale regels veranderen | Laag | Modulair bouwen, snel aanpasbaar |
| Technische schuld | Medium | Clean code from start, tests |

---

*Document versie: 1.0*  
*Laatst bijgewerkt: 7 februari 2026*  
*Auteur: James (AI Assistant)*
