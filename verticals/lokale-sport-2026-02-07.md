# Vertical: Lokale Sport & Fitness Nederland

**Datum:** 2026-02-07
**Status:** Blue Ocean Research

---

## Marktanalyse

### Marktomvang
- **25.000+ sportverenigingen** in Nederland
- **15.000+ personal trainers** (ZZP)
- **3.000+ yoga/pilates studios**
- **1.500+ CrossFit/bootcamp locaties**
- **5,2 miljoen** Nederlanders sport wekelijks bij club
- Totale sportmarkt: €4,8 miljard/jaar

### Segmentatie
| Segment | Aantal | Gem. leden | Probleem |
|---------|--------|------------|----------|
| Sportverenigingen | 25.000 | 200 | Ledenadmin, contributie |
| Personal Trainers | 15.000 | 20 | Booking, betalingen |
| Yoga/Pilates | 3.000 | 100 | Lesrooster, packages |
| CrossFit/Bootcamp | 1.500 | 150 | WOD tracking, community |
| Sportscholen | 2.000 | 500 | Enterprise software |

### Huidige software landschap
- **AllUnited:** Verenigingen, €40+/mnd, matig UX
- **Virtuagym:** Focus grote sportscholen, €200+/mnd
- **Momoyoga:** Yoga-specifiek, geen PT
- **PTminder:** Brits, clunky, €30/mnd
- **Mindbody:** Amerikaans enterprise, €150+/mnd
- **Spreadsheets:** 60%+ van kleine clubs/PT's

---

## Pijnpunten per segment

### Personal Trainers
1. **Booking via WhatsApp** - Geen overzicht, dubbele boekingen
2. **Betalingen achter** - Klanten "vergeten" te betalen
3. **Pakket beheer** - 10x sessies, hoeveel over?
4. **Cancellations** - Last minute afzeggen = geld kwijt
5. **Groeiend klantenbestand** - Kan niet opschalen zonder systeem

### Kleine Sportclubs (<500 leden)
1. **Ledenadministratie** - Excel of AllUnited (te duur)
2. **Contributie inning** - Achterstallig, handmatig mailen
3. **Aanwezigheid bijhouden** - Geen idee wie komt
4. **Vrijwilligers roosteren** - Chaos
5. **Communicatie** - Email bounces, niemand leest het

### Yoga/Pilates Studios
1. **Lesrooster delen** - Website verouderd, klanten bellen
2. **Strippenkaarten** - Hoeveel heeft klant over?
3. **Max capaciteit** - Te veel inschrijvingen
4. **Vervanging** - Wie kan invallen?
5. **Wachtlijsten** - Populaire lessen vol

### CrossFit/Bootcamp
1. **WOD publiceren** - Elke dag andere workout delen
2. **PR tracking** - Leden willen progressie zien
3. **Community** - Leaderboards, challenges
4. **Programming** - Weken vooruit plannen

---

## 5 SaaS Ideeën

### 1. 📅 PT-Boek - Booking voor Personal Trainers
**Probleem:** PT's missen 20% omzet door WhatsApp chaos en no-shows.

**Oplossing:**
- Klanten boeken zelf via link
- Automatische herinneringen 24u + 2u
- Pakket tracking (5/10 over)
- Cancellation policy (24u = betalen)
- Betalingen via iDEAL/Stripe

**Verdienmodel:** €19/mnd basis, €39/mnd met betalingen

**Blue Ocean:** PTminder is Brits/clunky. Virtuagym is €200+/mnd overkill.

**Moeilijkheid:** ⭐⭐ (booking + packages)
**Potentie:** ⭐⭐⭐⭐⭐ (15.000 PT's, directe pijn)

---

### 2. 🏅 ClubLeden - Simpele Ledenadministratie
**Probleem:** Kleine clubs gebruiken Excel of duur AllUnited (€40+/mnd).

**Oplossing:**
- Leden toevoegen met email/telefoon
- Contributie bijhouden (betaald/achterstallig)
- Check-in via QR code bij training
- Aanwezigheidsstatistieken
- Bulk email/SMS naar leden

**Verdienmodel:** €15/mnd tot 100 leden, €29/mnd tot 300 leden

**Blue Ocean:** AllUnited te complex & duur. Excel werkt niet. Gat in de markt.

**Moeilijkheid:** ⭐⭐ (CRUD + QR)
**Potentie:** ⭐⭐⭐⭐ (veel clubs, lage churn)

---

### 3. 🧘 StudioFlow - Yoga/Pilates Beheer
**Probleem:** Studios jongleren met roosters, strippenkaarten, wachtlijsten.

**Oplossing:**
- Live lesrooster (embed op website)
- Online inschrijven met max capaciteit
- Strippenkaart/abonnement tracking
- Wachtlijst met auto-opschuiven
- Docent vervanging aanvragen

**Verdienmodel:** €29/mnd single studio, €49/mnd + locaties

**Blue Ocean:** Momoyoga is okay maar mist wachtlijsten. Mindbody = enterprise.

**Moeilijkheid:** ⭐⭐⭐ (rooster + capaciteit + wachtlijst)
**Potentie:** ⭐⭐⭐ (kleinere niche maar loyaal)

---

### 4. 💪 WODBoard - CrossFit Community Tool
**Probleem:** CrossFit boxes willen community engagement maar hebben geen tool.

**Oplossing:**
- Dagelijkse WOD publiceren (push notificatie)
- PR logging (1RM squat, Fran time, etc.)
- Leaderboards per WOD
- Challenges (30-day burpee)
- Member progress tracking

**Verdienmodel:** €39/mnd per box

**Blue Ocean:** Bestaande tools (WODIFY) zijn $150+/mnd US-focused.

**Moeilijkheid:** ⭐⭐⭐⭐ (gamification, native app nodig?)
**Potentie:** ⭐⭐⭐ (niche maar enthousiaste markt)

---

### 5. 🎾 VrijwilligersFlex - Sportclub Roostering
**Probleem:** Vrijwilligers roosteren is nachtmerrie voor verenigingen.

**Oplossing:**
- Vrijwilligers geven beschikbaarheid op
- Auto-rooster genereren
- Ruilen onderling mogelijk
- Herinneringen voor bardienst
- Vervanging vinden bij afzegging

**Verdienmodel:** €19/mnd

**Blue Ocean:** Handmatig of complexe enterprise tools. Niets ertussenin.

**Moeilijkheid:** ⭐⭐⭐ (scheduling algoritme)
**Potentie:** ⭐⭐⭐ (specifieke pijn, maar secundair)

---

## Selectie: Top 2 om te bouwen

### ✅ #1: PT-Boek (Personal Trainer Booking)
- Enorme markt (15.000 PT's in NL)
- Directe, meetbare pijn (no-shows = geld)
- Simpel te bouwen (booking + packages)
- Makkelijk te vinden (Instagram, fitness events)
- Upsell: betalingen = extra revenue stream

### ✅ #2: ClubLeden (Ledenadministratie)
- 25.000 clubs, 90% heeft geen goede oplossing
- "Boring" maar essentieel - lage churn
- Contributie feature = direct ROI zichtbaar
- QR check-in = moderne touch
- Kan groeien naar meer features

---

## Notities
- PT markt: Instagram is #1 kanaal (fitness influencers)
- Clubs: Benaderen via sportbonden (KNVB, KNLTB, etc.)
- Begin met eenvoud, voeg features toe op vraag
- QR check-in is wow-factor voor traditionale clubs
- Integratie met iDEAL/Tikkie voor betalingen = killer feature
- Let op: seizoensgebonden (sept = piek, zomer = dal)
