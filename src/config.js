import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load .env from project root (one level up from src/)
dotenv.config({ path: join(__dirname, '..', '.env') });
// ═══════════════════════════════════════════════════════════════════════════
//  GLOBAL CONFIGURATION - CUSTOMIZE YOUR BOT HERE
// ═══════════════════════════════════════════════════════════════════════════
export const config = {
  // ═══════════════════════════════════════════════════════════════════════
  //  ALPACA API SETTINGS
  // ═══════════════════════════════════════════════════════════════════════
  alpaca: {
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_API_SECRET,
    paper: process.env.ALPACA_PAPER === 'true',
    baseUrl: process.env.ALPACA_PAPER === 'true'
      ? 'https://paper-api.alpaca.markets'
      : 'https://api.alpaca.markets'
  },
  // ═══════════════════════════════════════════════════════════════════════
  //  TRADING SETTINGS
  // ═══════════════════════════════════════════════════════════════════════
  trading: {
    //  SINGLE SYMBOL TRADING (Change this to trade different assets!)
    // Examples: 'BTC/USD', 'ETH/USD', 'LTC/USD', 'DOGE/USD', 'SOL/USD'
    symbol: process.env.TRADING_SYMBOL || 'BTC/USD',
    //  CHECK INTERVAL - How often to check for signals (milliseconds)
    checkInterval: 60000, // 60 seconds = 1 minute
    //  INITIALIZATION PERIOD - Collect data before trading
    // Bot will collect this many data points before starting to trade
    // This ensures accurate MA crossover detection
    initializationPeriod: 2, // Number of checks (2 checks = 2 minutes with 60s interval)
    //  DATA SETTINGS
    dataTimeframe: '1Min',  // Bar timeframe (1Min, 5Min, 15Min, 1Hour, 1Day)
    dataLimit: 100          // Number of historical bars to fetch
  }
};
// ═══════════════════════════════════════════════════════════════════════════
//  GLOBAL VARIABLES - Access these anywhere in your strategy
// ═══════════════════════════════════════════════════════════════════════════
export const globals = {
  // Current market data (updated every check)
  currentPrice: 0,
  currentBars: [],
  currentPosition: null,
  // Initialization tracking
  initializationCount: 0,
  isInitialized: false,
  // Real-time data (for WebSocket implementations)
  realtimePrice: 0,
  realtimeTrades: [],
  realtimeQuotes: [],
  // Helper function to get latest price
  getLatestPrice() {
    return this.realtimePrice || this.currentPrice;
  },
  // Helper function to check if initialized
  isReady() {
    return this.isInitialized;
  }
};
