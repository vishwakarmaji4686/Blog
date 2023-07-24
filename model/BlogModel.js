const { connection } = require("../config/mysql");

class BlogModel{
    constructor(){}
    createBlog(data){
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO blog (title, description, userId, images) VALUES ('${data.title}','${data.description}','${data.userId}','${data.images}')`;
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result);
                }
            })
        })

    }
    getAllBlog(){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM blog`;
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result);
                }
            })
        })
    }
    getBlogById(id){
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM blog WHERE userId='${id}'`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        }) 
    }
    getBlogByblogId(id){
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM blog WHERE id='${id}'`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    console.log(result);
                    resolve(result[0])
                }
            })
        })
    }
    updateBlogByID(data, id){
        return new Promise(function (resolve, reject) {
            let query = `UPDATE blog SET title='${data.title}', description='${data.description}', images='${data.images}' WHERE id='${id}'`
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        }) 
    }
    deleteBlog(id){
        return new Promise(function (resolve, reject) {
            let query = `DELETE FROM blog WHERE id='${id}'`;
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        }) 
    }
}
module.exports = new BlogModel;
