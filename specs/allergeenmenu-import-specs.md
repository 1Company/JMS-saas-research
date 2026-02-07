# AllergeenMenu — Import & Scan Tech Specs

## 🎯 Doel
**Onboarding in < 5 minuten**: Restaurant-eigenaar uploadt bestaand menu → krijgt volledig allergeen-getagde digitale menukaart terug.

---

## 📊 Feature 1: Excel/CSV Import

### User Flow
```
1. Klik "Menu importeren"
2. Upload .xlsx, .xls of .csv
3. Systeem toont preview + kolom-mapping
4. AI scant ingrediënten → suggereert allergenen
5. Review & bevestig
6. Klaar!
```

### Technische Implementatie

#### Libraries
```json
{
  "xlsx": "^0.18.5",
  "papaparse": "^5.4.1"
}
```

#### API Endpoint
```typescript
// POST /api/import/excel
interface ExcelImportRequest {
  file: File;
  columnMapping?: {
    name: string;        // Kolom voor gerechtnaam
    price: string;       // Kolom voor prijs
    description?: string; // Kolom voor beschrijving
    ingredients?: string; // Kolom voor ingrediënten
    category?: string;   // Kolom voor categorie
  };
}

interface ExcelImportResponse {
  dishes: ParsedDish[];
  unmappedColumns: string[];
  warnings: string[];
}

interface ParsedDish {
  name: string;
  price: number;
  description?: string;
  ingredients?: string[];
  category?: string;
  suggestedAllergens: Allergen[]; // AI-gesuggereerd
  confidence: number; // 0-1
}
```

#### Slimme Kolom-detectie
```typescript
const COLUMN_PATTERNS = {
  name: ['naam', 'gerecht', 'dish', 'item', 'product', 'menu'],
  price: ['prijs', 'price', 'euro', '€', 'bedrag'],
  description: ['beschrijving', 'omschrijving', 'description', 'info'],
  ingredients: ['ingrediënten', 'ingredients', 'inhoud', 'bevat'],
  category: ['categorie', 'category', 'gang', 'type', 'soort']
};

function autoDetectColumns(headers: string[]): ColumnMapping {
  // Fuzzy match headers tegen patterns
  // Return beste match per kolom type
}
```

#### Prijs Parsing
```typescript
function parsePrice(value: string): number | null {
  // Handelt af: "€ 12,50", "12.50", "EUR 12,50", "12,50 euro"
  const cleaned = value
    .replace(/[€$EUR\s]/gi, '')
    .replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}
```

---

## 🌐 Feature 2: URL Scraper

### User Flow
```
1. Plak URL (eigen website, Thuisbezorgd, UberEats, etc.)
2. Systeem detecteert platform-type
3. Scraper haalt menu data op
4. AI parsed → gerechten + allergenen
5. Review & bevestig
6. Klaar!
```

### Ondersteunde Platforms

| Platform | Detectie | Methode |
|----------|----------|---------|
| Eigen website | Geen specifiek patroon | Generic scrape + AI |
| Thuisbezorgd.nl | `thuisbezorgd.nl/` | Structured scrape |
| UberEats | `ubereats.com/` | API/structured |
| Deliveroo | `deliveroo.nl/` | Structured scrape |
| Just Eat | `justeat.nl/` | Structured scrape |
| Facebook | `facebook.com/*/menu` | Open Graph |

### Technische Implementatie

#### Libraries
```json
{
  "playwright": "^1.40.0",
  "cheerio": "^1.0.0-rc.12",
  "@anthropic-ai/sdk": "^0.20.0"
}
```

#### API Endpoint
```typescript
// POST /api/import/url
interface UrlImportRequest {
  url: string;
}

interface UrlImportResponse {
  platform: 'thuisbezorgd' | 'ubereats' | 'generic' | string;
  dishes: ParsedDish[];
  restaurantInfo?: {
    name: string;
    address?: string;
    cuisine?: string;
  };
  sourceHtml?: string; // Voor debugging
  confidence: number;
}
```

#### Platform-specifieke Scrapers
```typescript
// Thuisbezorgd scraper
async function scrapeThuisbezorgd(url: string): Promise<RawMenuData> {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  // Thuisbezorgd heeft structured data
  const menuItems = await page.$$eval('[data-qa="menu-item"]', items =>
    items.map(item => ({
      name: item.querySelector('[data-qa="item-name"]')?.textContent,
      price: item.querySelector('[data-qa="item-price"]')?.textContent,
      description: item.querySelector('[data-qa="item-description"]')?.textContent,
    }))
  );
  
  await browser.close();
  return { items: menuItems, source: 'thuisbezorgd' };
}

// Generic website scraper (AI-powered)
async function scrapeGenericWebsite(url: string): Promise<RawMenuData> {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  // Haal alle tekst + structuur
  const content = await page.content();
  const text = await page.evaluate(() => document.body.innerText);
  
  await browser.close();
  
  // Stuur naar AI voor parsing
  return await parseWithAI(text, content);
}
```

#### AI Menu Parser
```typescript
const MENU_PARSER_PROMPT = `
Je bent een expert in het parsen van restaurant menu's.

Analyseer de volgende tekst van een restaurant website en extraheer ALLE gerechten.

Voor elk gerecht, geef:
- name: Naam van het gerecht
- price: Prijs (alleen getal, bijv. 12.50)
- description: Beschrijving indien aanwezig
- ingredients: Lijst van ingrediënten indien genoemd
- category: Categorie (voorgerecht, hoofdgerecht, dessert, etc.)

Return als JSON array.

TEKST:
{content}
`;

async function parseWithAI(text: string, html: string): Promise<ParsedDish[]> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: MENU_PARSER_PROMPT.replace('{content}', text.slice(0, 15000))
    }]
  });
  
  return JSON.parse(response.content[0].text);
}
```

---

## 📄 Feature 3: PDF Upload

### User Flow
```
1. Upload PDF (scan of digitaal)
2. AI Vision analyseert document
3. Extraheert gerechten + prijzen
4. Detecteert allergenen uit ingrediënten
5. Review & bevestig
6. Klaar!
```

### Technische Implementatie

#### Libraries
```json
{
  "pdf-parse": "^1.1.1",
  "@anthropic-ai/sdk": "^0.20.0"
}
```

#### Twee Paden

**Pad A: Digitale PDF (tekst-extractie)**
```typescript
import pdf from 'pdf-parse';

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text;
}
```

**Pad B: Gescande PDF (Vision AI)**
```typescript
import { pdf2pic } from 'pdf2pic';

async function extractFromScannedPDF(buffer: Buffer): Promise<string> {
  // Convert PDF pages to images
  const converter = new pdf2pic({
    density: 200,
    format: 'png',
    width: 2000,
    height: 2000
  });
  
  const images = await converter.convertBulk(buffer);
  
  // Send each page to Vision AI
  const pageTexts = await Promise.all(
    images.map(img => analyzeWithVision(img.base64))
  );
  
  return pageTexts.join('\n\n--- PAGE BREAK ---\n\n');
}
```

#### Vision AI Analysis
```typescript
const PDF_VISION_PROMPT = `
Analyseer deze afbeelding van een restaurant menukaart.

Extraheer ALLE gerechten die je ziet met:
- name: Exacte naam zoals geschreven
- price: Prijs (alleen getal)
- description: Beschrijving indien aanwezig
- category: Sectie/categorie waarin het staat

Let op:
- Menu's kunnen meerdere kolommen hebben
- Prijzen kunnen rechts uitgelijnd staan
- Sommige items hebben geen prijs (dan null)

Return als JSON array.
`;

async function analyzeWithVision(imageBase64: string): Promise<ParsedDish[]> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/png',
            data: imageBase64
          }
        },
        {
          type: 'text',
          text: PDF_VISION_PROMPT
        }
      ]
    }]
  });
  
  return JSON.parse(response.content[0].text);
}
```

---

## 🥜 Allergeen Auto-Detectie

### De 14 EU Allergenen
```typescript
const EU_ALLERGENS = {
  gluten: {
    id: 'gluten',
    name: 'Gluten',
    icon: '🌾',
    keywords: ['tarwe', 'wheat', 'rogge', 'gerst', 'haver', 'spelt', 'kamut', 
               'bloem', 'flour', 'pasta', 'brood', 'bread', 'panko', 'couscous',
               'bulgur', 'seitan', 'bier', 'mout', 'sojasaus']
  },
  crustaceans: {
    id: 'crustaceans',
    name: 'Schaaldieren',
    icon: '🦐',
    keywords: ['garnaal', 'shrimp', 'krab', 'crab', 'kreeft', 'lobster', 
               'langoustine', 'scampi', 'crevette']
  },
  eggs: {
    id: 'eggs',
    name: 'Eieren',
    icon: '🥚',
    keywords: ['ei', 'egg', 'eieren', 'mayonaise', 'mayo', 'aioli', 
               'hollandaise', 'béarnaise', 'meringue', 'pasta']
  },
  fish: {
    id: 'fish',
    name: 'Vis',
    icon: '🐟',
    keywords: ['vis', 'fish', 'zalm', 'salmon', 'tonijn', 'tuna', 'kabeljauw',
               'ansjovis', 'sardine', 'makreel', 'haring', 'vissaus']
  },
  peanuts: {
    id: 'peanuts',
    name: 'Pinda\'s',
    icon: '🥜',
    keywords: ['pinda', 'peanut', 'arachide', 'pindasaus', 'satésaus']
  },
  soybeans: {
    id: 'soybeans',
    name: 'Soja',
    icon: '🫘',
    keywords: ['soja', 'soy', 'tofu', 'tempeh', 'edamame', 'miso', 
               'sojasaus', 'ketjap', 'tahoe']
  },
  milk: {
    id: 'milk',
    name: 'Melk',
    icon: '🥛',
    keywords: ['melk', 'milk', 'kaas', 'cheese', 'room', 'cream', 'boter',
               'butter', 'yoghurt', 'kwark', 'lactose', 'wei', 'caseïne',
               'mascarpone', 'mozzarella', 'parmezaan', 'ricotta', 'crème']
  },
  nuts: {
    id: 'nuts',
    name: 'Noten',
    icon: '🌰',
    keywords: ['noot', 'nut', 'amandel', 'almond', 'hazelnoot', 'hazelnut',
               'walnoot', 'walnut', 'cashew', 'pistache', 'pecannoot',
               'macadamia', 'paranoot', 'pesto', 'praline', 'nougat', 'marzipan']
  },
  celery: {
    id: 'celery',
    name: 'Selderij',
    icon: '🥬',
    keywords: ['selderij', 'celery', 'selderijzout', 'celeriac', 'knolselderij']
  },
  mustard: {
    id: 'mustard',
    name: 'Mosterd',
    icon: '🟡',
    keywords: ['mosterd', 'mustard', 'moutarde', 'dijonnaise']
  },
  sesame: {
    id: 'sesame',
    name: 'Sesam',
    icon: '⚪',
    keywords: ['sesam', 'sesame', 'sesamolie', 'tahini', 'halvah', 'hummus']
  },
  sulphites: {
    id: 'sulphites',
    name: 'Sulfiet',
    icon: '🍷',
    keywords: ['sulfiet', 'sulphite', 'wijn', 'wine', 'azijn', 'vinegar',
               'gedroogd fruit', 'mosterd']
  },
  lupin: {
    id: 'lupin',
    name: 'Lupine',
    icon: '🌸',
    keywords: ['lupine', 'lupin', 'lupineboon', 'lupinebloem']
  },
  molluscs: {
    id: 'molluscs',
    name: 'Weekdieren',
    icon: '🦪',
    keywords: ['mossel', 'mussel', 'oester', 'oyster', 'inktvis', 'squid',
               'octopus', 'slak', 'escargot', 'kokkel', 'venusschelp']
  }
};
```

### AI Allergeen Detectie
```typescript
const ALLERGEN_DETECTION_PROMPT = `
Je bent een expert in voedselallergenen volgens EU Verordening 1169/2011.

Analyseer dit gerecht en identificeer ALLE mogelijke allergenen uit de 14 verplichte EU-categorieën:
1. Gluten (tarwe, rogge, gerst, haver, spelt)
2. Schaaldieren
3. Eieren
4. Vis
5. Pinda's
6. Soja
7. Melk (lactose)
8. Noten (8 soorten)
9. Selderij
10. Mosterd
11. Sesam
12. Sulfiet (>10mg/kg)
13. Lupine
14. Weekdieren

GERECHT:
Naam: {name}
Beschrijving: {description}
Ingrediënten: {ingredients}

Geef terug:
- detected: Array van allergeen IDs die ZEKER aanwezig zijn
- possible: Array van allergenen die MOGELIJK aanwezig zijn
- reasoning: Korte uitleg per allergeen

Wees VOORZICHTIG - liever een vals positief dan een gemiste allergeen.
Return als JSON.
`;

interface AllergenDetectionResult {
  detected: string[];     // Zeker aanwezig
  possible: string[];     // Mogelijk aanwezig (check nodig)
  reasoning: Record<string, string>;
  confidence: number;
}

async function detectAllergens(dish: ParsedDish): Promise<AllergenDetectionResult> {
  // Stap 1: Keyword matching (snel)
  const keywordMatches = matchKeywords(dish);
  
  // Stap 2: AI analyse (nauwkeurig)
  const aiResult = await analyzeWithAI(dish);
  
  // Stap 3: Combineer resultaten
  return mergeResults(keywordMatches, aiResult);
}

function matchKeywords(dish: ParsedDish): string[] {
  const text = `${dish.name} ${dish.description} ${dish.ingredients?.join(' ')}`.toLowerCase();
  const matches: string[] = [];
  
  for (const [id, allergen] of Object.entries(EU_ALLERGENS)) {
    if (allergen.keywords.some(kw => text.includes(kw.toLowerCase()))) {
      matches.push(id);
    }
  }
  
  return matches;
}
```

---

## 🖥️ UI Components

### Import Modal
```tsx
function ImportModal() {
  const [mode, setMode] = useState<'excel' | 'url' | 'pdf'>('excel');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'review'>('idle');
  const [dishes, setDishes] = useState<ParsedDish[]>([]);

  return (
    <Dialog>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Menu Importeren</DialogTitle>
          <DialogDescription>
            Kies hoe je je menu wilt importeren
          </DialogDescription>
        </DialogHeader>

        {/* Import Method Tabs */}
        <Tabs value={mode} onValueChange={setMode}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="excel">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel/CSV
            </TabsTrigger>
            <TabsTrigger value="url">
              <Globe className="mr-2 h-4 w-4" />
              Website URL
            </TabsTrigger>
            <TabsTrigger value="pdf">
              <FileText className="mr-2 h-4 w-4" />
              PDF Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="excel">
            <ExcelImporter onComplete={setDishes} />
          </TabsContent>
          
          <TabsContent value="url">
            <UrlImporter onComplete={setDishes} />
          </TabsContent>
          
          <TabsContent value="pdf">
            <PdfImporter onComplete={setDishes} />
          </TabsContent>
        </Tabs>

        {/* Review Phase */}
        {status === 'review' && (
          <DishReviewTable 
            dishes={dishes} 
            onConfirm={handleSave}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
```

### Drag & Drop Upload
```tsx
function FileDropzone({ accept, onFile }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles: 1,
    onDrop: files => onFile(files[0])
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer",
        "transition-colors duration-200",
        isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
      <p className="mt-4 text-lg font-medium">
        {isDragActive ? "Drop je bestand hier..." : "Sleep je bestand hierheen"}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        of klik om te selecteren
      </p>
    </div>
  );
}
```

### Allergeen Review Table
```tsx
function DishReviewTable({ dishes, onConfirm }) {
  const [editedDishes, setEditedDishes] = useState(dishes);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{dishes.length} gerechten gevonden</h3>
        <Badge variant="outline">
          <Sparkles className="mr-1 h-3 w-3" />
          AI allergenen detectie
        </Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gerecht</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Allergenen</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editedDishes.map((dish, i) => (
            <TableRow key={i}>
              <TableCell>
                <div>
                  <p className="font-medium">{dish.name}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-xs">
                    {dish.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>€{dish.price?.toFixed(2) || '-'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {dish.suggestedAllergens.map(a => (
                    <AllergenBadge 
                      key={a} 
                      allergen={a}
                      removable
                      onRemove={() => removeAllergen(i, a)}
                    />
                  ))}
                  <AddAllergenButton onAdd={(a) => addAllergen(i, a)} />
                </div>
              </TableCell>
              <TableCell>
                <ConfidenceIndicator value={dish.confidence} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Annuleren</Button>
        <Button onClick={() => onConfirm(editedDishes)}>
          <Check className="mr-2 h-4 w-4" />
          {dishes.length} gerechten importeren
        </Button>
      </div>
    </div>
  );
}
```

---

## 📊 Database Schema Extensie

```prisma
model ImportJob {
  id          String   @id @default(cuid())
  restaurantId String
  type        ImportType // EXCEL, URL, PDF
  status      ImportStatus // PENDING, PROCESSING, REVIEW, COMPLETED, FAILED
  sourceUrl   String?
  fileName    String?
  fileSize    Int?
  
  rawData     Json?    // Originele parsed data
  dishCount   Int?
  
  createdAt   DateTime @default(now())
  completedAt DateTime?
  
  restaurant  Restaurant @relation(fields: [restaurantId], references: [id])
  
  @@map("import_jobs")
}

enum ImportType {
  EXCEL
  URL
  PDF
}

enum ImportStatus {
  PENDING
  PROCESSING
  REVIEW
  COMPLETED
  FAILED
}
```

---

## ⚡ Performance & Limits

| Operatie | Max Size | Timeout | Est. Tijd |
|----------|----------|---------|-----------|
| Excel import | 10MB / 1000 rows | 30s | 2-5s |
| URL scrape | - | 60s | 5-15s |
| PDF (digitaal) | 20MB / 50 pages | 30s | 3-8s |
| PDF (scan) | 20MB / 20 pages | 120s | 15-45s |
| AI allergeen detect | 100 dishes/batch | 60s | 10-20s |

---

## 💰 Cost Estimation (per import)

| Component | Cost |
|-----------|------|
| Excel parsing | ~$0.00 |
| URL scrape (Playwright) | ~$0.01 |
| PDF Vision (20 pages) | ~$0.20 |
| GPT-4 menu parsing | ~$0.05 |
| Allergeen detectie (50 dishes) | ~$0.10 |
| **Total per import** | **$0.15 - $0.35** |

Bij €19/maand subscription: ~50 imports break-even

---

## 🚀 Implementation Priority

### Sprint 1: Excel Import (Week 1)
- [ ] File upload component
- [ ] XLSX/CSV parser
- [ ] Column auto-detection
- [ ] Basic allergen keyword matching
- [ ] Review table UI

### Sprint 2: AI Allergeen Detectie (Week 2)
- [ ] OpenAI/Anthropic integration
- [ ] Allergen detection prompt tuning
- [ ] Confidence scoring
- [ ] Batch processing

### Sprint 3: URL Scraper (Week 3)
- [ ] Playwright setup
- [ ] Thuisbezorgd scraper
- [ ] Generic website AI parser
- [ ] Platform detection

### Sprint 4: PDF Import (Week 4)
- [ ] pdf-parse integration
- [ ] Vision AI for scanned PDFs
- [ ] Multi-page handling
- [ ] OCR fallback

---

## ✅ Success Metrics

| Metric | Target |
|--------|--------|
| Import success rate | >95% |
| Allergen detection accuracy | >90% |
| Time to first import | <5 min |
| User satisfaction (import flow) | >4.5/5 |
| Support tickets (import issues) | <5% of imports |
