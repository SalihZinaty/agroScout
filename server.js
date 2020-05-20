const express = require('express')
const readline = require('readline-sync');
const sqlite3 = require('sqlite3').verbose();
const sqlQuery = require('./sqlQuery');

const app = express();
// ~~~~~~~~~~~~~~~~~~~~~ User Inputs ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

//getting the file path
const filename = readline.question('Enter the file path: ');

//getting the action needed on the DB from the user
const action = readline.question('Enter The Desired Action: (MIN,MAX,AVG): ');
action.toUpperCase();
while(action !=='MIN' && action !== 'MAX' && action !== 'AVG'){
    action = readline.question('Enter one of these actions: MIN, MAX, AVG: ');
    action.toUpperCase();
}
// ~~~~~~~~~~~~~~~~~~~ Started Working on the DB ~~~~~~~~~~~~~~~ //
const db = new sqlite3.Database(filename,sqlite3.OPEN_READONLY,(err) => {
    if(err) {
        return console.error(err.message); // if the file doesn't exist or curropted 
    }
    console.log('Connected to the in-memory SQlite database'); // if the connection to the DB succeded
})


const sql = sqlQuery(action); // this function takes the action and translate it into a query: please see the function definition
db.all(sql,[],(err,rows) => {
    if(err) throw err;
    rows.forEach((row) => {
        console.log(row);
    })
})

// ~~~~~~~~~~~~~~~~~~~~~~ Closing the DB Connection ~~~~~~~~~~~~~~~ //
db.close((err) => {
    if(err){
        return console.error(err.message);
    }
    console.log('Closing the connection to the Data Base...')
    console.log('Connection Closed')
});
app.listen(3000);