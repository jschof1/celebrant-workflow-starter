#!/usr/bin/env node
/**
 * Converts a brochure HTML file to a print-ready PDF using Puppeteer.
 *
 * Usage:
 *   node print-to-pdf.js <input.html> [output.pdf]
 *
 * If output path is omitted, writes to the same directory as the input
 * with a .pdf extension (e.g. brochure-fiona.html → brochure-fiona.pdf).
 */

import puppeteer from 'puppeteer';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node print-to-pdf.js <input.html> [output.pdf]');
  process.exit(1);
}

const htmlPath = path.resolve(args[0]);
const pdfPath = args[1]
  ? path.resolve(args[1])
  : htmlPath.replace(/\.html?$/i, '.pdf');

if (!fs.existsSync(htmlPath)) {
  console.error(`Input file not found: ${htmlPath}`);
  process.exit(1);
}

const htmlUrl = pathToFileURL(htmlPath).href;

async function main() {
  console.log(`Converting: ${htmlPath}`);
  console.log(`Output:     ${pdfPath}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    await page.goto(htmlUrl, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000,
    });

    // Wait for QR code to render (canvas or img element inside #qrcode)
    await page.waitForFunction(
      () => {
        const qr = document.getElementById('qrcode');
        return qr && (qr.querySelector('canvas') || qr.querySelector('img'));
      },
      { timeout: 5000 }
    ).catch(() => {
      console.warn('QR code did not render within timeout — continuing anyway');
    });

    // Wait for web fonts
    await page.evaluate(() => document.fonts?.ready);
    await new Promise((r) => setTimeout(r, 500));

    // Wait for Lucide icons if used
    await page.evaluate(() => {
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    }).catch(() => {});

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });

    console.log(`PDF written: ${pdfPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
