const Model = require('../model/account');
const defineAccess = require('../helpers/access');
const bcrypt = require('bcryptjs');

const db = new Model();
class Account{
    constructor(tel, password) {
        this.tel = tel;
        this.password = password;
    }
    
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    };

    async logUser(){
        let results =  await db.findUser(this.tel);
        if (results[0][0] == {} || results[0][0] == [] || results[0][0] == undefined) {
            return {code: 400, message: "le numéro de téléphone est incorrecte"}
        }
        const validPassword = await bcrypt.compare(this.password, results[0][0].password);
        if (!validPassword) {
            return {code : 400, message : "Le mot de passe est incorrecte"}
        }
        return {path: defineAccess(results[0][0].type), user_data: results[0][0]};
    }

    async register(nom, prenom, tel, password, type){
        let hashedPassword = await this.hashPassword(password);
        try {
            let message = await db.register(nom, prenom, tel, hashedPassword, type);
            return {code : 200, message: message}
        } catch (error) {
            console.log("Controller: "+error);
            return {code:400, message:"Une erreur est survenue"}
        }
    }
}

module.exports = Account;