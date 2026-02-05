# JMS SaaS Research Repository

## Wat is dit?
Dit is de research repository voor het JMS SaaS portfolio. Het bevat gestructureerde marktonderzoek data voor 6 SaaS producten.

## Structuur
- `index.yaml` - **Hoofdbestand**: alle producten met gestandaardiseerde metrics
- `products/` - Per product een markdown bestand met gedetailleerd onderzoek
- `scripts/` - Tooling voor data synchronisatie

## Hoe data te lezen

### Snelle vergelijking
Lees `index.yaml` voor een overzicht van alle producten. Bevat:
- Blue Ocean scores (6 factoren + totaal, schaal 1-10)
- TAM/SAM/SOM (in centen, deel door 100 voor euro's)
- Revenue projecties (jaar 1/2/3, in centen)
- Build schattingen (weken + kosten in centen)
- Concurrenten per product
- Rankings (gesorteerd op verschillende dimensies)

### Gedetailleerd onderzoek
Lees de individuele markdown bestanden in `products/` voor:
- Diepere marktanalyse
- Feature roadmap
- Go-to-market strategie
- Risico's en mitigatie

## Producten (6)
| Product | Slug | Status | Blue Ocean |
|---------|------|--------|------------|
| MarketScout | marketscout | IN_DEVELOPMENT | 7.8 |
| SaaS Video Generator | saas-video-generator | RESEARCH | 7.2 |
| EventShare | eventshare | LAUNCHED | 6.7 |
| AnswerThis | answerthis | LAUNCHED | 6.0 |
| GoldenDeal | goldendeal | IDEA | 5.5 |
| HorecaMaster | horecamaster | IN_DEVELOPMENT | 5.3 |

## Cross-referenties
- **MarketScout app**: `C:\Users\ahuis\source\repos\MarketScout` - Intelligence dashboard visualiseert deze data
- **JMS-SaasMasters**: `C:\Users\ahuis\source\repos\JMS-SaasMasters` - Portfolio website

## Veelgestelde vragen voor Claude Code
- "Vergelijk Blue Ocean scores" → Lees `index.yaml` rankings.by_blue_ocean_total
- "Welk product heeft het hoogste TAM?" → Lees `index.yaml` rankings.by_tam
- "Toon revenue projecties" → Lees `index.yaml` per product revenue_projections
- "Wie zijn de concurrenten van X?" → Lees `index.yaml` products[slug=X].competitors
- "Wat is de ROI van X?" → Bereken: year_3 revenue / build cost
