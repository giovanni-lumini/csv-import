//import modules
//fs is a node module that can allow the work with files
import fs from 'fs';
//for reading CSV file row after row, easily
import csv from 'csv-parser';
//connect end interact with mySQL
import mysql from 'mysql2/promise';
//hidde data + config
import 'dotenv/config';

//VARIABLES
//db configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

//FUNCTIONS
//import csv
async function importCSV() {
  //try-catch: run the code into try, if there is an error, run the code into catch
  try {
    //connection to db
    //await: until the connection to db isn't ok, the execution of code wait
    //if the connection work, run the code
    //else, there is an error
    const dbConnection = await mysql.createConnection(dbConfig);
    //empty array for save the product to add to mySQL
    const validData = [];

    //createReadStream: reads the file with a flow (row after row)
    fs.createReadStream('./data/products.csv')
    //pipe(csv()): connect the flow with csv
    //csv: trasform each row in a js object
    .pipe(csv())
    //.on('data', (row) => {}: 
    //on: is an event listener
    //data: is an event that is triggered for each parsed row
    //for each data, the function receives the row object
    //row: parameter which is always a row from csv (could have any name)
    .on('data', (row) => {
        //if exist row.price
        //.trim: remove empty spaces
        if (row.price && row.price.trim()) {
          //add row as object into array (validData)
          validData.push(row);
        }
    })
    //.on('end', async () => {}
    //on: is an event listener
    //end: is an event that is triggered when all the row are readed
    //async: allow to use "await"; "await" allows asynchronous code to act as if it were synchronous
    .on('end', async () => {
      console.log(`✅ Found ${validData.length} rows with price`);

      //query saved in variable
      const sql = `INSERT INTO catalogo 
      (name, barcode, brand, category, quantity, weight, price) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

      //cycle for to iterate each row
      for (let i = 0; i < validData.length; i++){
        //product = row[i]
        let product = validData[i];
        try {
          //await: untill dbConnection.execute(...) isn't executed, don't execute any other code (in this function)
          //dbConnection.execute(): accept a query and an array that replaces placeholders into values (cost sql)
          await dbConnection.execute(sql, [
            product.name,
            product.barcode,
            product.brand,
            product.category,
            parseInt(product.quantity),
            parseFloat(product.weight.replace(',', '.')),
            parseFloat(product.price.replace(',', '.'))
          ]);
        //err: the error that is generate from snode or mySQL12
        } catch (err) {
          console.error(`❌ Error from "${product.name}": ${err.message}`);
        }
      }
      console.log('🎉 Importation completetd');
      //dbConnection.end() close the connection
      await dbConnection.end();
    });
    //err: the error that is generate from node or mySQL12
    } catch (err) {
        console.error('❌ Error of connection to DB:', err.message);
  }
}

//call the function to import the data from csv into db
importCSV();

