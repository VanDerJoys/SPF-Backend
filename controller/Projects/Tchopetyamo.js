const Tchopetyamo = require("../../model/Schemas/Tchopetyamo");

class TchopetyamoController{

    constructor(base_name, name, phone, town, posts, reco){
        this.base_name = base_name;
        this.name = name;
        this.phone = phone;
        this.town = town;
        this.posts = posts;
        this.reco = reco;
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new Tchopetyamo({
                base_name: this.base_name,
                name: this.name,
                phone: this.phone,
                town: this.town,
                posts: this.posts,
                recommandation: this.reco
            });
            contact.save().then(data =>{
                resolve(data);
            }).catch(err =>{
                reject(err);
            })
        })
    }
}

module.exports = TchopetyamoController;