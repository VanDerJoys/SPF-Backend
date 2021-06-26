const Cub = require("../../model/Cub/Cub-contacts");
const Base = require('../../model/Cub/base');

class CubController{
    constructor(base_id, name, phone, cni, service, observation, quartier, facebook, status, contact_status, reco){
        this.name = name;
        this.phone = phone;
        this.cni = cni;
        this.service = service;
        this.observation = observation;
        this.quartier = quartier;
        this.facebook = facebook;
        this.status = status;
        this.contact_status = contact_status
        this.reco = reco;
        this.base_id = base_id;
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new Cub({
                name: this.name,
                phone: this.phone,
                cni: this.cni,
                service: this.service,
                observation: this.observation,
                quartier: this.quartier,
                facebook: this.facebook,
                status: this.status,
                contact_status: this.contact_status,
                recommandation: this.reco
            });
            contact.save().then(data =>{
                let addContact = Base.findOneAndUpdate({_id: this.base_id}, {$push: {contacts: data._id}});
                resolve(addContact);
            }).catch(err =>{
                reject(err);
            })
        })
    }

    async getContacts(){
        try {
            let contacts = await Cub.find({}, {'_id': 0, '__v':0, "created_at":0});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByBase(){
        try {
            let contacts = await Base.find().populate('contacts');
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByPost(post){
        try {
            let contacts = await Cub.find({post: post});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteContact(id){
        try {
            let removedContact = await Cub.deleteOne({_id: id});
            return removedContact;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = CubController;