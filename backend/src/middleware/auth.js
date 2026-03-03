export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.slice(7);

  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  next();
}
