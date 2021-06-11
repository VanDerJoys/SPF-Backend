const FemmeFatale = require("../../model/Schemas/femme-fatale");

class FemmeFataleConstructor{
    constructor(plaint, base_name, name, phone, order, amount, observation, location, contact_status, payment_date, payment_status, posts, reco){
        this.base_name = base_name;
        this.name = name;
        this.phone = phone;
        this.order = order;
        this.amount = amount;
        this.observation = observation;
        this.location = location;
        this.contact_status = contact_status;
        this.payment_date = payment_date;
        this.payment_status = payment_status;
        this.posts = posts;
        this.reco = reco;
        this.plaint = plaint
    }

    addContact(){
        return new Promise((resolve, reject)=>{
            const contact = new FemmeFatale({
                plaint: this.plaint,
                base_name: this.base_name,
                name: this.name,
                phone: this.phone,
                order: this.order,
                amount: this.amount,
                observation: this.observation,
                location: this.location,
                contact_status: this.contact_status,
                payment_date: this.payment_date,
                payment_status: this.payment_status,
                posts: this.posts,
                recommandation: this.reco
            });
            contact.save().then(data =>{
                resolve(data);
            }).catch(err =>{
                reject(err);
            })
        })
    }
}

module.exports = FemmeFataleConstructor;