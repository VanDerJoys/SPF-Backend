const Cub = require("../../model/Schemas/Cub");

class CubConstructor{
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
}

module.exports = CubConstructor;