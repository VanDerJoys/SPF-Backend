// const Account = require('../model/Schemas/account');
const Contact = require('../model/Schemas/contacts');

class AccountController{
    constructor(data){
        this.data = data;
    }

    async addContact(){
        try {
            const contact = new Contact({
                
            });
            let results = await contact.save();
            return results;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }
}

module.exports = AccountController;