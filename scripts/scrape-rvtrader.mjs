#!/usr/bin/env node

/**
 * RV Trader Scraper
 *
 * Scrapes ~80-100 real RV listings from rvtrader.com with photos.
 * Uses staggered delays to mimic normal browsing behavior.
 *
 * Usage:
 *   npm install puppeteer  (one-time)
 *   node scripts/scrape-rvtrader.mjs
 *
 * Output:
 *   scripts/output/listings.json     — All scraped listing data
 *   scripts/output/photos/{id}/      — Downloaded photos per listing
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'output');
const PHOTOS_DIR = path.join(OUTPUT_DIR, 'photos');
const LISTINGS_FILE = path.join(OUTPUT_DIR, 'listings.json');
const PROGRESS_FILE = path.join(OUTPUT_DIR, 'progress.json');

// ─── Config ──────────────────────────────────────────────────────────

const CONFIG = {
  // How many listings to scrape per RV type
  listingsPerType: {
    'Travel Trailer': 20,
    'Fifth Wheel': 12,
    'Class A': 10,
    'Class C': 10,
    'Class B': 8,
    'Toy Hauler': 10,
    'Pop-Up Camper': 10,
  },

  // Staggered delays (milliseconds) — mimics human browsing
  delays: {
    betweenPages: { min: 4000, max: 8000 },      // Between search result pages
    betweenListings: { min: 3000, max: 7000 },    // Between clicking into listings
    betweenPhotos: { min: 500, max: 1500 },       // Between photo downloads
    afterType: { min: 8000, max: 15000 },         // Pause between RV type categories
  },

  // Max photos to download per listing
  maxPhotosPerListing: 15,

  // Browser settings
  headless: true,  // Set to false to watch the browser
  viewport: { width: 1440, height: 900 },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function randomDelay(range) {
  const ms = Math.floor(Math.random() * (range.max - range.min) + range.min);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.rvtrader.com/',
      }
    }, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { file.close(); fs.unlinkSync(filepath); reject(err); });
    }).on('error', (err) => {
      file.close();
      try { fs.unlinkSync(filepath); } catch {}
      reject(err);
    });
  });
}

function loadProgress() {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  } catch {
    return { completedTypes: [], listings: [] };
  }
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ─── RV Type URL mapping ────────────────────────────────────────────

function getSearchUrl(rvType, page = 1) {
  const typeParam = encodeURIComponent(rvType);
  const slug = rvType.replace(/\s+/g, '-');
  return `https://www.rvtrader.com/${slug}/rvs-for-sale?type=${typeParam}&page=${page}`;
}

// ─── Scraping functions ─────────────────────────────────────────────

async function scrapeSearchPage(page) {
  // Extract listing cards from search results page
  return await page.evaluate(() => {
    const results = [];

    // RV Trader uses various selectors — try multiple approaches
    const cards = document.querySelectorAll('[data-listing-id], .listing-card, .search-result-item, [class*="listing"]');

    // If no cards found with those selectors, try finding links to listing detail pages
    if (cards.length === 0) {
      // Look for links that point to listing detail pages
      const links = document.querySelectorAll('a[href*="/listing/"], a[href*="rvs-for-sale/"]');
      const seen = new Set();

      links.forEach(link => {
        const href = link.href;
        if (seen.has(href)) return;
        seen.add(href);

        // Try to extract info from the card containing this link
        const card = link.closest('[class*="card"], [class*="listing"], [class*="result"], li, article') || link;
        const titleEl = card.querySelector('h2, h3, h4, [class*="title"], [class*="name"]');
        const priceEl = card.querySelector('[class*="price"], [class*="cost"]');
        const imgEl = card.querySelector('img');
        const locationEl = card.querySelector('[class*="location"], [class*="city"], [class*="dealer"]');

        results.push({
          detailUrl: href,
          title: titleEl?.textContent?.trim() || '',
          price: priceEl?.textContent?.trim() || '',
          heroImage: imgEl?.src || imgEl?.getAttribute('data-src') || '',
          location: locationEl?.textContent?.trim() || '',
        });
      });
    } else {
      cards.forEach(card => {
        const link = card.querySelector('a[href*="/listing/"], a[href*="rvs-for-sale/"]') || card.closest('a');
        const titleEl = card.querySelector('h2, h3, h4, [class*="title"], [class*="name"]');
        const priceEl = card.querySelector('[class*="price"], [class*="cost"]');
        const imgEl = card.querySelector('img');
        const locationEl = card.querySelector('[class*="location"], [class*="city"]');

        if (link?.href) {
          results.push({
            detailUrl: link.href,
            title: titleEl?.textContent?.trim() || '',
            price: priceEl?.textContent?.trim() || '',
            heroImage: imgEl?.src || imgEl?.getAttribute('data-src') || '',
            location: locationEl?.textContent?.trim() || '',
          });
        }
      });
    }

    return results;
  });
}

async function scrapeDetailPage(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for content to load
  await page.waitForSelector('img', { timeout: 10000 }).catch(() => {});

  // Scroll down slowly to trigger lazy-loaded images
  await page.evaluate(async () => {
    for (let i = 0; i < 5; i++) {
      window.scrollBy(0, window.innerHeight);
      await new Promise(r => setTimeout(r, 500));
    }
    window.scrollTo(0, 0);
  });

  return await page.evaluate(() => {
    // ─── Title parsing ───────────────────────────────────────
    const titleEl = document.querySelector('h1, [class*="listing-title"], [class*="vehicle-title"]');
    const fullTitle = titleEl?.textContent?.trim() || '';

    // Parse "2024 Airstream Flying Cloud 25RB" → year, make, model, trim
    const titleMatch = fullTitle.match(/^(\d{4})\s+(.+)/);
    const year = titleMatch ? parseInt(titleMatch[1]) : 0;
    const restOfTitle = titleMatch ? titleMatch[2] : fullTitle;

    // ─── Price ───────────────────────────────────────────────
    const priceEl = document.querySelector('[class*="price"], [class*="asking"]');
    const priceText = priceEl?.textContent?.trim() || '';
    const priceMatch = priceText.replace(/,/g, '').match(/(\d+)/);
    const price = priceMatch ? parseInt(priceMatch[1]) : 0;

    // ─── Photos ──────────────────────────────────────────────
    const photoUrls = new Set();

    // Try multiple image selector strategies
    const selectors = [
      '[class*="gallery"] img',
      '[class*="photo"] img',
      '[class*="carousel"] img',
      '[class*="slider"] img',
      '[class*="media"] img',
      '.thumbnail img',
      'img[class*="listing"]',
    ];

    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach(img => {
        const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
        if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar')
            && !src.includes('placeholder') && !src.includes('svg')
            && (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png') || src.includes('.webp')
                || src.includes('images') || src.includes('photo'))) {
          // Try to get the full-size version by removing size params
          let fullSrc = src.replace(/\?.*$/, '').replace(/\/s\/\d+\//, '/s/1600/');
          photoUrls.add(fullSrc);
        }
      });
    }

    // Also check all images on page as fallback
    if (photoUrls.size < 3) {
      document.querySelectorAll('img').forEach(img => {
        const src = img.src || img.getAttribute('data-src');
        if (src && img.naturalWidth > 200 && !src.includes('logo') && !src.includes('icon')
            && !src.includes('svg') && !src.includes('avatar')) {
          photoUrls.add(src);
        }
      });
    }

    // ─── Specs ────────────────────────────────────────────────
    const specs = {};
    const specRows = document.querySelectorAll('[class*="spec"] tr, [class*="detail"] tr, [class*="spec"] li, dl dt, [class*="attribute"]');
    specRows.forEach(row => {
      const cells = row.querySelectorAll('td, th, span, dt, dd');
      if (cells.length >= 2) {
        const key = cells[0].textContent?.trim().toLowerCase() || '';
        const val = cells[1].textContent?.trim() || '';
        if (key && val) specs[key] = val;
      }
    });

    // Also try key-value pairs in list format
    document.querySelectorAll('[class*="spec"], [class*="detail"], [class*="feature"]').forEach(el => {
      const text = el.textContent?.trim();
      const kvMatch = text?.match(/^(.+?):\s*(.+)$/);
      if (kvMatch) {
        specs[kvMatch[1].toLowerCase().trim()] = kvMatch[2].trim();
      }
    });

    // ─── Description ─────────────────────────────────────────
    const descEl = document.querySelector('[class*="description"], [class*="comments"], [class*="seller-notes"]');
    const description = descEl?.textContent?.trim() || '';

    // ─── Location ────────────────────────────────────────────
    const locationEl = document.querySelector('[class*="location"], [class*="dealer-address"], [class*="city"]');
    const locationText = locationEl?.textContent?.trim() || '';

    // ─── Dealer ──────────────────────────────────────────────
    const dealerEl = document.querySelector('[class*="dealer-name"], [class*="seller-name"], [class*="dealer"] h2, [class*="dealer"] h3');
    const dealerName = dealerEl?.textContent?.trim() || '';

    const dealerLogoEl = document.querySelector('[class*="dealer"] img[class*="logo"], [class*="dealer-logo"] img');
    const dealerLogo = dealerLogoEl?.src || '';

    // ─── Condition ───────────────────────────────────────────
    const pageText = document.body.textContent?.toLowerCase() || '';
    const condition = pageText.includes('condition: used') || pageText.includes('used ') ? 'used' : 'new';

    // ─── VIN ─────────────────────────────────────────────────
    const vinMatch = pageText.match(/vin[:\s]*([A-HJ-NPR-Z0-9]{17})/i);
    const vin = vinMatch ? vinMatch[1].toUpperCase() : '';

    // ─── Stock number ────────────────────────────────────────
    const stockMatch = pageText.match(/stock\s*#?\s*:?\s*([A-Za-z0-9-]+)/i);
    const stockNumber = stockMatch ? stockMatch[1] : '';

    return {
      title: fullTitle,
      year,
      restOfTitle,
      price,
      photos: [...photoUrls],
      specs,
      description: description.substring(0, 2000),
      location: locationText,
      dealerName,
      dealerLogo,
      condition,
      vin,
      stockNumber,
      url: window.location.href,
    };
  });
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  // Create output directories
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });

  // Load any previous progress (resume support)
  const progress = loadProgress();
  const allListings = progress.listings || [];

  log('Starting RV Trader scraper...');
  log(`Output: ${OUTPUT_DIR}`);
  log(`Resume: ${progress.completedTypes.length} types already done, ${allListings.length} listings collected`);

  const browser = await puppeteer.launch({
    headless: CONFIG.headless,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
    ],
  });

  const page = await browser.newPage();

  // Make the browser look like a real user
  await page.setViewport(CONFIG.viewport);
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // Hide automation indicators
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
  });

  let listingIndex = allListings.length;

  try {
    for (const [rvType, targetCount] of Object.entries(CONFIG.listingsPerType)) {
      if (progress.completedTypes.includes(rvType)) {
        log(`Skipping ${rvType} (already completed)`);
        continue;
      }

      log(`\n${'═'.repeat(50)}`);
      log(`Scraping: ${rvType} (target: ${targetCount} listings)`);
      log(`${'═'.repeat(50)}`);

      let collected = 0;
      let pageNum = 1;
      const detailUrls = [];

      // Phase 1: Collect listing URLs from search pages
      while (collected < targetCount && pageNum <= 5) {
        const searchUrl = getSearchUrl(rvType, pageNum);
        log(`  Search page ${pageNum}: ${searchUrl}`);

        try {
          await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

          // Accept cookies / dismiss popups if present
          const dismissButtons = await page.$$('[class*="close"], [class*="dismiss"], [class*="accept"], button[aria-label="Close"]');
          for (const btn of dismissButtons.slice(0, 2)) {
            try { await btn.click(); } catch {}
          }

          await randomDelay({ min: 1000, max: 2000 });

          const results = await scrapeSearchPage(page);
          log(`  Found ${results.length} listings on page ${pageNum}`);

          if (results.length === 0) {
            // Save page HTML for debugging
            const html = await page.content();
            const debugFile = path.join(OUTPUT_DIR, `debug-${rvType.replace(/\s/g, '-')}-page${pageNum}.html`);
            fs.writeFileSync(debugFile, html);
            log(`  No results found. Saved HTML to ${debugFile} for debugging.`);
            break;
          }

          for (const result of results) {
            if (collected >= targetCount) break;
            if (result.detailUrl && !detailUrls.includes(result.detailUrl)) {
              detailUrls.push(result.detailUrl);
              collected++;
            }
          }

          pageNum++;
          await randomDelay(CONFIG.delays.betweenPages);
        } catch (err) {
          log(`  Error on search page ${pageNum}: ${err.message}`);
          break;
        }
      }

      log(`  Collected ${detailUrls.length} detail URLs for ${rvType}`);

      // Phase 2: Visit each detail page
      for (let i = 0; i < detailUrls.length; i++) {
        const url = detailUrls[i];
        listingIndex++;
        const listingId = `srp-${String(listingIndex).padStart(3, '0')}`;

        log(`  [${i + 1}/${detailUrls.length}] Scraping detail: ${listingId}`);

        try {
          const detail = await scrapeDetailPage(page, url);

          // Phase 3: Download photos for this listing
          const photoDir = path.join(PHOTOS_DIR, listingId);
          fs.mkdirSync(photoDir, { recursive: true });

          const downloadedPhotos = [];
          const photosToDownload = detail.photos.slice(0, CONFIG.maxPhotosPerListing);

          for (let p = 0; p < photosToDownload.length; p++) {
            const photoUrl = photosToDownload[p];
            const ext = photoUrl.match(/\.(jpg|jpeg|png|webp)/i)?.[1] || 'jpg';
            const filename = `photo-${String(p + 1).padStart(2, '0')}.${ext}`;
            const filepath = path.join(photoDir, filename);

            try {
              await downloadImage(photoUrl, filepath);
              downloadedPhotos.push({
                url: `/images/scraped/${listingId}/${filename}`,
                originalUrl: photoUrl,
                alt: `${detail.title} photo ${p + 1}`,
              });
              log(`    Photo ${p + 1}/${photosToDownload.length} downloaded`);
            } catch (err) {
              log(`    Photo ${p + 1} failed: ${err.message}`);
            }

            await randomDelay(CONFIG.delays.betweenPhotos);
          }

          // Determine RV type from the category we're scraping
          const rvTypeMap = {
            'Travel Trailer': 'travel-trailer',
            'Fifth Wheel': 'fifth-wheel',
            'Class A': 'class-a',
            'Class B': 'class-b',
            'Class C': 'class-c',
            'Toy Hauler': 'toy-hauler',
            'Pop-Up Camper': 'pop-up',
          };

          // Parse location
          const locMatch = detail.location.match(/([^,]+),\s*(\w{2})/);
          const city = locMatch?.[1]?.trim() || '';
          const state = locMatch?.[2]?.trim() || '';

          // Parse make/model from rest of title
          const titleParts = detail.restOfTitle?.split(/\s+/) || [];
          const make = titleParts[0] || '';
          const modelAndTrim = titleParts.slice(1).join(' ');

          const listing = {
            id: listingId,
            sourceUrl: url,
            title: detail.title,
            year: detail.year,
            make,
            modelAndTrim,
            rvType: rvTypeMap[rvType] || 'travel-trailer',
            condition: detail.condition,
            price: detail.price,
            photos: downloadedPhotos,
            photoCount: downloadedPhotos.length,
            specs: detail.specs,
            description: detail.description,
            location: { city, state },
            dealerName: detail.dealerName,
            dealerLogo: detail.dealerLogo,
            vin: detail.vin,
            stockNumber: detail.stockNumber,
            scrapedAt: new Date().toISOString(),
          };

          allListings.push(listing);

          // Save progress after each listing
          saveProgress({ ...progress, listings: allListings });

          log(`    ✓ ${detail.title} — $${detail.price?.toLocaleString()} — ${downloadedPhotos.length} photos`);

        } catch (err) {
          log(`    ✗ Failed: ${err.message}`);
        }

        // Staggered delay between listings
        await randomDelay(CONFIG.delays.betweenListings);
      }

      // Mark this type as completed
      progress.completedTypes.push(rvType);
      saveProgress({ ...progress, listings: allListings });

      log(`\n✓ ${rvType} complete: ${detailUrls.length} listings scraped`);

      // Longer pause between RV type categories
      await randomDelay(CONFIG.delays.afterType);
    }

  } catch (err) {
    log(`\nFatal error: ${err.message}`);
    log('Progress saved. Re-run to resume.');
  } finally {
    await browser.close();
  }

  // Save final output
  fs.writeFileSync(LISTINGS_FILE, JSON.stringify(allListings, null, 2));

  log(`\n${'═'.repeat(50)}`);
  log(`SCRAPING COMPLETE`);
  log(`${'═'.repeat(50)}`);
  log(`Total listings: ${allListings.length}`);
  log(`Total photos: ${allListings.reduce((sum, l) => sum + l.photoCount, 0)}`);
  log(`Output: ${LISTINGS_FILE}`);
  log(`Photos: ${PHOTOS_DIR}`);
  log(`\nNext step: node scripts/transform-listings.mjs`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
