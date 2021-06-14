const Cub = require("../../model/Schemas/Cub");

class CubController{
    constructor(base_name, name, phone, cni, service, observation, quartier, facebook, status, posts, reco){
        this.base_name = base_name;
        this.name = name;
        this.phone = phone;
        this.cni = cni;
        this.service = service;
        this.observation = observation;
        this.quartier = quartier;
        this.facebook = facebook;
        this.status = status
        this.posts = posts;
        this.reco = reco;
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new Cub({
                base_name:  this.base_name,
                name: this.name,
                phone: this.phone,
                cni: this.cni,
                service: this.service,
                observation: this.observation,
                quartier: this.quartier,
                facebook: this.facebook,
                posts: this.posts,
                status: this.status,
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
            let contacts = await Cub.find();
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByBase(base_name){
        try {
            let contacts = await Cub.find({base_name: base_name});
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