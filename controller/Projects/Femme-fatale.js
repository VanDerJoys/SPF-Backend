const FemmeFatale = require("../../model/Femme-fatale/Femme-fatale-contacts");
const Base = require('../../model/Femme-fatale/base');

class FemmeFataleConstructor{
    constructor(plaint, name, phone, order, amount, observation, location, contact_status, payment_date, payment_status, reco){
        this.name = name;
        this.phone = phone;
        this.order = order;
        this.amount = amount;
        this.observation = observation;
        this.location = location;
        this.contact_status = contact_status;
        this.payment_date = payment_date;
        this.payment_status = payment_status;
        this.reco = reco;
        this.plaint = plaint
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new FemmeFatale({
                plaint: this.plaint,
                name: this.name,
                phone: this.phone,
                order: this.order,
                amount: this.amount,
                observation: this.observation,
                location: this.location,
                contact_status: this.contact_status,
                payment_date: this.payment_date,
                payment_status: this.payment_status,
                recommandation: this.reco
            });
            contact.save().then(data =>{
                let addContact = Base.findOneAndUpdate({_id: this.base_id}, {$push: {fcontacts: data._id}});
                resolve(addContact);
            }).catch(err =>{
                reject(err);
            })
        })
    }

    async getContacts(){
        try {
            let contacts = await FemmeFatale.find({}, {'_id': 0, '__v':0, "created_at":0});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByBase(base_name){
        try {
            let contacts = await FemmeFatale.find({base_name: base_name});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByPost(post){
        try {
            let contacts = await FemmeFatale.find({post: post});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteContact(id){
        try {
            let removedContact = await FemmeFatale.deleteOne({_id: id});
            return removedContact;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = FemmeFataleConstructor;