const ContactModel = require("../../model/Contact/contact");
const db = new ContactModel();
class ContactController{
    constructor(id, nom, telephone, localisation){
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.localisation = localisation;
    }

    async addContact(){
        try {
            let response = await db.addContact(this.id, this.nom, this.telephone, this.localisation);
            return {code: 200, message: "Contact enregistré"}
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
}

module.exports = ContactController;