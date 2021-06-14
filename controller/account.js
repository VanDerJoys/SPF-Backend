const Account = require('../model/Schemas/account');
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

    async register(name, surname, phone, password, type){
        let hashedPassword = await this.hashPassword(password);
        const account = new Account({
            name: name,
            surname: surname,
            phone: phone,
            password: hashedPassword,
            type: type
        });
        try {
            let message = await account.save();
            return {code : 200, message: message}
        } catch (error) {
            console.log("Controller: "+error);
            return {code:400, message:"Une erreur est survenue"}
        }
    }

    async getAccounts(){
        try {
            let accounts = await Account.find({phone: "677783356"})
            return accounts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteAccount(id){
        try {
            let accounts = await Account.deleteOne({_id: id})
            return accounts;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = AccountController;