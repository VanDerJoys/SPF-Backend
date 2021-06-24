const Tchopetyamo = require("../../model/Tchopetyamo/Tchopetyamo-contacts");

class TchopetyamoController{

    constructor(name, phone, town, post, contact_status, observation, reco){
        this.name = name;
        this.phone = phone;
        this.town = town;
        this.post = post;
        this.contact_status = contact_status;
        this.observation = observation;
        this.reco = reco;
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new Tchopetyamo({
                name: this.name,
                phone: this.phone,
                town: this.town,
                post: this.post,
                contact_status: this.contact_status,
                observation: this.observation,
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