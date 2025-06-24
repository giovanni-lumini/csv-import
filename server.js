//import modules
import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2/promise';

//VARIABLES
//db configuration
const dbConfiguration = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    databse: 'prodotti'
}

//FUNCTIONS
//import csv