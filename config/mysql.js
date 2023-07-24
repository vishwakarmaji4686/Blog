const mysql = require("mysql")
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "admin", 
    database : "blog"
})
connection.connect(function(error){
    if(error){
        console.log("unable to connect database");
    }else{
        console.log("database connected :::::::::::::::");
    }
})
module.exports.connection = connection;