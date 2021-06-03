const ContactModel = require("../../model/Contact/contact");
const db = new ContactModel();
class ContactController{
    constructor(id, nom, telephone, localisation, statut){
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.localisation = localisation;
        this.statut = statut;
    }

    async addContact(){
        try {
            let response = await db.addContact(this.id, this.nom, this.telephone, this.localisation, this.statut);
            return {code: 200, message: response}
        } catch (error) {
            console.log('Controller: '+error);
            return {code: 400, message: "Une erreur s'est produite"};
        }
    }

    async getContacts(){
        try {
            let response = await db.getContacts();
            return response[0];
        } catch (error) {
            console.log(error);
            // return {code: 400, message: "Une erreur s'est produite"};
        }
    }

    async getMarketerContacts(id){
        try {
            let response = await db.getMarketerContacts(id);
            return response[0];
        } catch (error) {
            console.log("Controller: "+error);
        }
    }

    async changeStatus(telephone, statut){
        try {
            let response = await db.changeStatus(telephone, statut);
            return {code: 200, message: response};
        } catch (error) {
            console.log("Controller: "+error);
            return {code: 400, message: "Une erreur s'est produite"};
        }
    }

    async addObservation(telephone, observation){
        try {
            let response = await db.addObservation(telephone, observation);
            return {code: 200, message: response};
        } catch (error) {
            console.log("Controller: "+error);
            return {code: 400, message: "Une erreur s'est produite"};
        }
    }
}

module.exports = ContactController;