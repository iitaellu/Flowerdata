# Flower Data

This is a simple exercise of distributed database system with SQL (PgAdmin 4) and NoSQL (MongoDB) system. There is used two similar databases, which each include 1 table in each and each of them 5 rows of data. In front-end user can choose database location by pressing button, and software prints tables from choosed database to front end but can also join tables and summarize same stocks together.
User can also insert, delete and modify data from each databases.

## Setup
1. Take copy of the product ether downloading zip file or open it with Github Desktop and clone project to your own computer.
2. Open project in visual studio code, or other code editor.
3. Open your PGAdmin 4 and create database: TampereSQL.
4. right click TampereSQL database, press restore, and choose TampereSQLdata.sql file from project's database backup-folder. Press restore.
5. Open your MongoDBCompass and create database named 'LahtiNoSQL' with collection 'flowers'
6. press 'Add data' and press "import JSON or CSV file" and choose "LahtiNoSQL.flowers.json" file from project's database backup-folder.
  OR press "Insert Document" and copy data from "LahtiNoSQL.flowers.json" file and paste it to field.
7. Change in main.js file your own PGAdim 4 data to code so the databases can be connected to your code
![image](https://github.com/user-attachments/assets/a3a5aa7f-f9f9-468f-bb41-602bddd4606d)
8. In terminal type: npm install
9. In terminal type: node main.js
10. Then open browser and type "localhost:3000/"
11. Then press any button to see database data from choosed location
