var express = require('express')
var readline = require('readline-sync');
var sqlite3 = require('sqlite3').verbose();
var sqlQuery = require('./sqlQuery');

var app = express();
// ~~~~~~~~~~~~~~~~~~~~~ User Inputs ~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

//getting the file path
var filename = readline.question('Enter the file path: ');

//getting the action needed on the DB from the user
var action = readline.question('Enter The Desired Action: (MIN,MAX,AVG): ');
action.toUpperCase();
while(action !=='MIN' && action !== 'MAX' && action !== 'AVG'){
    action = readline.question('Enter one of these actions: MIN, MAX, AVG: ');
    action.toUpperCase();
}
// ~~~~~~~~~~~~~~~~~~~ Started Working on the DB ~~~~~~~~~~~~~~~ //
var db = new sqlite3.Database(filename,sqlite3.OPEN_READONLY,function (err) {
    if(err) {
        return console.error(err.message); // if the file doesn't exist or curropted 
    }
    console.log('Connected to the in-memory SQlite database'); // if the connection to the DB succeded
})


var sql = sqlQuery(action); // this function takes the action and translate it into a query: please see the function definition
db.all(sql,[],function (err,rows) {
    if(err) throw err;
    rows.forEach(function (row) {
        console.log(row);
    })
})

// ~~~~~~~~~~~~~~~~~~~~~~ Closing the DB Connection ~~~~~~~~~~~~~~~ //
db.close(function (err) {
    if(err){
        return console.error(err.message);
    }
    console.log('Closing the connection to the Data Base...')
    console.log('Connection Closed')
});
app.listen(3000);