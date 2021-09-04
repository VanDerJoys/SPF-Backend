const Contact = require('../model/Schemas/contacts_aloe');

class AccountController {
  async addContact(data) {
    try {
      const contact = new Contact({
        name: data.name,
        phone: data.phone,
        town: data.town,
        date_naissance: data.date_naissance,
        base_id: data.base_id,
      });
      let results = await contact.save();
      return results;
    } catch (error) {
      console.log("Controller: " + error);
      throw error;
    }
  }

  async updateContact(id, data) {
    try {
      let contact = await Contact.updateOne(
        { _id: id },
        {
          name: data.name,
          phone: data.phone,
          town: data.town,
          date_naissance: data.date_naissance,
          base_id: data.base_id,
        }
      );
      return contact;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  /* async getAllContacts() {
    try {
    
      const contact = await Contact.find({ archived: false });
      return contact;
    } catch (error) {
      console.log("Controller: " + error);
      throw error;
    }
  } */

  async getBaseContacts(base_id) {
    try {
      const contact = await Contact.find({ base_id: base_id }, { __v: 0 });
      return contact;
    } catch (error) {
      console.log("Controller: " + error);
      throw error;
    }
  }

  async getProjectContacts(project_id) {
    try {
      const contact = await Contact.find(
        { project_id: project_id },
        { __v: 0 }
      );
      return contact;
    } catch (error) {
      console.log("Controller: " + error);
      throw error;
    }
  }
  /* async getCollectorContacts(){
    try {
        const contact = await Contact.find({}, {'__v':0});
        return contact;
    } catch (error) {
        console.log("Controller: "+error);
        throw error;
    }
  } */

  /* async getTheBests(){
    try{
        const contact = await Contact.aggregate([
            {$group: {_id:"$account_id", collectionsNumber: {$sum: 1}}},
            {$lookup: {"from": "accounts", "localField": "account_id", "foreignField": "account_id", "as": "collecteur"}}
        ]);
        // const collectors = await Account.find({role: "collecteur"})
        return contact;
    }catch(error){
        console.log(error);
        throw error;
    }
  } */
}

module.exports = AccountController;
