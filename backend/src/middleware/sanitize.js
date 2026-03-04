import validator from 'validator';

export function sanitizeLeadInput(req, res, next) {
  if (req.body.name) {
    req.body.name = validator.escape(req.body.name.trim());
  }
  
  if (req.body.email) {
    req.body.email = validator.normalizeEmail(req.body.email);
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
  }
  
  if (req.body.phone) {
    req.body.phone = validator.escape(req.body.phone.trim());
  }
  
  if (req.body.message) {
    req.body.message = validator.escape(req.body.message.trim());
    if (req.body.message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long (max 5000 characters)' });
    }
  }
  
  if (req.body.user_message) {
    req.body.user_message = validator.escape(req.body.user_message.trim());
    if (req.body.user_message.length > 2000) {
      return res.status(400).json({ error: 'Message is too long (max 2000 characters)' });
    }
  }
  
  next();
}

export function sanitizeContactInput(req, res, next) {
  if (req.body.name) {
    req.body.name = validator.escape(req.body.name.trim());
  }
  
  if (req.body.email) {
    req.body.email = validator.normalizeEmail(req.body.email);
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
  }
  
  if (req.body.phone) {
    req.body.phone = validator.escape(req.body.phone.trim());
  }
  
  if (req.body.service) {
    req.body.service = validator.escape(req.body.service.trim());
  }
  
  if (req.body.message) {
    req.body.message = validator.escape(req.body.message.trim());
    if (req.body.message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long (max 5000 characters)' });
    }
  }
  
  next();
}
