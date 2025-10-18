import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root (one level up from src/)
dotenv.config({ path: join(__dirname, '..', '.env') });

export const config = {
  alpaca: {
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_API_SECRET,
    paper: process.env.ALPACA_PAPER === 'true',
    baseUrl: process.env.ALPACA_PAPER === 'true' 
      ? 'https://paper-api.alpaca.markets'
      : 'https://api.alpaca.markets'
  },
  trading: {
    checkInterval: 60000, // Check every 60 seconds
    symbols: ['BTC/USD', 'ETH/USD'], // Default crypto symbols
  }
};
