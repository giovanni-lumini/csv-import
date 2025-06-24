//import modules
import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2/promise';
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
        const datiValidi = [];
  
      
    //err is the error that is generate from node or mySQL12
    } catch (err) {
        console.error('❌ Error of connection to DB:', err.message);
    }
  }

