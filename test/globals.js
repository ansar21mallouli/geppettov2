'use strict';
let argv = require('minimist')(process.argv.slice(2));
let siteUrl = argv.URL || 'http://localhost';
if (!/^https?:\/\//i.test(siteUrl)) {
  siteUrl = 'http://' + siteUrl;
}

global.dateTime = new Date().getTime();
global.firstName = 'Demo';
global.lastName = 'Prestashop';
global.adminEmail = argv.LOGIN || 'demo@prestashop.com';
global.adminPassword = argv.PASSWD || 'prestashop_demo';

global.rcTarget = argv.RC_TARGET || '';
global.rcLink = argv.UrlStableVersion || 'https://download.prestashop.com/download/releases/prestashop_1.7.4.2.zip';
global.prestashopFolderName = 'prestashop';
global.URL = siteUrl;
global.language = argv.LANG || 'en';
global.country = argv.COUNTRY || 'france';
global.db_server = argv.DB_SERVER || '10.1.37.2';
global.db_user = argv.DB_USER || 'root';
global.db_passwd = argv.DB_PASSWD || 'sifast2016';
global.db_empty_password = !!argv.DB_EMPTY_PASSWD; //Cast as boolean

global.downloadFileFolder = './test/campaigns/files/generated_files/downloads/';
global.customerEmail = 'pub@prestashop.com';
global.customerPassword = '123456789';
global.dataFileFolder = './test/mocha/datas/';

global.installFolderName = argv.INSTALL_FOLDER_NAME || '/install-dev';
global.adminFolderName = argv.ADMIN_FOLDER_NAME || '/admin-dev';

global.test_addons = !argv.TEST_ADDONS; //Cast as boolean
global.module_tech_name = argv.MODULE || 'ps_legalcompliance';
