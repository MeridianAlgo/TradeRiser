import Broker from './broker.js';
import Portfolio from './portfolio.js';
import Strategy from './strategy.js';
import { config } from './config.js';

async function test() {
  console.log('🧪 Testing Trading Bot Setup...\n');

  // Check config
  console.log('1️⃣ Checking configuration...');
  if (!config.alpaca.keyId || config.alpaca.keyId === 'YOUR_API_KEY_HERE') {
    console.log('❌ Please add your Alpaca API credentials to .env file');
    console.log('   Get them from: https://alpaca.markets\n');
    return;
  }
  console.log('✅ Config loaded\n');

  // Test broker connection
  console.log('2️⃣ Testing Alpaca API connection...');
  try {
    const broker = new Broker();
    const account = await broker.getAccount();
    console.log('✅ Connected to Alpaca API');
    console.log(`   Account Status: ${account.status}`);
    console.log(`   Cash: $${parseFloat(account.cash).toFixed(2)}`);
    console.log(`   Buying Power: $${parseFloat(account.buying_power).toFixed(2)}\n`);

    // Test portfolio
    console.log('3️⃣ Testing portfolio...');
    const portfolio = new Portfolio(broker);
    await portfolio.update();
    portfolio.displayStatus();

    // Test strategy
    console.log('\n4️⃣ Testing strategy...');
    const strategy = new Strategy();
    console.log(`   Strategy Name: ${strategy.name}`);
    console.log(`   Short Window: ${strategy.shortWindow}`);
    console.log(`   Long Window: ${strategy.longWindow}\n`);

    // Test market data
    console.log('5️⃣ Testing market data fetch...');
    const symbol = 'BTC/USD';
    const latestPrice = await broker.getLatestPrice(symbol);
    console.log(`   ${symbol} Latest Price: $${parseFloat(latestPrice.p).toFixed(2)}`);
    
    const bars = await broker.getBars(symbol, '1Min', 50);
    const barsArray = Array.isArray(bars) ? bars : Array.from(bars);
    console.log(`   Fetched ${barsArray.length} bars of historical data\n`);

    // Test strategy analysis
    console.log('6️⃣ Testing strategy analysis...');
    const barsFormatted = barsArray;

    const signal = await strategy.analyze({
      symbol,
      currentPrice: parseFloat(latestPrice.p),
      position: null,
      bars: barsFormatted,
      portfolio
    });
    console.log(`   Strategy Signal: ${signal}\n`);

    console.log('✅ All tests passed! Bot is ready to run.');
    console.log('\n💡 To start the bot, run: npm start');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('401')) {
      console.log('\n⚠️  Authentication failed. Please check your API keys in .env file');
    }
  }
}

test();
