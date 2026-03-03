import pg from 'pg';

const { Pool } = pg;

function buildConnectionConfig() {
  let connectionString = process.env.DATABASE_URL;

  if (connectionString) {
    const url = new URL(connectionString);
    url.searchParams.delete('pgbouncer');
    connectionString = url.toString();
  }

  return {
    connectionString,
    max: 5,
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
}

const pool = new Pool(buildConnectionConfig());

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

export async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV !== 'production') {
    console.log('DB query', { text: text.substring(0, 80), duration, rows: result.rowCount });
  }
  return result;
}

export default pool;
