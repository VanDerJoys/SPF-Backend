// const Account = require('../model/Schemas/account');
const Contact = require('../model/Schemas/contacts');

class AccountController{
    async addContact(data){
        try {
            const contact = new Contact({
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                cni: data.cni,
                contact_status: data.contact_status,
                quartier: data.quartier,
                status: data.status,
                date_naissance: data.date_naissance,
                town: data.town,
                archived: data.archived,
                quartier: data.quartier,
                situation: data.situation,
                number_children: data.number_children,
                yct_service: data.yct_service,
                amount: data.amount,
                tey_known: data.tey_known,
                parts: data.parts,
                consumption_habits: data.consumption_habits,
                paiement_habits: data.paiement_habits,
                muslim: data.muslim,
                anglophone: data.anglophone,
                cryptomonnaie: data.cryptomonnaie,
                product: data.product,
                consumption_reason: data.consumption_reason,
                mobile_network: data.mobile_network,
                facebook: data.facebook,
                twitter: data.twitter,
                instagram: data.instagram,
                profession: data.profession,
                family_or_alone: data.family_or_alone,
                habitat: data.habitat,
                paiement: data.paiement,
                deplacement: data.deplacement,
                frequence: data.frequence,
                stay_duration: data.stay_duration,
                budget: data.budget,
                smoking: data.smoking,
                provider: data.provider,
                e_commerce: data.e_commerce,
                best_selling: data.best_selling,
                least_selling: data.least_selling,
                time_limit: data.time_limit,
                price: data.price,
                problem: data.problem,
                showroom: data.showroom,
                speciality: data.speciality,
                type_carpentry: data.type_carpentry,
                weightloss: data.weightloss,
                beauty_product: data.beauty_product,
                weightloss_product: data.weightloss_product,
                type_care: data.type_care,
                service: data.service,
                suggestion: data.suggestion,
                project_id: data.project_id,
                account_id: data.account_id
                
            });
            let results = await contact.save();
            return results;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }

    async getAllContacts(){
        try {
            /* const contact = await Contact.aggregate([
                {$group:{_id:"$quartier",contacts: { $push: "$$ROOT" }}},
                {$project:{_id: 0}}
            ]); */
            const contact = await Contact.find({archived: false});
            return contact;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }

    async getBaseContacts(base_id){
        try {
            const contact = await Contact.find({base_id: base_id}, {'__v':0});
            return contact;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }

    async getProjectContacts(project_id){
        try {
            const contact = await Contact.find({project_id: project_id}, {'__v':0});
            return contact;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }
}

module.exports = AccountController;