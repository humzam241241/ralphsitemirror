import axios from 'axios';
import * as cheerio from 'cheerio';

const MAX_PAGES = 20;
const MAX_HTML_SIZE = 500 * 1024;
const MAX_TEXT_LENGTH = 10000;
const REQUEST_TIMEOUT = 10000;
const CRAWL_DELAY = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractText($) {
  $('script, style, nav, footer, header, noscript, iframe, svg').remove();
  let text = $('body').text();
  text = text.replace(/\s+/g, ' ').trim();
  return text.substring(0, MAX_TEXT_LENGTH);
}

function isSameDomain(url, domain) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    return host === domain.replace(/^www\./, '');
  } catch {
    return false;
  }
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.search = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return null;
  }
}

export async function crawlSite(domain, maxPages = MAX_PAGES) {
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  const startUrl = `https://${cleanDomain}`;
  const visited = new Set();
  const queue = [startUrl];
  const results = [];

  while (queue.length > 0 && results.length < maxPages) {
    const url = queue.shift();
    const normalized = normalizeUrl(url);

    if (!normalized || visited.has(normalized)) continue;
    if (!isSameDomain(normalized, cleanDomain)) continue;

    visited.add(normalized);

    try {
      const response = await axios.get(normalized, {
        timeout: REQUEST_TIMEOUT,
        maxContentLength: MAX_HTML_SIZE,
        headers: {
          'User-Agent': 'RalphBot/1.0 (site indexer)',
          Accept: 'text/html',
        },
        validateStatus: (status) => status < 400,
      });

      const contentType = response.headers['content-type'] || '';
      if (!contentType.includes('text/html')) continue;

      const $ = cheerio.load(response.data);
      const title = $('title').text().trim() || normalized;
      const content = extractText($);

      if (content.length > 50) {
        results.push({ url: normalized, title, content });
      }

      $('a[href]').each((_i, el) => {
        const href = $(el).attr('href');
        if (!href) return;
        try {
          const absolute = new URL(href, normalized).toString();
          const norm = normalizeUrl(absolute);
          if (norm && !visited.has(norm) && isSameDomain(norm, cleanDomain)) {
            queue.push(norm);
          }
        } catch {
          // skip malformed URLs
        }
      });

      await sleep(CRAWL_DELAY);
    } catch (err) {
      console.warn(`Crawl failed for ${normalized}:`, err.message);
    }
  }

  console.log(`Crawled ${results.length} pages from ${cleanDomain}`);
  return results;
}
