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
    // checking if the phone number exists
    let user = await Account.findOne({ phone: phone })
      .populate("project_id")
      .populate("post_id");
    if (!user)
      return { code: 400, message: "le numéro de téléphone est incorrecte" };

    // checking password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return { code: 400, message: "Le mot de passe est incorrecte" };

    return user;
  }

  async register(name, surname, phone, password, role, project_id, post_id) {
    let hashedPassword = await this.hashPassword(password);
    try {
      const account = new Account({
        name: name,
        surname: surname,
        phone: phone,
        password: hashedPassword,
        role: role,
        project_id: project_id,
        post_id: post_id,
      });
      let results = await account.save();
      return { code: 201, message: results };
    } catch (error) {
      console.log("Controller: " + error);
      return { code: 400, message: error };
    }
  }

  async getAccounts() {
    try {
      let accounts = await Account.find()
        .select({ password: 0 })
        .populate("project_id")
        .populate("post_id");
      return accounts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getAccountsArchived() {
    try {
      let accounts = await Account.find({ status: true }).select({
        password: 0,
      });
      return accounts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getAccountsTelevendeur() {
    try {
      let accounts = await Account.find({
        status: false,
        type: "Télévendeur",
        post_id: null,
      }).select({
        password: 0,
      });
      return accounts;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteAccount(id, postId) {
    try {
      let account = await Account.deleteOne({ _id: id });
      await Post.updateOne({ _id: postId }, { available: true });
      return account;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateAccount(id, name, surname, phone, post_id) {
    console.log("isi");
    try {
      let account = await Account.updateOne(
        { _id: id },
        {
          name: name,
          surname: surname,
          phone: phone,
          post_id: post_id,
        }
      );
      return account;
    } catch (error) {
      console.log(error);
      return error;
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
      return error;
    }
  }

  async assignPost(postId, accountId) {
    try {
      await Post.updateOne({ _id: postId }, { available: false });
      let account = await Account.updateOne(
        { _id: accountId },
        { post_id: postId }
      );
      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // Assign a project to an account
  async assignProject(account_id, project_id) {
    try {
      const project = new ProjectManager({
        project_id: project_id,
        account_id: account_id,
      });

      let result = await project.save();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getProjectByAccount(account_id) {
    try {
      let projectManagers = await ProjectManager.find({
        account_id: account_id,
      }).populate("project_id");
      return projectManagers;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = AccountController;
