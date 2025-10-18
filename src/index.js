import Broker from './broker.js';
import Portfolio from './portfolio.js';
import Strategy from './strategy.js';
import { config } from './config.js';

class TradingBot {
  constructor() {
    this.broker = new Broker();
    this.portfolio = new Portfolio(this.broker);
    this.strategy = new Strategy();
    this.isRunning = false;
  }

  async initialize() {
    try {
      console.log('🤖 Initializing Trading Bot...');
      console.log(`📝 Strategy: ${this.strategy.name}`);
      console.log(`🔧 Mode: ${config.alpaca.paper ? 'PAPER TRADING' : 'LIVE TRADING'}`);
      
      await this.portfolio.update();
      this.portfolio.displayStatus();
      
      console.log(`📈 Watching symbols: ${config.trading.symbols.join(', ')}`);
      console.log('✅ Bot initialized successfully\n');
    } catch (error) {
      console.error('❌ Initialization failed:', error.message);
      throw error;
    }
  }

  async executeStrategy(symbol) {
    try {
      // Gather market data
      const latestPrice = await this.broker.getLatestPrice(symbol);
      if (!latestPrice || !latestPrice.p) {
        console.log(`   ⚠️  No price data available for ${symbol}`);
        return;
      }

      const currentPrice = parseFloat(latestPrice.p);
      const position = await this.portfolio.getPosition(symbol);
      const bars = await this.broker.getBars(symbol, '1Min', 100);
      
      if (!bars) {
        console.log(`   ⚠️  No bar data available for ${symbol}`);
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
        console.log(`   ⚠️  Insufficient bar data for ${symbol}`);
        return;
      }

      // Run strategy analysis
      const signal = await this.strategy.analyze({
        symbol,
        currentPrice,
        position,
        bars: barsArray,
        portfolio: this.portfolio
      });

      // Execute trades based on signal
      if (signal === 'BUY') {
        const qty = this.strategy.calculatePositionSize(currentPrice, this.portfolio);
        if (qty > 0) {
          await this.broker.buy(symbol, qty);
        } else {
          console.log(`   ⚠️  Insufficient funds to buy ${symbol}`);
        }
      } else if (signal === 'SELL' && position) {
        const qty = Math.abs(parseFloat(position.qty));
        await this.broker.sell(symbol, qty);
      }

    } catch (error) {
      console.error(`❌ Error executing strategy for ${symbol}:`, error.message);
    }
  }

  async run() {
    this.isRunning = true;
    console.log('🚀 Trading bot started!\n');

    while (this.isRunning) {
      try {
        console.log(`\n⏰ ${new Date().toLocaleString()} - Checking markets...`);
        
        await this.portfolio.update();

        for (const symbol of config.trading.symbols) {
          await this.executeStrategy(symbol);
        }

        // Wait for next interval
        await this.sleep(config.trading.checkInterval);
      } catch (error) {
        console.error('❌ Error in main loop:', error.message);
        console.log('⏳ Waiting 30 seconds before retry...');
        await this.sleep(30000);
      }
    }
  }

  stop() {
    console.log('\n🛑 Stopping trading bot...');
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
  console.error('❌ Failed to start bot:', error);
  process.exit(1);
});
