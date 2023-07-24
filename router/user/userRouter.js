const express = require("express");
const authenticationController = require("../../controller/authenticationController");
const BlogController = require("../../controller/BlogController");
const app = express();


app.get("/", function(req, res){
    let page = {
        title : "home",
        pageName : "home",
        userLogin: false
    }
    if(req.cookies.userLogin){
        page.userLogin = req.cookies.userLogin 
    }
    res.render("template", page)
})
app.get("/singUp",authenticationController.singUp)
app.post("/singUp",authenticationController.createUser)
app.get("/login",authenticationController.login)
app.post("/login",authenticationController.userLogin)
app.get("/blog",BlogController.blog)
app.get("/addBlog",BlogController.addBlog)
app.post("/addBlog", BlogController.createBlog)
app.get("/editBlog", BlogController.editBlog)
app.get("/myblog",BlogController.myblog)
app.post("/editBlog", BlogController.updateBlog)
app.get("/deleteBlog",BlogController.deleteBlog)


module.exports = app;