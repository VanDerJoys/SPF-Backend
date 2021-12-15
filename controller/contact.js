const Contact = require('../model/Schemas/contacts');

class AccountController {
  async addContact(data, id) {
    try {
      const contact = new Contact({
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        town: data.town,
        birthdate: data.birthdate,
        group: id
      });
      let results = await contact.save();
      return results;
    } catch (error) {
      console.log("Controller: " + error);
      throw error;
    }
  }

  async addUploadedContacts(contacts){
    try {
      let results = await Contact.insertMany(contacts);
      return results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getContacts(groupId) {
    try {
      let contact = await Contact.find({ group: groupId, archived: false }, { __v: 0, created_at: 0 });
      return contact;
    } catch (error) {
      console.log("Controller: " + error);
      throw error;
    }
  }

  async getInactiveContacts() {
    try {
      let contact = await Contact.find({ archived: true }, { __v: 0, created_at: 0 });
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

  async activateContacts(){
    try {
      const results = await Contact.updateMany({archived: true}, {archived: false});
      return results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = AccountController;
