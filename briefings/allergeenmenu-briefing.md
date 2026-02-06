# AllergeenMenu — Project Briefing voor AI Development

## 🎯 Opdracht
Ontwikkel een complete technische en business planning voor **AllergeenMenu** — een SaaS platform voor allergeen compliance en digitale menukaarten voor MKB horeca in Nederland.

---

## 📋 Executive Summary

**Product:** AllergeenMenu
**Tagline:** "Allergeen-compliant in 10 minuten. NVWA-proof, gast-vriendelijk."
**Doelgroep:** MKB restaurants, cafés, lunchrooms in Nederland (30.000+ bedrijven)
**Kernprobleem:** EU Verordening 1169/2011 verplicht ALLE horecabedrijven allergeeninformatie schriftelijk te tonen. 80%+ doet dit niet correct. NVWA controleert steeds actiever (boetes tot €525/overtreding).

---

## 🔥 Het Probleem (Gevalideerd)

### Wettelijke Verplichting
- **EU Verordening 1169/2011**: 14 allergenen MOETEN schriftelijk beschikbaar zijn voor gasten
- **NVWA handhaving**: Controles zijn aangescherpt in 2025, boetes tot €525 per overtreding bij herhaling
- **Realiteit**: Meeste restaurants hebben een vergeeld A4'tje achter de bar, of helemaal niets

### Pijnpunten Restaurant-eigenaren
1. Geen tijd/kennis om correcte allergeentabel te maken
2. Bij elke menuwijziging moet alles handmatig bijgewerkt worden
3. Bediening moet uit het hoofd allergenen onthouden → fouten
4. Inspectie-angst: "Wat als de NVWA langskomt?"
5. Aansprakelijkheidsrisico bij allergische reacties

### Pijnpunten Gasten
1. Moeten bij elk restaurantbezoek opnieuw vragen naar allergenen
2. Vertrouwen op geheugen van bediening
3. Geen manier om vooraf (online) allergeeninformatie te checken
4. Gasten met meerdere allergieën hebben geen overzicht

### Marktcijfers
- 45.000+ horecabedrijven in NL, ALLEMAAL wettelijk verplicht
- 67% van gasten wil online allergeeninformatie VOOR restaurantbezoek (Technomic 2025)
- Aantal gediagnosticeerde voedselallergieën stijgt 3-5% per jaar in Europa
- Post-COVID: QR-menu's zijn genormaliseerd — gasten verwachten digitaal

---

## 💡 De Oplossing

### Kernfeatures MVP (v0.1)
1. **Gerecht beheer**: Voeg gerechten toe met naam, beschrijving, prijs
2. **Allergeen tagging**: Per gerecht de 14 EU-allergenen aan/uit zetten
3. **QR-code generator**: Unieke QR per restaurant → gast-facing digitale menukaart
4. **Gast allergeenfilter**: Gast selecteert allergieën → ziet alleen veilige gerechten
5. **NVWA rapport**: Eén klik → compliant allergeentabel als PDF
6. **Nederlandse interface** met Engels als secundaire taal

### Features v1.0
7. **AI ingrediënt-scan**: Voer ingrediënten in, AI detecteert automatisch allergenen ("pesto" → noten, melk)
8. **Gastprofielen**: Terugkerende gasten slaan allergieën op → gepersonaliseerde menukaart
9. **Personeel alerts**: Bestelling met hoog-risico allergeen → keuken krijgt waarschuwing
10. **Seizoensmenu beheer**: Check of alle allergenen bijgewerkt zijn bij menuwijziging
11. **Meertalig**: NL, EN, DE, FR
12. **Google/TheFork integratie**: Allergeeninformatie op externe platforms

### Features v2.0 (Toekomst)
- HorecaMaster integratie (orders + allergenen in één systeem)
- Ingredient database met automatische allergeen-mapping
- Reserveringssystemen integratie (gastprofiel automatisch laden)
- Catering/event mode

---

## 🏗️ Technische Architectuur (Voorstel)

### Stack
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes (serverless)
- **Database**: PostgreSQL (Neon/Supabase)
- **Auth**: Clerk of NextAuth
- **AI**: OpenAI GPT-4 voor ingrediënt → allergeen mapping
- **Hosting**: Vercel
- **QR**: qrcode.react of node-qrcode
- **PDF**: @react-pdf/renderer of jsPDF

### Database Schema (Conceptueel)
```
Restaurant
  - id, name, slug, logo, address
  - subscription_tier, created_at

MenuItem
  - id, restaurant_id, name, description, price
  - category, is_active, sort_order

MenuItemAllergen (junction)
  - menu_item_id, allergen_id
  - contains (boolean), may_contain (boolean)

Allergen (static/seed)
  - id, code, name_nl, name_en, icon

GuestProfile
  - id, email (optional), allergens (array)
  - restaurant_visits (tracking)

NVWAReport
  - id, restaurant_id, generated_at, pdf_url
```

### De 14 EU Allergenen
1. Gluten (tarwe, rogge, gerst, haver)
2. Schaaldieren
3. Eieren
4. Vis
5. Pinda's
6. Soja
7. Melk (lactose)
8. Noten (amandelen, hazelnoten, walnoten, etc.)
9. Selderij
10. Mosterd
11. Sesamzaad
12. Sulfiet (>10mg/kg)
13. Lupine
14. Weekdieren

---

## 💰 Business Model

### Pricing
| Plan | Prijs | Features |
|------|-------|----------|
| **Gratis** | €0 | 10 gerechten, QR menu (met branding), basis allergeentabel |
| **Starter** | €9/maand | 50 gerechten, eigen branding, NVWA rapport, 1 gebruiker |
| **Professional** | €19/maand | Onbeperkt gerechten, AI scan, gastprofielen, alerts, 3 gebruikers |
| **Multi-locatie** | €39/maand/locatie | Alles + centraal beheer, 10 gebruikers |

### Add-ons
- Extra talen: €5/maand per taal
- Google/TheFork integratie: €10/maand
- Custom menu design: €99 eenmalig

### Unit Economics (Target)
- CAC: €30-50 (SEO + referral driven)
- LTV: €200-400 (gemiddeld 18-24 maanden retentie)
- Breakeven: ~€10K MRR met ~700 betalende klanten

---

## 🚀 Go-to-Market Strategie

### Launch (Week 1-4)
1. **Landingpage** met "Is jouw menukaart NVWA-proof?" gratis check
2. **10 beta restaurants** in Eindhoven/Den Bosch (Arnold's netwerk)
3. **Product Hunt / LinkedIn launch**

### Growth (Maand 2-6)
4. **SEO**: "allergenen menukaart restaurant verplicht", "NVWA controle horeca"
5. **KHN/MKB Nederland partnership**: Aanbevolen compliance tool
6. **Referral programma**: Restaurant nodigt buurman uit → beiden €2/maand korting
7. **HACCP adviseurs als channel**: Zij zien compliance-gaten

### Scale (Maand 6-12)
8. **HorecaMaster cross-sell**: Module voor bestaande klanten
9. **België + Duitsland**: Zelfde wetgeving, zelfde product
10. **Horecava 2027**: Live demo stand

---

## 📊 Concurrentie-analyse

| Concurrent | Prijs | Zwakte |
|------------|-------|--------|
| **Menutech** | €20-390/maand | Duur, focus op design niet compliance, niet NL |
| **AllergyMenu.app** | £15+/maand | UK-only, geen NL taal, geen gast-filtering |
| **Apicbase** | €299+/maand | Enterprise, allergenen is subfeature |
| **Horeko** | €15+/maand | HACCP focus, allergenen rudimentair |
| **Papieren lijst** | €0 | Foutgevoelig, nooit bijgewerkt, niet compliant |

**Onze USP:**
- Betaalbaar voor MKB (vanaf €0)
- Nederlands-talig met NVWA-specifieke rapportage
- Gast-facing QR menu met filter (niet alleen backoffice)
- AI-powered ingrediënt herkenning

---

## ⏱️ Development Roadmap

### Sprint 1 (Week 1-2): Foundation
- [ ] Project setup (Next.js, Tailwind, DB)
- [ ] Auth flow (Clerk)
- [ ] Restaurant CRUD
- [ ] MenuItem CRUD met allergeen tagging
- [ ] Database seeding (14 allergenen)

### Sprint 2 (Week 3-4): Core Features
- [ ] QR code generatie per restaurant
- [ ] Gast-facing menu pagina (/menu/[slug])
- [ ] Allergeenfilter UI voor gasten
- [ ] NVWA rapport PDF generator
- [ ] Basic dashboard

### Sprint 3 (Week 5-6): Polish & Launch
- [ ] Responsive design (mobile-first)
- [ ] Onboarding flow
- [ ] Stripe integratie (subscriptions)
- [ ] Email notificaties
- [ ] Beta testing met 5-10 restaurants

### Sprint 4 (Week 7-8): V1.0
- [ ] AI ingrediënt → allergeen scan (GPT-4)
- [ ] Gastprofielen
- [ ] Meertalig (EN toevoegen)
- [ ] Personeel alerts
- [ ] Public launch

---

## 🎯 Success Metrics

### MVP Launch (Week 6)
- 50 restaurants aangemeld (free tier)
- 10 betalende klanten
- NPS > 40

### Month 3
- 500 restaurants totaal
- 100 betalende klanten (€1,500 MRR)
- 5.000 gast menu views per maand

### Month 6
- 2.000 restaurants totaal
- 400 betalende klanten (€6,000 MRR)
- 1 partnership (KHN of HACCP adviseur)

### Year 1
- €15K+ MRR
- België gelanceerd
- HorecaMaster integratie live

---

## ❓ Open Vragen voor Planning

1. **Standalone of HorecaMaster module?** 
   - Standalone geeft snellere launch en bredere markt
   - Module geeft direct klantbase maar beperkt bereik

2. **Domein?**
   - allergeenmenu.nl
   - menuallergenen.nl
   - allergeencheck.nl

3. **Gratis tier limiet?**
   - 10 gerechten te weinig voor echt gebruik?
   - Of juist goed voor conversie-druk?

4. **AI ingrediënt-scan in MVP of v1.0?**
   - MVP zonder AI is sneller (4 weken)
   - AI is killer feature maar voegt 2-3 weken toe

5. **Gastprofielen met of zonder account?**
   - Account = friction maar meer features
   - Cookie-based = minder friction maar minder sticky

---

## 📎 Referenties

- EU Verordening 1169/2011: https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX%3A32011R1169
- NVWA Allergenen horeca: https://www.nvwa.nl/onderwerpen/allergenen
- Menutech: https://www.menutech.com
- Technomic Consumer Trends 2025
- HorecaMaster codebase: /root/clawd/HorecaMaster (voor integratie referentie)

---

## 🤖 Instructie voor AI

**Jouw taak:**
1. Review deze briefing en stel verduidelijkende vragen
2. Maak een gedetailleerde technische specificatie (database schema, API endpoints, component structuur)
3. Breek het project op in concrete taken met uur-schattingen
4. Identificeer risico's en mitigaties
5. Stel een development volgorde voor (wat eerst bouwen?)
6. Geef recommendations voor de open vragen

**Output format:**
- Gestructureerd markdown document
- Mermaid diagrams waar nuttig
- Concrete, actionable taken (geen vage beschrijvingen)
- Prioritering met MoSCoW of vergelijkbaar

**Context:**
- Developer: Arnold (fullstack, Next.js ervaring, solo)
- Bestaande projecten: HorecaMaster, EventShare, AnswerThis (allen Next.js)
- Doel: MVP in 4-5 weken, eerste betalende klanten in 6-8 weken
