<!-- package.json -->
"dependencies": {
    <!-- for reading CSV file row after row, easily  -->
    "csv-parser": "^3.2.0",
    <!-- to read .env file -->
    "dotenv": "^16.5.0",
    <!-- to connect end interact with mySQL -->
    "mysql2": "^3.14.1"
}

<!-- package.json -->
"devDependencies": {
    <!-- every time the file was updated, the server restart -->
    "nodemon": "^3.1.10"
  }

<!-- package.json -->
"type": "module", <!-- for ES Modules -->

<!-- .gitignore -->
for node_modules and .env files; .gitignore doesn't save the files in the repo on gitHub