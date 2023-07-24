class imageSarvices {
    constructor() { }
    uplodeImage(image) {
        return new Promise((resolve, reject) => {
            let time = Math.floor(Math.random(258) * 789456123) + 1;
            let img = image.name.split(".")[1]
            let NN = time + "." + img
            let uplodePath = "./public/images/" + NN;
            image.mv(uplodePath, function (error) {
                if (error) {
                    reject(error)
                }else{
                    resolve(NN)
                }
            })
            return NN

        })
    }

}
module.exports = new imageSarvices;