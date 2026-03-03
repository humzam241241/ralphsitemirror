const APPROX_CHARS_PER_TOKEN = 4;

export function chunkText(text, maxChunkSize = 600) {
  const maxChars = maxChunkSize * APPROX_CHARS_PER_TOKEN;

  if (!text || text.length === 0) return [];
  if (text.length <= maxChars) return [text.trim()];

  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const chunks = [];
  let current = '';

  for (const paragraph of paragraphs) {
    if (current.length + paragraph.length + 1 <= maxChars) {
      current += (current ? '\n\n' : '') + paragraph.trim();
    } else {
      if (current) chunks.push(current.trim());

      if (paragraph.length <= maxChars) {
        current = paragraph.trim();
      } else {
        const sentences = splitIntoSentences(paragraph);
        current = '';
        for (const sentence of sentences) {
          if (current.length + sentence.length + 1 <= maxChars) {
            current += (current ? ' ' : '') + sentence.trim();
          } else {
            if (current) chunks.push(current.trim());

            if (sentence.length <= maxChars) {
              current = sentence.trim();
            } else {
              const hardChunks = hardSplit(sentence, maxChars);
              chunks.push(...hardChunks.slice(0, -1));
              current = hardChunks[hardChunks.length - 1] || '';
            }
          }
        }
      }
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.filter((c) => c.length > 20);
}

function splitIntoSentences(text) {
  const raw = text.match(/[^.!?]+[.!?]+\s*/g);
  if (raw && raw.length > 1) return raw;
  return [text];
}

function hardSplit(text, maxChars) {
  const parts = [];
  for (let i = 0; i < text.length; i += maxChars) {
    parts.push(text.substring(i, i + maxChars).trim());
  }
  return parts.filter((p) => p.length > 0);
}
