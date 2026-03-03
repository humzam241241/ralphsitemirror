import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool, { query } from '../config/database.js';
import { requireAdmin } from '../middleware/auth.js';
import { crawlSite } from '../services/crawler.js';
import { chunkText } from '../services/chunker.js';
import { embedBatch, toPgVector } from '../services/embeddings.js';

const router = Router();
const ingestLocks = new Map();
const MAX_CHUNKS_PER_SITE = 500;

router.post('/:site_id', requireAdmin, async (req, res) => {
  const { site_id } = req.params;

  if (ingestLocks.get(site_id)) {
    return res.status(409).json({ error: 'Ingestion already in progress for this site' });
  }

  ingestLocks.set(site_id, true);

  try {
    const siteResult = await query('SELECT domain FROM sites WHERE id = $1', [site_id]);
    if (siteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const domain = siteResult.rows[0].domain;
    console.log(`Starting ingestion for site ${site_id} (${domain})`);

    const pages = await crawlSite(domain);
    console.log(`Crawled ${pages.length} pages`);

    let allChunks = [];
    for (const page of pages) {
      const chunks = chunkText(page.content);
      for (const chunk of chunks) {
        allChunks.push({ url: page.url, content: chunk });
      }
    }

    if (allChunks.length > MAX_CHUNKS_PER_SITE) {
      allChunks = allChunks.slice(0, MAX_CHUNKS_PER_SITE);
    }

    console.log(`Generated ${allChunks.length} chunks, computing embeddings...`);

    const texts = allChunks.map((c) => c.content);
    const embeddings = await embedBatch(texts);

    await query('DELETE FROM documents WHERE site_id = $1', [site_id]);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (let i = 0; i < allChunks.length; i++) {
        const id = uuidv4();
        const vectorStr = toPgVector(embeddings[i]);
        await client.query(
          'INSERT INTO documents (id, site_id, url, content, embedding) VALUES ($1, $2, $3, $4, $5::vector)',
          [id, site_id, allChunks[i].url, allChunks[i].content, vectorStr]
        );
      }

      await client.query('COMMIT');
    } catch (txErr) {
      await client.query('ROLLBACK');
      throw txErr;
    } finally {
      client.release();
    }

    console.log(`Ingestion complete: ${pages.length} pages, ${allChunks.length} chunks`);

    res.json({
      pages_crawled: pages.length,
      chunks_stored: allChunks.length,
    });
  } catch (err) {
    console.error('Ingestion error:', err);
    res.status(500).json({ error: 'Ingestion failed', details: err.message });
  } finally {
    ingestLocks.delete(site_id);
  }
});

export default router;
