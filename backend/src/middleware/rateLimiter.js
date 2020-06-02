import rateLimit from "express-rate-limit";

// Enable when behind a reverse proxy
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5000,
});

export default limiter;
