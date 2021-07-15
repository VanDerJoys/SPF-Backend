const FemmeFatale = require("../../model/Femme-fatale/Femme-fatale-contacts");
const Base = require('../../model/Femme-fatale/base');

class FemmeFataleConstructor{
    constructor(base_id, name, phone, location, contact_status){
        this.name = name;
        this.phone = phone;
        this.location = location;
        this.contact_status = contact_status;
        this.base_id = base_id;
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new FemmeFatale({
                name: this.name,
                phone: this.phone,
                location: this.location,
                contact_status: this.contact_status,
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
            let contacts = await FemmeFatale.find({}, {'_id': 0, '__v':0, "created_at":0});
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

    async updateContact(contactId, name, phone, contact_status){
        try {
            let updatedContact = await Tchopetyamo.updateOne({_id: contactId}, {
                name: name,
                phone: phone,
                contact_status: contact_status,
            });
            return updatedContact;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = FemmeFataleConstructor;