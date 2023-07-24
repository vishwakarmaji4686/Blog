const Joi = require("joi")
const BlogModel = require("../model/BlogModel")
const imageSarvices = require("../services/imageSarvices")

class BlogController {
    constructor() { }
    async blog(req, res) {
        let page = {
            title: "blog",
            pageName: "blog",
            message: "",
            blog : "",
            userLogin: false
        }
        if(req.cookies.userLogin){
            page.userLogin = req.cookies.userLogin 
        }
        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message
        }
        let blogs = await BlogModel.getAllBlog()
        page.blog = blogs
        res.render("template", page)
    }
    addBlog(req, res) {
        let page = {
            title: "addBlog",
            pageName: "addBlog",
            message: "",
            userLogin: false
        }
        if(req.cookies.userLogin){
            page.userLogin = req.cookies.userLogin 
        }
        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message
        }
        res.render("template", page)
    }
    async createBlog(req, res) {
        console.log(req.body)
        let blog = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()

        })
        let validateRes = blog.validate(req.body);
        if (validateRes && validateRes.error && validateRes.error.details) {
            req.session.message = validateRes.error.details[0].message
            res.redirect("/addBlog")
            return
        }
        let title = req.body.title
        let description = req.body.description
        let userId = req.cookies.isUserLogin
        let allImageNames = []
        if (req.files && req.files.images) {
            let allImage = req.files.images
            if (allImage && allImage.length > 1) {
                for (const singleImage of allImage) {
                    let imageNewName = await imageSarvices.uplodeImage(singleImage)
                    allImageNames.push(imageNewName)
                }
            } else {
                let imageNewName = await imageSarvices.uplodeImage(singleImage)
                allImageNames.push(imageNewName)
            }
        }
        let imageName = allImageNames.toString();
        let blogD = {
            title: title,
            description: description,
            userId: userId,
            images: imageName
        }
        await BlogModel.createBlog(blogD)
        res.redirect("/blog")
    }
    async editBlog(req, res) {
        let page = {
            title: "editBlog",
            pageName: "editBlog",
            message: "",
            blog : "",
            userLogin: false
        }
        if(req.cookies.userLogin){
            page.userLogin = req.cookies.userLogin 
        }
        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message
        }
        let id = req.query.blogId
        console.log("id", id);
        let blogs = await BlogModel.getBlogByblogId(id)
        page.blog = blogs
        console.log("blogs", blogs);
        res.render("template", page)
    }
    async myblog(req, res){
        let page = {
            title: "myblog",
            pageName: "myblog",
            message: "",
            blog : "",
            userLogin: false
        }
        if(req.cookies.userLogin){
            page.userLogin = req.cookies.userLogin 
        }
        if (req.session.message) {
            page.message = req.session.message
            delete req.session.message
        }
        let id = req.cookies.isUserLogin
        console.log(id);
        let blogs = await BlogModel.getBlogById(id)
        console.log(blogs);
        page.blog = blogs
        res.render("template", page)
    }
    async updateBlog(req, res){
        /* console.log(req.body)
        console.log(req.files); */
        console.log(req.query)
        let id = req.query.blogId;
        let blog = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()

        })
        let validateRes = blog.validate(req.body);
        if (validateRes && validateRes.error && validateRes.error.details) {
            req.session.message = validateRes.error.details[0].message
            res.redirect("/addBlog")
            return
        }
        let title = req.body.title
        let description = req.body.description
        let userId = req.cookies.isUserLogin
        let allImageNames = []
        if (req.files && req.files.images) {
            let allImage = req.files.images
            if (allImage && allImage.length > 1) {
                for (const singleImage of allImage) {
                    let imageNewName = await imageSarvices.uplodeImage(singleImage)
                    allImageNames.push(imageNewName)
                }
            } else {
                let imageNewName = await imageSarvices.uplodeImage(singleImage)
                allImageNames.push(imageNewName)
            }
        }
        let imageName = allImageNames.toString();
        let blogD = {
            title: title,
            description: description,
            userId: userId,
            images: imageName
        }
        await BlogModel.updateBlogByID(blogD, id)
        res.redirect("/myblog")
    }
    async deleteBlog(req, res){
       let id = req.query.blogId
       await BlogModel.deleteBlog(id)
       res.redirect("/myblog")
    }
}
module.exports = new BlogController();