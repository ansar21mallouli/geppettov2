const puppeteer = require('puppeteer');
require('../../globals');
const {DashBoardPage} = require('../../uimap/BO/dashboard/dashboard.js');
const {AuthenticationPage} = require('../../uimap/BO/authentication/authentication');
const {Menu} = require('../../uimap/BO/Menu/menu');
const {HomePage} = require('../../uimap/FO/homePage/homePage');
const {AuthenticationPageFO} = require('../../uimap/FO/authentication/authentication');

let fs = require('fs');
let options = {
  timeout: 30000,
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  },
  args: [`--window-size=${1280},${1024}`]
};
global.tab = [];
global.selectedValue = [];


class CommonClient {
  async open() {
    global.browser = await puppeteer.launch(options);
    global.page = await this.getPage(0)
  }

  async getPage(id) {
    const pages = await browser.pages();
    return await pages[id];
  }

  async switchWindow(id, wait = 0) {
    await page.waitFor(5000, {waituntil: 'networkidle2'});
    await this.waitFor(wait);
    page = await this.getPage(id);
    await page.bringToFront();
    await page._client.send('Emulation.clearDeviceMetricsOverride');
  }

  async close() {
    await browser.close();
  }

  async stopTracing() {
    await page.tracing.stop();
  }

  async startTracing(testName = 'test') {
    await page.tracing.start({
      path: 'test/campaigns/files/generated_files/trace/' + testName + '.json',
      categories: ['devtools.timeline']
    });
  }

  async accessToBO() {
    await page.goto(global.URL + global.adminFolderName);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitFor(AuthenticationPage.authentification_page_content_body);
  }

  async accessToFO(selector, id, wait = 4000) {
    await this.waitForAndClick(selector, wait);
    await this.switchWindow(id, wait);
  }

  async openShopURL(param = '') {
    await page.goto(global.URL + param);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await this.waitFor(HomePage.page_content);
  }

  async signInBO() {
    await this.waitForAndType(AuthenticationPage.authentification_email_input_field, global.email);
    await this.waitForAndType(AuthenticationPage.authentification_password_input_field, global.password);
    await this.waitForAndClick(AuthenticationPage.authentification_login_button);
    await this.waitFor(AuthenticationPage.authentification_page_content_body);
  }

  async signOutBO() {
    await this.waitForAndClick(DashBoardPage.dashboard_employee_information_link, 2000);
    await this.waitForAndClick(DashBoardPage.dashboard_sign_out_option_link, 2000);
  }


  async signOutFO() {
    await this.waitFor(HomePage.sign_out_button);
    await this.waitForAndClick(HomePage.sign_out_button);
  }

  async screenshot(fileName = 'screenshot') {
    await page.screenshot({path: 'test/campaigns/files/generated_files/screenshots/' + fileName + global.dateTime + '.png'});
  }


  async signInFO() {
    await page.goto(global.URL);
    await page._client.send('Emulation.clearDeviceMetricsOverride');
    await page.waitFor(HomePage.page_content);
    await this.waitForExistAndClick(HomePage.sign_in_button, 1000, {visible: true});
    await this.waitAndSetValue(AuthenticationPageFO.email_input, global.customerEmail);
    await this.waitAndSetValue(AuthenticationPageFO.password_input, global.customerPassword);
    await this.waitForExistAndClick(AuthenticationPageFO.login_button);
    await page.waitFor(HomePage.page_content);
  }

  async pause(timeoutOrSelectorOrFunction, options = {}) {
    await page.waitFor(timeoutOrSelectorOrFunction, options);
  }

  async waitAndSelectByValue(selector, value, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector);
    await page.select(selector, value);
  }

  async isVisible(selector, wait = 0, options = {}) {
    await page.waitFor(wait, options);
    global.isVisible = await page.$(selector) !== null;
  }

  async localhost(link) {
    await page.goto(link + '/install-dev');
  }

  async isExisting(selector, wait = 0) {
    await page.waitFor(wait);
    const exists = await page.$(selector) !== null;
    expect(exists).to.be.true;
  }

  async waitAndSetValue(selector, value, wait = 0, options = {}) {
    await page.waitFor(wait);
    await page.waitFor(selector, options);
    await page.click(selector);
    await page.keyboard.down('Control');
    await page.keyboard.down('A');
    await page.keyboard.up('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(selector, value);
  }

  async waitForExistAndClick(selector, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector);
    await page.click(selector);
  }

  async waitForVisibleAndClick(selector, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector, {visible: true});
    await page.click(selector);
  }

  async waitForVisible(selector, wait = 0, options = {visible: true}) {
    await page.waitFor(wait);
    await page.waitFor(selector, options);
  }

}

module.exports = CommonClient;
