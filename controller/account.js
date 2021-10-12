const Account = require("../model/Schemas/account");
const Post = require("../model/Schemas/post");
const ProjectManager = require("../model/Schemas/gestion_projet");
const bcrypt = require("bcryptjs");

class AccountController {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async logUser(phone, password) {
    // Checking if the phone number exists
    let user = await Account.findOne({ phone: phone });
    if (!user)
      return { code: 400, message: "le numéro de téléphone est incorrecte" };

    // Checking password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return { code: 400, message: "Le mot de passe est incorrecte" };
    // Checking user type
    if (user.type == "Télévendeur") {
      let post = await Post.findOne({account: user._id}, {__v: 0, available: 0, created_at: 0})
      .populate({path: 'account', select: { 
        password: 0,
        created_at: 0,
        archived: 0,
        __v: 0,
       }})
      return post;
    }else{
      return { name: user.name, surname: user.surname, type: user.type }
    }
  }

  async register(name, surname, phone, type, password) {
    try {
      const account = new Account({
        name: name,
        surname: surname,
        phone: phone,
        type: type,
        password: await this.hashPassword(password)
      });
      let results = await account.save();
      return results;
    } catch (error) {
      console.log("Controller: " + error);
      throw error
    }
  }

  async getAccounts() {
    try {
      let accounts = await Account.find()
        .select({ password: 0 });
      return accounts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAccountsTelemarketer() {
    try {
      let accounts = await Account.find({
        archived: false,
        type: "Télévendeur",
      }).select({
        password: 0,
      });
      return accounts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteAccount(id) {
    try {
      let account = await Account.deleteOne({ _id: id });
      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAccount(id, name, surname, phone, type) {
    try {
      let account = await Account.updateOne(
        { _id: id },
        {
          name: name,
          surname: surname,
          phone: phone,
          type: type,
        }
      );
      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async archiveAccount(id) {
    try {
      let account = await Account.findOne({ _id: id });
      account = await Account.updateOne(
        { _id: id },
        { archived: account.archived ? false : true }
      );
      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // delete project assignation
  async deleteProjectAssignation(account_id, project_id){
    try{
      let project = ProjectManager.deleteOne({account_id: account_id, project_id: project_id});
      return project;
    }
    catch(error){
      console.log('Controller: '+error);
      throw error;
    }
  }
}

module.exports = AccountController;
