import Broker from './broker.js';
import Portfolio from './portfolio.js';
import Strategy from './strategy.js';
import { config, globals } from './config.js';
class TradingBot {
  constructor() {
    this.broker = new Broker();
    this.portfolio = new Portfolio(this.broker);
    this.strategy = new Strategy();
    this.isRunning = false;
    this.initializationCount = 0;
  }
  async initialize() {
    try {
      console.log('═══════════════════════════════════════════════════════════════');
      console.log(' TradeRiser v1.3.0 - Initializing Trading Bot...');
      console.log('═══════════════════════════════════════════════════════════════');
      console.log(` Strategy: ${this.strategy.name}`);
      console.log(` Mode: ${config.alpaca.paper ? 'PAPER TRADING' : 'LIVE TRADING'}`);
      console.log(` Trading Symbol: ${config.trading.symbol}`);
      console.log(`  Check Interval: ${config.trading.checkInterval / 1000} seconds`);
      console.log(` Initialization Period: ${config.trading.initializationPeriod} checks`);
      console.log('═══════════════════════════════════════════════════════════════\n');
      await this.portfolio.update();
      this.portfolio.displayStatus();
      console.log('\n Bot initialized successfully');
      console.log(` Starting initialization period (collecting ${config.trading.initializationPeriod} data points)...\n`);
    } catch (error) {
      console.error(' Initialization failed:', error.message);
      throw error;
    }
  }
  async executeStrategy(symbol) {
    try {
      // Gather market data
      const latestPrice = await this.broker.getLatestPrice(symbol);
      if (!latestPrice || !latestPrice.p) {
        console.log(`     No price data available for ${symbol}`);
        return;
      }
      const currentPrice = parseFloat(latestPrice.p);
      const position = await this.portfolio.getPosition(symbol);
      const bars = await this.broker.getBars(symbol, config.trading.dataTimeframe, config.trading.dataLimit);
      if (!bars) {
        console.log(`     No bar data available for ${symbol}`);
        return;
      }
      // Convert bars to array format (bars are already in array format from our broker)
      const barsArray = Array.isArray(bars) ? bars : Array.from(bars).map(([timestamp, bar]) => ({
        t: timestamp,
        o: bar.o,
        h: bar.h,
        l: bar.l,
        c: bar.c,
        v: bar.v
      }));
      if (barsArray.length === 0) {
        console.log(`     Insufficient bar data for ${symbol}`);
        return;
      }
      // Update global variables
      globals.currentPrice = currentPrice;
      globals.currentBars = barsArray;
      globals.currentPosition = position;
      // Run strategy analysis
      const signal = await this.strategy.analyze({
        symbol,
        currentPrice,
        position,
        bars: barsArray,
        portfolio: this.portfolio
      });
      // Only execute trades if initialization is complete
      if (!globals.isInitialized) {
        // During initialization, just collect data
        return;
      }
      // Execute trades based on signal
      if (signal === 'BUY') {
        const qty = this.strategy.calculatePositionSize(currentPrice, this.portfolio);
        if (qty > 0) {
          await this.broker.buy(symbol, qty);
        } else {
          console.log(`     Insufficient funds to buy ${symbol}`);
        }
      } else if (signal === 'SELL' && position) {
        const qty = Math.abs(parseFloat(position.qty));
        await this.broker.sell(symbol, qty);
      }
    } catch (error) {
      console.error(` Error executing strategy for ${symbol}:`, error.message);
    }
  }
  async run() {
    this.isRunning = true;
    console.log(' Trading bot started!\n');
    while (this.isRunning) {
      try {
        console.log(`\n ${new Date().toLocaleString()} - Check #${this.initializationCount + 1}`);
        // Update portfolio
        await this.portfolio.update();
        // Single symbol trading
        const symbol = config.trading.symbol;
        // Check initialization status
        if (!globals.isInitialized) {
          this.initializationCount++;
          console.log(` Initialization: ${this.initializationCount}/${config.trading.initializationPeriod} - Collecting data...`);
          // Execute strategy (will collect data but not trade)
          await this.executeStrategy(symbol);
          // Check if initialization complete
          if (this.initializationCount >= config.trading.initializationPeriod) {
            globals.isInitialized = true;
            globals.initializationCount = this.initializationCount;
            console.log('\n═══════════════════════════════════════════════════════════════');
            console.log(' INITIALIZATION COMPLETE - Bot is now ready to trade!');
            console.log('═══════════════════════════════════════════════════════════════\n');
          }
        } else {
          // Normal trading mode
          await this.executeStrategy(symbol);
        }
        // Wait for next interval
        await this.sleep(config.trading.checkInterval);
      } catch (error) {
        console.error(' Error in main loop:', error.message);
        console.log(' Waiting 30 seconds before retry...');
        await this.sleep(30000);
      }
    }
  }
  stop() {
    console.log('\n Stopping trading bot...');
    this.isRunning = false;
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
// Start the bot
const bot = new TradingBot();
// Handle graceful shutdown
process.on('SIGINT', () => {
  bot.stop();
  process.exit(0);
});
// Run the bot
bot.initialize().then(() => {
  bot.run();
}).catch(error => {
  console.error(' Failed to start bot:', error);
  process.exit(1);
});
