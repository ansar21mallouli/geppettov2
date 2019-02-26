const {InstallPage} = require('../../../../uimap/installation/install');
let promise = Promise.resolve();

module.exports = {

  prestaShopInstall: function (selector, language, country) {
    scenario('Step 1 : Choosing language', client => {
      test('should choose "' + language + '" language', () => client.waitAndSelectByValue(selector.StepOne.installation_language_installation_select, language));
      test('should click on "Next" button', () => client.waitForVisibleAndClick(selector.Common.installation_next_button));
    }, 'common_client');
    scenario('Step 2 : Agreeing license agreements', client => {
      test('should click on "I agree to the above terms and conditions " button', () => client.waitForExistAndClick(selector.StepTwo.installation_agree_terms_and_conditions_checkbox));
      test('should click on "Next" button', () => client.waitForVisibleAndClick(selector.Common.installation_next_button));
    }, 'common_client');
    scenario('Step 3 : Checking system compatibility', client => {
      test('should check if step 3 is skipped', () => client.isVisible(selector.StepThree.installation_refresh_button));
      test('should check the test compatibility green box', async () => {
        if (global.isVisible) {
          await client.isExisting(selector.StepThree.installation_compatibility_green_box);
          await client.waitForVisibleAndClick(selector.Common.installation_next_button);
        } else {
          await client.pause(0);
        }
      });
    }, 'common_client');
    scenario('Step 4 : Inserting the shop information', client => {
      test('should set the "Shop name" input', () => client.waitAndSetValue(InstallPage.StepFour.installation_shop_name_input_field, 'prestashop_demo', 2000));
      test('should set the "Country" input', () => {
        return promise
          .then(() => client.waitForExistAndClick(selector.StepFour.installation_country_list_select))
          .then(() => client.waitAndSetValue(selector.StepFour.installation_country_search_input_field, country))
          .then(() => client.waitForExistAndClick(selector.StepFour.installation_country_list_select));
      });
      test('should set the "First name" input', () => client.waitAndSetValue(selector.StepFour.installation_account_first_name_input_field, "demo"));
      test('should set the "Last name" input', () => client.waitAndSetValue(selector.StepFour.installation_account_last_name_input_field, "prestashop"));
      test('should set the "E-mail address" input', () => client.waitAndSetValue(selector.StepFour.installation_account_email_input_field, global.adminEmail));
      test('should set the "Shop password" input', () => client.waitAndSetValue(selector.StepFour.installation_account_password_input_field, global.adminPassword));
      test('should set the "Re-type to confirm" input', () => client.waitAndSetValue(selector.StepFour.installation_re_type_password_input_field, global.adminPassword));
      test('should click on "Next" button', () => client.waitForVisibleAndClick(selector.Common.installation_next_button));
    }, 'common_client');
    scenario('Step 5 : Setting the BD configuration', client => {
      test('should set the "Database server address" input', () => client.waitAndSetValue(selector.StepFive.installation_database_server_address_input_field, global.db_server));
      test('should set the "Database name" input', () => client.waitAndSetValue(selector.StepFive.installation_database_name_input_field, 'database' + new Date().getTime(), 0, {}, true));
      test('should set the "Database login" input', () => client.waitAndSetValue(selector.StepFive.installation_database_login_input_field, db_user, 0, {}, true));
      test('should set the "Database password" input', () => {
        if (global.db_empty_password) {
          return promise
            .then(() => client.waitAndSetValue(selector.StepFive.installation_database_password_input_field, "", 0, {}, true));
        } else {
          return promise
            .then(() => client.waitAndSetValue(selector.StepFive.installation_database_password_input_field, db_passwd, 0, {}, true));
        }
      });
      test('should click on "Test your database connection now!" button', () => client.waitForExistAndClick(selector.StepFive.installation_test_database_connection_button, 2000));
      test('should check for the connection and click on "Attempt to create the database automatically" button', () => client.dataBaseCreation(selector.StepFive.installation_database_connection_box));
      test('should check that the Database is created', () => client.waitForVisible(selector.StepFive.database_created_box));
      test('should click on "Next" button', () => client.waitForExistAndClick(selector.Common.installation_next_button, 2000));
    }, 'installation');
    scenario('Step 6 : Checking installation', client => {
      test('should create file parameter', () => client.waitForVisible(selector.StepSix.installation_success_create_file_parameters_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create database', () => client.waitForVisible(selector.StepSix.installation_success_create_database_tables_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create default shop', () => client.waitForVisible(selector.StepSix.installation_success_create_default_shop_language_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create database table', () => client.waitForVisible(selector.StepSix.installation_success_populate_database_tables_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create shop information', () => client.waitForVisible(selector.StepSix.installation_success_configure_shop_information_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create demonstration data', () => client.waitForVisible(selector.StepSix.installation_success_install_demonstration_data_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create install module', () => client.waitForVisible(selector.StepSix.installation_success_install_modules_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create addons modules', () => client.waitForVisible(selector.StepSix.installation_success_install_addons_modules_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should create install theme', () => client.waitForVisible(selector.StepSix.installation_success_install_theme_title, 0, {
        visible: true,
        timeout: 360000
      }));
      test('should finish installation', () => client.waitForVisible(selector.StepSix.installation_installation_finished_title, 0, {
        visible: true,
        timeout: 360000
      }));
    }, 'installation');
    scenario('Step 7 : Checking that installation finished', client => {
      test('should check that the installation is finished!', () => client.isExisting(selector.Common.installation_success_finished_title));
    }, 'installation');
  },
};
