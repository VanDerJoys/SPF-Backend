const Tchopetyamo = require("../../model/Schemas/Tchopetyamo");

class TchopetyamoController{

    constructor(base_id, name, phone, town, post, reco){
        this.base_id = base_id;
        this.name = name;
        this.phone = phone;
        this.town = town;
        this.post = post;
        this.reco = reco;
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new Tchopetyamo({
                base_name: this.base,
                name: this.name,
                phone: this.phone,
                town: this.town,
                post: this.post,
                recommandation: this.reco
            });
            contact.save().then(data =>{
                resolve(data);
            }).catch(err =>{
                reject(err);
            })
        })
    }

    async getContacts(){
        try {
            let contacts = await Tchopetyamo.find({}, {'_id': 0, '__v':0, "created_at":0});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByBase(base_name){
        try {
            let contacts = await Tchopetyamo.find({base_name: base_name}, {'_id': 0, '__v':0, "created_at":0});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByPost(post){
        try {
            let contacts = await Tchopetyamo.find({post: post});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteContact(id){
        try {
            let removedContact = await Tchopetyamo.deleteOne({_id: id});
            return removedContact;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = TchopetyamoController;