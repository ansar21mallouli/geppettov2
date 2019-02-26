const commonInstallation = require('../../../../campaigns/clients/common_scenarios/install/install');
const {InstallPage} = require('../../../../uimap/installation/install.js');
const {HomePage} = require('../../../../uimap/FO/homePage/homePage.js');

scenario('The shop installation', () => {
  scenario('Open the browser and connect installation interface', client => {
    test('should open the browser', async () => {
      await client.open();
      await client.startTracing('installShop');
    });

    test('should go to install page ', () => client.localhost(URL));
  }, 'common_client');

  commonInstallation.prestaShopInstall(InstallPage, language, country);

  scenario('Login to the Front Office', client => {
    test('should sign in FO', () => client.signInFO(HomePage));
  }, 'installation');
}, 'common_client', false);







