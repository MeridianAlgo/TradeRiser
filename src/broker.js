import Alpaca from '@alpacahq/alpaca-trade-api';
import { config } from './config.js';
class Broker {
  constructor() {
    if (!config.alpaca.keyId || !config.alpaca.secretKey) {
      throw new Error('Alpaca API credentials not found. Please check your .env file');
    }
    this.alpaca = new Alpaca({
      keyId: config.alpaca.keyId,
      secretKey: config.alpaca.secretKey,
      paper: config.alpaca.paper,
      baseUrl: config.alpaca.baseUrl
    });
  }
  async getAccount() {
    try {
      return await this.alpaca.getAccount();
    } catch (error) {
      throw new Error(`Failed to get account: ${error.message}`);
    }
  }
  async getPosition(symbol) {
    try {
      return await this.alpaca.getPosition(symbol);
    } catch (error) {
      if (error.message.includes('position does not exist')) {
        return null;
      }
      throw error;
    }
  }
  async getLatestPrice(symbol) {
    try {
      // Get the latest trade from crypto bars
      const end = new Date();
      const start = new Date(end.getTime() - (5 * 60 * 1000)); // Last 5 minutes
      const resp = await this.alpaca.getCryptoBars(
        [symbol],
        {
          start: start.toISOString(),
          end: end.toISOString(),
          timeframe: '1Min'
        }
      );
      const bars = resp.get(symbol);
      if (!bars || bars.length === 0) {
        throw new Error('No recent price data available');
      }
      const latestBar = bars[bars.length - 1];
      return { p: parseFloat(latestBar.Close) };
    } catch (error) {
      throw new Error(`Failed to get price for ${symbol}: ${error.message}`);
    }
  }
  async buy(symbol, qty, orderType = 'market') {
    try {
      const order = await this.alpaca.createOrder({
        symbol: symbol,
        qty: qty,
        side: 'buy',
        type: orderType,
        time_in_force: 'gtc'
      });
      console.log(` BUY order placed: ${qty} ${symbol} at ${orderType}`);
      return order;
    } catch (error) {
      throw new Error(`Failed to place BUY order for ${symbol}: ${error.message}`);
    }
  }
  async sell(symbol, qty, orderType = 'market') {
    try {
      const order = await this.alpaca.createOrder({
        symbol: symbol,
        qty: qty,
        side: 'sell',
        type: orderType,
        time_in_force: 'gtc'
      });
      console.log(` SELL order placed: ${qty} ${symbol} at ${orderType}`);
      return order;
    } catch (error) {
      throw new Error(`Failed to place SELL order for ${symbol}: ${error.message}`);
    }
  }
  async getOrders(status = 'open') {
    return await this.alpaca.getOrders({ status });
  }
  async cancelOrder(orderId) {
    return await this.alpaca.cancelOrder(orderId);
  }
  async getBars(symbol, timeframe = '1Min', limit = 100) {
    try {
      const end = new Date();
      const start = new Date(end.getTime() - (limit * 60 * 1000));
      const resp = await this.alpaca.getCryptoBars(
        [symbol],
        {
          start: start.toISOString(),
          end: end.toISOString(),
          timeframe: timeframe
        }
      );
      const bars = resp.get(symbol);
      if (!bars || bars.length === 0) {
        throw new Error('No bar data available');
      }
      // Convert to our format
      return bars.map(bar => ({
        t: bar.Timestamp,
        o: parseFloat(bar.Open),
        h: parseFloat(bar.High),
        l: parseFloat(bar.Low),
        c: parseFloat(bar.Close),
        v: parseFloat(bar.Volume)
      }));
    } catch (error) {
      throw new Error(`Failed to get bars for ${symbol}: ${error.message}`);
    }
  }
}
export default Broker;
