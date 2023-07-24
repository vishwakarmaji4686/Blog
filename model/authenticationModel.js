const { connection } = require("../config/mysql");

class authenticationModel{
    constructor(){}
    singUp(data){
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO user (fullName, email, contact, password) VALUES ('${data.fullName}','${data.email}','${data.contact}','${data.password}')`;
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result);
                }
            })
        })
    }
    getSingleUser(email){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM user WHERE email='${email}'`;
            connection.query(query, function(error, result){
                if(error){
                    reject(error)
                }else{
                    resolve(result[0]);
                }
            })
        })

    }
}
module.exports = new authenticationModel();