const Joi = require("joi");
const authenticationModel = require("../model/authenticationModel");

class authenticationController {
    constructor() { }

    singUp(req, res) {

        let page = {
            title: "singUp",
            pageName: "singUp",
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
    login(req, res) {

        let page = {
            title: "login",
            pageName: "login",
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

    async createUser(req, res) {
        console.log(req.body);
        let user = Joi.object({
            fullName: Joi.string().required(),
            email: Joi.string().required(),
            contact: Joi.number().required(),
            password: Joi.string().required()

        })
        let validateRes = user.validate(req.body);
        if (validateRes && validateRes.error && validateRes.error.details) {
            req.session.message = validateRes.error.details[0].message
            res.redirect("/singUp")
            return
        }
        let fullName = req.body.fullName;
        let email = req.body.email;
        let contact = req.body.contact;
        let password = req.body.password;

        let userData = {
            fullName: fullName,
            email: email,
            contact: contact,
            password: password,
        }
        await authenticationModel.singUp(userData);
        res.redirect("/login")
    }
    async userLogin(req, res) {
        console.log(req.body);
        let user = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()

        })
        let validateRes = user.validate(req.body);
        if (validateRes && validateRes.error && validateRes.error.details) {
            req.session.message = validateRes.error.details[0].message
            res.redirect("/login")
            return
        }
        let email = req.body.email;
        let password = req.body.password;
        let userD = await authenticationModel.getSingleUser(email)
        console.log("userD", userD);
        if (userD) {
            let cos = userD
            console.log("cos", cos);
            if (cos.password == password) {
                res.cookie('userLogin', cos.id)
                res.redirect("/blog")
            } else {
                req.session.message = "Wrong Password::::::"
                res.redirect("/login")
            }
        } else {
            req.session.message = "Wrong Email :::::::"
            res.redirect("/login")
        }

    }
}
module.exports = new authenticationController();