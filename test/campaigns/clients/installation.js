let CommonClient = require('../clients/common_client');

class Installation extends CommonClient {
  async dataBaseCreation(selector) {
    await page.waitFor(selector, 90000);
    await this.pause(2000);
    await page.click(selector);
  }
}
module.exports = Installation;
