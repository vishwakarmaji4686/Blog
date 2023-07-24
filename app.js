const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mainRouter = require("./router/mainRouter")
const expresssession = require("express-session")
const cookieparser = require("cookie-parser")
const fileUplode = require("express-fileupload")


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(__dirname + "/public"));
app.use(expresssession({ 
    resave: false,
    saveUninitialized: false,
    secret : "rahulvishwakarma"
}));
app.use(cookieparser());
app.use(fileUplode());

app.use("/", mainRouter)

app.listen(3001, function(req, res){
    console.log("server started at port 3001")
});