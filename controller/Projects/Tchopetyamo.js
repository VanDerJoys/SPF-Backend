const Tchopetyamo = require("../../model/Tchopetyamo/Tchopetyamo-contacts");
const Base = require('../../model/Tchopetyamo/base');

class TchopetyamoController{

    constructor(base_id, name, phone, town, post, contact_status, observation, reco){
        this.base_id = base_id;
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
                let addContact = Base.findOneAndUpdate({_id: this.base_id}, {$push: {contacts: data._id}});
                resolve(addContact);
            }).catch(err =>{
                console.log(err);
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

    async getContactsByBase(){
        try {
            let contacts = await Base.find().populate({path:'contacts', model:Tchopetyamo});
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