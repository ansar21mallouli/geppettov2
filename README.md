[![Prestashop](https://i.imgur.com/qDqeQ1E.png)](https://www.prestashop.com)

![Geppetto](./media/logo.png)

# How to Install Geppetto project
Clone this repo and run them directy with a simple `node` command.

```bash
git clone https://github.com/mbadrani/geppettov2.git
cd geppettov2
npm i
```
#### First example launch Installation test
If you want to run the Install test you can run the script **01_install**
```
node functional/installationAndUpgrade/01_install.js --URL UrlOfShop --LANG language --COUNTRY country --DB_SERVER dataBaseServer --DB_USER dataBaseUsername --DB_PASSWD dataBasePassword --ADMIN_FOLDER_NAME adminFolderName --INSTALL_FOLDER_NAME installFolderName
```


#### The architecture of the project
![Architecture](./media/tree_archi.png)
