const Account = require('../model/Schemas/account');
const Post = require('../model/Schemas/post');
const defineAccess = require('../helpers/access');
const bcrypt = require('bcryptjs');

class AccountController{
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    async logUser(phone, password){
        // checking if the phone number exists
        let user = await Account.findOne({phone: phone});
        if(!user) return {code: 400, message: "le numéro de téléphone est incorrecte"};
        
        // checking password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return {code : 400, message : "Le mot de passe est incorrecte"}

        return user;
    }

    async register(name, surname, phone, password, type, postId){
        let hashedPassword = await this.hashPassword(password);
        try {
            if(type == "Télévendeur"){
                const account = new Account({
                    name: name,
                    surname: surname,
                    phone: phone,
                    password: hashedPassword,
                    type: type,
                    post: postId
                });
                const post = await Post.updateOne({_id: postId}, {available: false});
                let results = await account.save();
                return {code : 200, message: results};
            }else{
                const account = new Account({
                    name: name,
                    surname: surname,
                    phone: phone,
                    password: hashedPassword,
                    type: type
                });
                let results = await account.save();
                return {code : 200, message: results}
            }
        } catch (error) {
            console.log("Controller: "+error);
            return {code:400, message:"Une erreur est survenue"}
        }
    }

    async getAccounts(){
        try {
            let accounts = await Account
            .find()
            .select({"password": 0});
            return accounts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteAccount(id, postId){
        try {
            let account = await Account.deleteOne({"_id": id});
            await Post.updateOne({_id: postId}, {available: true});
            return account;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async updateAccount(id, name, surname, phone, type, post){
        try {
            let account = await Account.updateOne({"_id" : id}, {
                name: name,
                surname: surname,
                phone: phone,
                type: type,
                post: post
            });
            return account;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async archiveAccount(id){
        try {
            let account = await Account.findOne({"_id" : id})
            account = await Account.updateOne({"_id" : id}, {"status": (account.status ? 0 : 1)});
            return account;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async updateRole(id, role){
        try {
            let account = await Account.updateOne({"_id" : id}, { type: role })
            return account;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = AccountController;