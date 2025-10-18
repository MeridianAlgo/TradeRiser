class Portfolio {
  constructor(broker) {
    this.broker = broker;
    this.account = null;
  }

  async update() {
    try {
      this.account = await this.broker.getAccount();
      return this.account;
    } catch (error) {
      console.error('❌ Failed to update portfolio:', error.message);
      throw error;
    }
  }

  async getBalance() {
    await this.update();
    return {
      cash: parseFloat(this.account.cash),
      equity: parseFloat(this.account.equity),
      buyingPower: parseFloat(this.account.buying_power)
    };
  }

  async getPosition(symbol) {
    try {
      return await this.broker.getPosition(symbol);
    } catch (error) {
      // Position doesn't exist - this is normal, not an error
      return null;
    }
  }

  async hasPosition(symbol) {
    const position = await this.getPosition(symbol);
    return position !== null;
  }

  calculatePositionSize(price, percentage = 0.1) {
    const balance = parseFloat(this.account.buying_power);
    const allocation = balance * percentage;
    return Math.floor((allocation / price) * 100) / 100; // Round to 2 decimals
  }

  displayStatus() {
    console.log('\n📊 Portfolio Status:');
    console.log(`   Cash: $${parseFloat(this.account.cash).toFixed(2)}`);
    console.log(`   Equity: $${parseFloat(this.account.equity).toFixed(2)}`);
    console.log(`   Buying Power: $${parseFloat(this.account.buying_power).toFixed(2)}`);
  }
}

export default Portfolio;
