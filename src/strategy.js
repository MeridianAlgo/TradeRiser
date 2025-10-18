/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    🎯 YOUR TRADING STRATEGY - CUSTOMIZE HERE! 🎯
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * STRATEGY: MA Crossover Entry + Take Profit/Stop Loss Exit
 * 
 * BUY SIGNAL:  When Short MA crosses above Long MA (bullish trend)
 * SELL SIGNAL: When Take Profit OR Stop Loss is hit
 * 
 * ⚠️ ONE POSITION AT A TIME: Bot will only hold one position per symbol
 * 
 * HOW IT WORKS:
 * 1. Bot waits for MA crossover (Short MA > Long MA)
 * 2. When crossover happens AND no position → BUY
 * 3. After buying, monitors position for TP or SL
 * 4. When TP or SL is hit → SELL
 * 5. Repeat!
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

class Strategy {
  constructor() {
    // ═══════════════════════════════════════════════════════════════════════
    // 📝 STRATEGY NAME
    // ═══════════════════════════════════════════════════════════════════════
    this.name = 'MA Crossover + TP/SL Strategy (One Position)';

    // ═══════════════════════════════════════════════════════════════════════
    // ⚙️ STRATEGY PARAMETERS - CUSTOMIZE THESE!
    // ═══════════════════════════════════════════════════════════════════════

    // Moving Average Settings (for BUY signals):
    this.shortWindow = 10;  // Short-term MA (10 minutes)
    this.longWindow = 30;   // Long-term MA (30 minutes)

    // ═══════════════════════════════════════════════════════════════════════
    // 🎯 TAKE PROFIT & STOP LOSS (for SELL signals)
    // ═══════════════════════════════════════════════════════════════════════
    this.takeProfitPercent = 3.0;   // Take profit at 3% gain
    this.stopLossPercent = 1.5;     // Stop loss at 1.5% loss

    // ═══════════════════════════════════════════════════════════════════════
    // 📊 ADDITIONAL INDICATORS (Optional - set to true to enable)
    // ═══════════════════════════════════════════════════════════════════════

    // RSI Filter (prevents buying when overbought)
    this.useRSI = false;            // Set to true to enable RSI filter
    this.rsiPeriod = 14;            // RSI calculation period
    this.rsiOversold = 30;          // Buy only if RSI < 70 (not overbought)
    this.rsiOverbought = 70;        // Don't buy if RSI > 70

    // Volume Filter (only buy on high volume)
    this.useVolume = false;         // Set to true to enable volume filter
    this.volumeMultiplier = 1.5;    // Volume must be 1.5x average

    // EMA Filter (use EMA instead of SMA)
    this.useEMA = false;            // Set to true to use EMA instead of SMA

    // Position Size Settings:
    this.positionSizePercent = 0.1;  // Use 10% of buying power per trade

    // ═══════════════════════════════════════════════════════════════════════
    // 🛡️ POSITION TRACKING (Prevents multiple buys)
    // ═══════════════════════════════════════════════════════════════════════
    this.hasPosition = {};          // Track if we have a position per symbol
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════
   * 🧠 MAIN STRATEGY LOGIC
   * ═══════════════════════════════════════════════════════════════════════════
   */
  async analyze(data) {
    try {
      const { symbol, currentPrice, position, bars } = data;

      // ═══════════════════════════════════════════════════════════════════
      // 🛡️ SAFETY CHECK: Make sure we have enough data
      // ═══════════════════════════════════════════════════════════════════
      if (!bars || bars.length < this.longWindow) {
        console.log(`   ⚠️  Not enough data for ${symbol} (need ${this.longWindow} bars, have ${bars?.length || 0})`);
        return 'HOLD';
      }

      // ═══════════════════════════════════════════════════════════════════
      // 📊 GET PRICE DATA
      // ═══════════════════════════════════════════════════════════════════
      const prices = bars.map(bar => parseFloat(bar.c));

      if (prices.some(p => isNaN(p) || p <= 0)) {
        console.log(`   ⚠️  Invalid price data for ${symbol}`);
        return 'HOLD';
      }

      // ═══════════════════════════════════════════════════════════════════
      // 📈 CALCULATE MOVING AVERAGES
      // ═══════════════════════════════════════════════════════════════════
      const shortMA = this.useEMA
        ? this.calculateEMA(prices, this.shortWindow)
        : this.calculateSMA(prices, this.shortWindow);
      const longMA = this.useEMA
        ? this.calculateEMA(prices, this.longWindow)
        : this.calculateSMA(prices, this.longWindow);

      // ═══════════════════════════════════════════════════════════════════
      // 🎯 TRADING LOGIC
      // ═══════════════════════════════════════════════════════════════════

      // ┌─────────────────────────────────────────────────────────────────┐
      // │ 🔴 PRIORITY 1: Check TP/SL if we have a position                │
      // └─────────────────────────────────────────────────────────────────┘
      if (position) {
        // Mark that we have a position
        this.hasPosition[symbol] = true;

        const entryPrice = parseFloat(position.avg_entry_price);
        const profitLossPercent = this.getPriceChange(entryPrice, currentPrice);

        console.log(`   ${symbol} - Entry: $${entryPrice.toFixed(2)} | Current: $${currentPrice.toFixed(2)} | P/L: ${profitLossPercent.toFixed(2)}%`);
        console.log(`   📊 TP Target: +${this.takeProfitPercent}% | SL Target: -${this.stopLossPercent}%`);

        // ✅ Take Profit Hit
        if (profitLossPercent >= this.takeProfitPercent) {
          console.log(`   🎯 SELL: Take Profit hit at +${profitLossPercent.toFixed(2)}% gain! 💰`);
          this.hasPosition[symbol] = false; // Clear position flag
          return 'SELL';
        }

        // ❌ Stop Loss Hit
        if (profitLossPercent <= -this.stopLossPercent) {
          console.log(`   🛑 SELL: Stop Loss hit at ${profitLossPercent.toFixed(2)}% loss!`);
          this.hasPosition[symbol] = false; // Clear position flag
          return 'SELL';
        }

        // Position open, waiting for TP or SL
        console.log(`   ⏳ Holding position (waiting for TP or SL to trigger)`);
        return 'HOLD';
      } else {
        // No position from broker, clear our flag
        this.hasPosition[symbol] = false;
      }

      // ┌─────────────────────────────────────────────────────────────────┐
      // │ 🛑 PREVENT MULTIPLE BUYS: Check if we already have a position   │
      // └─────────────────────────────────────────────────────────────────┘
      if (this.hasPosition[symbol]) {
        console.log(`   ⏳ Already have a position in ${symbol}, waiting for exit...`);
        return 'HOLD';
      }

      // ┌─────────────────────────────────────────────────────────────────┐
      // │ 🟢 PRIORITY 2: Look for MA Crossover BUY signal                 │
      // └─────────────────────────────────────────────────────────────────┘

      // Calculate additional indicators if enabled
      let rsi = 50;
      let volumeOk = true;

      if (this.useRSI) {
        rsi = this.calculateRSI(prices, this.rsiPeriod);
      }

      if (this.useVolume) {
        const volumes = bars.map(bar => parseFloat(bar.v));
        const avgVolume = this.calculateSMA(volumes, 20);
        const currentVolume = volumes[volumes.length - 1];
        volumeOk = currentVolume > (avgVolume * this.volumeMultiplier);
      }

      const maType = this.useEMA ? 'EMA' : 'SMA';
      console.log(`   ${symbol} - Price: $${currentPrice.toFixed(2)} | Short ${maType}: $${shortMA.toFixed(2)} | Long ${maType}: $${longMA.toFixed(2)}`);

      if (this.useRSI) {
        console.log(`   📊 RSI: ${rsi.toFixed(2)} ${rsi > this.rsiOverbought ? '(Overbought)' : rsi < this.rsiOversold ? '(Oversold)' : ''}`);
      }

      // BUY when Short MA > Long MA (bullish crossover)
      if (shortMA > longMA) {
        // Check RSI filter if enabled
        if (this.useRSI && rsi > this.rsiOverbought) {
          console.log(`   ⚠️  MA Crossover detected but RSI is overbought (${rsi.toFixed(2)} > ${this.rsiOverbought}) - Skipping`);
          return 'HOLD';
        }

        // Check volume filter if enabled
        if (this.useVolume && !volumeOk) {
          console.log(`   ⚠️  MA Crossover detected but volume is too low - Skipping`);
          return 'HOLD';
        }

        console.log(`   🔔 BUY SIGNAL: MA Crossover detected! 📈`);
        console.log(`   📊 Short ${maType} ($${shortMA.toFixed(2)}) > Long ${maType} ($${longMA.toFixed(2)})`);
        console.log(`   🎯 Will exit at TP: +${this.takeProfitPercent}% OR SL: -${this.stopLossPercent}%`);

        // Mark that we're entering a position
        this.hasPosition[symbol] = true;
        return 'BUY';
      }

      // No position and no crossover
      console.log(`   ⏳ Waiting for MA crossover signal (Short ${maType} needs to cross above Long ${maType})...`);
      return 'HOLD';

    } catch (error) {
      console.error(`❌ Strategy analysis error:`, error.message);
      return 'HOLD';
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 🧮 HELPER FUNCTIONS - Available Indicators
  // ═══════════════════════════════════════════════════════════════════════════

  calculateSMA(prices, window) {
    const slice = prices.slice(-window);
    const sum = slice.reduce((a, b) => a + b, 0);
    return sum / slice.length;
  }

  calculateEMA(prices, window) {
    const k = 2 / (window + 1);
    let ema = prices[0];
    for (let i = 1; i < prices.length; i++) {
      ema = prices[i] * k + ema * (1 - k);
    }
    return ema;
  }

  calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return 50;
    let gains = 0;
    let losses = 0;
    for (let i = prices.length - period; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }
    const avgGain = gains / period;
    const avgLoss = losses / period;
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  calculateMACD(prices) {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    const macdLine = ema12 - ema26;
    return { macdLine, ema12, ema26 };
  }

  calculateBollingerBands(prices, period = 20, stdDev = 2) {
    const sma = this.calculateSMA(prices, period);
    const slice = prices.slice(-period);
    const squaredDiffs = slice.map(price => Math.pow(price - sma, 2));
    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;
    const standardDeviation = Math.sqrt(variance);

    return {
      upper: sma + (standardDeviation * stdDev),
      middle: sma,
      lower: sma - (standardDeviation * stdDev)
    };
  }

  calculateATR(bars, period = 14) {
    if (bars.length < period + 1) return 0;
    const trueRanges = [];
    for (let i = 1; i < bars.length; i++) {
      const high = parseFloat(bars[i].h);
      const low = parseFloat(bars[i].l);
      const prevClose = parseFloat(bars[i - 1].c);
      const tr = Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose));
      trueRanges.push(tr);
    }
    return this.calculateSMA(trueRanges, period);
  }

  getPriceChange(oldPrice, newPrice) {
    return ((newPrice - oldPrice) / oldPrice) * 100;
  }

  isPriceAboveMA(currentPrice, prices, window) {
    const ma = this.calculateSMA(prices, window);
    return currentPrice > ma;
  }

  calculatePositionSize(price, portfolio) {
    return portfolio.calculatePositionSize(price, this.positionSizePercent);
  }
}

export default Strategy;
