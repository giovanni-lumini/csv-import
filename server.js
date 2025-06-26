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
        .on('data', (row) => {
            //if exist row.price
            //.trim: remove empty spaces
            if (row.price && row.price.trim()) {
              //add row as object into array (validData)
              validData.push(row);
            }
        })
        
  
      
    //err is the error that is generate from node or mySQL12
    } catch (err) {
        console.error('❌ Error of connection to DB:', err.message);
    }
  }

