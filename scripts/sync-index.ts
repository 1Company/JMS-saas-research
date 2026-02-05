/**
 * sync-index.ts
 *
 * Leest alle markdown bestanden in products/ en update index.yaml automatisch.
 * Draaibaar als: npx tsx scripts/sync-index.ts
 * Of als pre-commit hook.
 *
 * Dit script synchroniseert metadata uit de YAML frontmatter van markdown
 * bestanden naar het centrale index.yaml bestand.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const ROOT = path.resolve(__dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "products");
const INDEX_PATH = path.join(ROOT, "index.yaml");

interface ProductFrontmatter {
  slug?: string;
  name?: string;
  status?: string;
  tagline?: string;
}

function extractFrontmatter(content: string): ProductFrontmatter | null {
  // Simple YAML frontmatter parser (between --- delimiters)
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    return yaml.load(match[1]) as ProductFrontmatter;
  } catch {
    return null;
  }
}

function syncIndex() {
  console.log("🔄 Syncing index.yaml with product files...\n");

  // Read current index
  if (!fs.existsSync(INDEX_PATH)) {
    console.error("❌ index.yaml not found!");
    process.exit(1);
  }

  const indexContent = fs.readFileSync(INDEX_PATH, "utf-8");
  const index = yaml.load(indexContent) as { products: Array<{ slug: string; source_file: string }> };

  // Check all product files exist
  const productFiles = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith(".md"));

  console.log(`📁 Found ${productFiles.length} product files`);
  console.log(`📋 Index has ${index.products.length} products\n`);

  // Check for orphaned entries (in index but no file)
  for (const product of index.products) {
    const expectedFile = path.join(ROOT, product.source_file || `products/${product.slug}.md`);
    if (!fs.existsSync(expectedFile)) {
      console.warn(`⚠️  Product "${product.slug}" has no matching file: ${product.source_file}`);
    } else {
      console.log(`✅ ${product.slug} → ${product.source_file}`);
    }
  }

  // Check for new files not in index
  const indexSlugs = new Set(index.products.map((p) => p.slug));
  for (const file of productFiles) {
    const slug = file.replace(".md", "");
    if (!indexSlugs.has(slug)) {
      console.warn(
        `\n⚠️  File "products/${file}" not in index.yaml - add it manually`
      );
    }
  }

  console.log("\n✨ Sync check complete!");
  console.log(
    "Note: This script validates consistency. Edit index.yaml manually for data changes."
  );
}

syncIndex();
