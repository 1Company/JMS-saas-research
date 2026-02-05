# 🛡️ ZZP Compliance Platform — Business Case

## Executive Summary

Een B2B SaaS platform dat bouw- en infrabedrijven helpt om schijnzelfstandigheid te voorkomen bij het inhuren van ZZP'ers. Met de hervatting van actieve handhaving per 1 januari 2025 en naheffingen tot €10 miljoen, is er acute behoefte aan compliance-tooling.

---

## Marktanalyse

### Urgentie: Handhaving is Live

- **1 januari 2025**: Belastingdienst hervat actieve handhaving Wet DBA
- **Minstens 10 bouwbedrijven** liggen al onder de loep (bron: Bouwend Nederland, jan 2026)
- **Naheffingen: €1-10 miljoen** per bedrijf (bron: AFNL)
- **Gemiddelde naheffing**: ~33% van bruto jaarbedrag per ZZP'er
- **Nieuwe wet VBAR** (Verduidelijking beoordeling arbeidsrelaties) in aantocht

### Doelgroep

| Segment | Aantal | Kenmerken |
|---------|--------|-----------|
| Kleine aannemers (1-10 fte) | ~50.000 | Huren 2-5 ZZP'ers in, geen compliance-kennis |
| Middelgrote bouw (10-50 fte) | ~10.000 | Flexibele schil van 10-30 ZZP'ers |
| Grote aannemers (50+ fte) | ~2.000 | 50-200+ ZZP'ers, complexe ketens |
| Uitzendbureaus/detacheerders | ~1.500 | Intermediairs, hoog volume |

**Totale markt**: ~65.000 potentiële klanten in bouw/infra alleen

### Concurrentie

| Concurrent | Focus | Prijs | Zwakte |
|------------|-------|-------|--------|
| **ZZP CHECK** | Compliance checks | Onbekend | Alleen check, geen beheer |
| **Lance Free** | ZZP beheer + inhuur | 7,5-9,75% marge | Niet bouw-specifiek, prijzig |
| **Compliance Factory** | Gratis checker + contracten | Advies/maatwerk | Niet self-service |
| **Voca ZZP** | AI-vragenlijst + compliance | Enterprise | Groot bedrijf focus |

**Gap**: Geen betaalbare, bouw-specifieke all-in-one oplossing voor MKB

---

## Product Concept: "BouwCompliant"

### Core Features

#### 1. ZZP Risico Check (MVP)
- Vragenlijst gebaseerd op Deliveroo/Uber-arresten + Belastingdienst criteria
- **Stoplicht-uitkomst**: Groen/Oranje/Rood
- PDF rapport met onderbouwing
- Advies per risico-element

#### 2. ZZP Beheer Dashboard
- Overzicht alle ingehuurde ZZP'ers
- Status per ZZP'er (laatste check, geldigheid)
- Alerts bij wijzigingen (bijv. zelfde ZZP'er >12 maanden)
- KvK/BTW validatie

#### 3. Contract Generator
- Modelovereenkomsten gebaseerd op actuele wetgeving
- Specifiek voor bouw: onderaanneming, regie, aanneemsom
- Digitale ondertekening
- Versie-beheer

#### 4. Audit Trail
- Bewijs van due diligence voor Belastingdienst
- Timestamped records van alle checks
- Exporteerbaar dossier per ZZP'er

#### 5. Periodieke Her-check
- Automatische reminder elke 3/6/12 maanden
- Detectie van "sluipende" dienstverbanden
- Notificaties bij risico-toename

### Bouw-Specifieke Elementen

- **Onderaannemer ketens**: Check ook jouw onderaannemers
- **Projectgebaseerd werken**: Risico per project vs per ZZP'er
- **Materiaal vs arbeid split**: Typisch voor bouw
- **Cao-integratie**: Vergelijking met bouw-cao's

---

## Verdienmodel

### Prijsstrategie

| Plan | Prijs | Doelgroep | Features |
|------|-------|-----------|----------|
| **Starter** | Gratis | ZZP'ers zelf | 1 self-check per maand |
| **MKB** | €49/mnd | Kleine aannemers | 10 ZZP'ers, checks, basis dashboard |
| **Professional** | €149/mnd | Middelgrote bouw | 50 ZZP'ers, contracten, audit trail |
| **Enterprise** | €399/mnd | Grote aannemers | Onbeperkt, API, dedicated support |

### Upsells

- Contract review door jurist: €150/contract
- Compliance audit (jaarlijks): €500-2000
- Training/webinar: €99/persoon
- Onderaannemer-keten check: €25/check

### Projectie (Jaar 1-3)

| Jaar | Klanten | MRR | ARR |
|------|---------|-----|-----|
| 1 | 200 | €15.000 | €180.000 |
| 2 | 800 | €55.000 | €660.000 |
| 3 | 2.000 | €130.000 | €1.560.000 |

---

## Technische Architectuur

### Stack

- **Frontend**: Next.js + Tailwind + shadcn/ui
- **Backend**: Next.js API routes
- **Database**: Neon PostgreSQL
- **Auth**: Clerk (B2B, meerdere users per organisatie)
- **Payments**: Stripe Subscriptions
- **PDF**: React-PDF voor rapporten
- **E-Sign**: DocuSign API of eigen implementatie

### Data Model

```
Organization (tenant)
├── Users (meerdere per org)
├── ZZPProfiles
│   ├── ComplianceChecks (historie)
│   ├── Contracts
│   └── Documents
├── Projects (optioneel)
└── AuditLog
```

### Integraties (V2+)

- **KvK API**: Bedrijfsvalidatie
- **Belastingdienst**: BTW-check
- **Bouwend Nederland**: Cao-data
- **Accounting**: Exact, Twinfield, Moneybird

---

## MVP Scope (4-6 weken)

### Week 1-2: Foundation
- [ ] Next.js project setup
- [ ] Clerk auth met organisaties
- [ ] Database schema (Prisma)
- [ ] Basic dashboard layout

### Week 3-4: Compliance Check
- [ ] Vragenlijst (10-15 vragen)
- [ ] Scoring algoritme
- [ ] Stoplicht resultaat
- [ ] PDF rapport generatie

### Week 5-6: ZZP Beheer
- [ ] ZZP toevoegen/beheren
- [ ] Check historie per ZZP
- [ ] Dashboard overzicht
- [ ] Email notificaties

### Post-MVP
- [ ] Contract generator
- [ ] Stripe betalingen
- [ ] Onderaannemer keten
- [ ] API voor integraties

---

## Go-to-Market

### Kanalen

1. **Content Marketing**
   - Blog: "Schijnzelfstandigheid voorkomen in 2025"
   - Whitepaper: "Checklist Wet DBA voor bouwbedrijven"
   - LinkedIn artikelen (bouw-publiek)

2. **Partnerships**
   - Bouwend Nederland / AFNL
   - Boekhouders/accountants in bouw
   - Branche-organisaties

3. **Events**
   - Bouwbeurzen (Bouwbeurs, TechniShow)
   - Webinars met arbeidsrechtjuristen

4. **Referral**
   - Korting bij doorverwijzing
   - Accountants als resellers

### Positionering

> "Voorkom miljoenen-naheffingen. Check je ZZP'ers in 5 minuten."

Focus op:
- **Angst**: Naheffingen, boetes, controles
- **Gemak**: Simpel, snel, geen jurist nodig
- **Bewijs**: Audit trail voor Belastingdienst

---

## Risico's & Mitigatie

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| Wetgeving verandert (VBAR) | Hoog | Modulair systeem, snel aanpasbaar |
| Concurrentie van gratis tools | Medium | Focus op beheer, niet alleen check |
| Juridische claims bij foute uitkomst | Hoog | Disclaimer, geen garanties, advies |
| Lage adoptie in conservatieve sector | Medium | Partnerships met trusted partijen |

---

## Conclusie

**Blue Ocean Score: 7/10**

- ✅ Acute marktbehoefte (handhaving is live)
- ✅ Duidelijke ROI voor klant (vermijd naheffingen)
- ✅ MKB-gat in de markt
- ⚠️ Concurrentie bestaat, maar niet bouw-specifiek
- ⚠️ Wetgeving in beweging (VBAR)

**Aanbeveling**: Bouwen. De timing is perfect (handhaving net gestart, angst is hoog). Focus eerst op MKB bouw, dan uitbreiden naar andere sectoren.

---

## Volgende Stappen

1. **Juridische validatie** — Vragenlijst laten reviewen door arbeidsrechtjurist
2. **Klantinterviews** — 5-10 gesprekken met bouwbedrijven
3. **MVP bouwen** — 4-6 weken development
4. **Pilot** — 10 beta-klanten gratis
5. **Launch** — Q2 2026
