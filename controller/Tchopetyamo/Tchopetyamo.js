const Tchopetyamo = require("../../model/Tchopetyamo/Tchopetyamo-contacts");
const Base = require('../../model/Schemas/base');

class TchopetyamoController{

    constructor(base_id, name, phone, town){
        this.base_id = base_id;
        this.name = name;
        this.phone = phone;
        this.town = town;
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new Tchopetyamo({
                name: this.name,
                phone: this.phone,
                town: this.town,
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
            let contacts = await Tchopetyamo.find({}, {'__v':0, "created_at":0});
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getContactsByBase(){
        try {
            let contacts = await Base
            .find()
            .populate('contacts')
            .populate('post');
            return contacts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getPostContacts(postId){
        try {
            let contacts = await Base
            .find({_id: postId})
            .populate('contacts', {select : {_id: 0, __v: 0, created_at: 0}})
            .populate('post', {select : {_id: 0, __v: 0, created_at: 0, available: 0}});
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

    async updateContact(contactId){
        try {
            let updatedContact = await Tchopetyamo.updateOne({_id: contactId}, {
                name: this.name,
                phone: this.phone,
                town: this.town
            });
            return updatedContact;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async changeStatus(contactId, observation){
        try {
            let changedStatus = await Tchopetyamo.updateOne({_id: contactId}, {
                observation: observation
            });
            return changedStatus;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addToArchive(contactId, archive){
        try{
            let archived = await Tchopetyamo.updateOne({_id: contactId}, {
                archived: archive
            });
            return archived;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
}

module.exports = TchopetyamoController;