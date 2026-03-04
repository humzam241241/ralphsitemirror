import rateLimit from 'express-rate-limit';

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many chat requests, please slow down.' },
  keyGenerator: (req) => req.ip,
});

export const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact form submissions. Please try again later.' },
  keyGenerator: (req) => req.ip,
});

export const leadSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many lead submissions. Please try again later.' },
  keyGenerator: (req) => req.ip,
});
