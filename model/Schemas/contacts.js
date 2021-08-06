const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    base_id: {
        type: mongoose.Schema.Types.ObjectId, // identifiant de la base
        ref: "Bases",
        required: false
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId, // identifiant du projet
        ref: "Projects",
        required: false
    },
    name:{  //Nom
        type: String,
        required: true
    },
    surname:{  //Prénom
        type: String,
        required: false
    },
    phone:{  //Numéro de téléphone
        type: String,
        required: true
    },
    cni:{ //Numéro de CNI
        type: String,
        required: false
    },
    quartier:{  //Quartier
        type: String,
        required: false
    },
    date_birth:{ //date de naissance
        type: String,
        required: false
    },
    town:{  //ville
        type: String,
        required: false
    },
    archived:{ //Archivé?
        type: Boolean,
        required: false,
        default: false
    },
    service: { 
        type: String,
        required: false
    },
    status:{ //locataire ou propiétaire
        type: String,
        required: false
    },
    marital_status:{  // Situation matrimoniale
        type: String,
        required: false
    },
    number_children:{  // Number d'enfant
        type: Number,
        required: false
    },
    yct_service:{  // Connait-il le service Yamo chez toi?
        type: Boolean,
        required: false
    },
    amount:{  // Montant de la commande
        type: Number,
        required: false
    },
    tey_known:{  // Comment le client a t-il connu Tchop et yamo ?
        type: String,
        required: false
    },
    parts:{  // Intéressé par des parts ?
        type: Boolean,
        required: false
    },
    consumption_habits:{  // Habitude de consommation
        type: String,
        required: false
    },
    paiement_habits:{  // Habtiude de paiement
        type: String,
        required: false
    },
    muslim:{  // Musulman 
        type: Boolean,
        required: false
    },
    anglophone:{ // Anglophone
        type: Boolean,
        required: false
    },
    cryptomonnaie:{  // Connait-il la cryptomonnaie?
        type: Boolean,
        required: false
    },
    consumed_product:{  // Produit consommé
        type: String,
        required: false
    },
    consumption_reason:{  // Raison de la consommation
        type: String,
        required: false
    },
    mobile_network:{  // Réseau mobile
        type: String,
        required: false
    },
    facebook:{
        type: String,
        required: false,
        default: "#####"
    },
    twitter:{
        type: String,
        required: false,
        default: "#####"
    },
    instagram:{
        type: String,
        required: false,
        default: "#####"
    },
    profession:{
        type: String,
        required: false
    },
    family_or_alone:{  // Le client vit seul ou en famille
        type: String,
        required: false
    },
    habitat:{  // Type d'habitat
        type: String,
        required: false
    },
    paiement:{
        type: String,  // paiement par l'entreprise ou par le client
        required: false
    },
    deplacement:{  // Habitude de déplacement: Seul ou accompagné
        type: String,
        required: false
    },
    frequence:{  // Fréquence de déplacement
        type: String,
        required: false
    },
    stay_duration:{  // Durée moyenne de séjour
        type: String,
        required: false
    },
    budget:{  // Budget moyen par nuitée
        type: String,
        required: false
    },
    smoking:{  // Est-il fumeur
        type: Boolean,
        required: false
    },
    provider:{  // fournisseur
        type: String,
        required: false
    },
    e_commerce:{  // Intéressé par le paiement en ligne ?
        type: Boolean,
        required: false
    },
    best_selling:{  // Produit le plus vendu
        type: String,
        required: false
    },
    least_selling:{  // Produit le moins vendu
        type: String,
        required: false
    },
    time_limit:{  // Délai de fabrication 
        type: String,
        required: false
    },
    price:{  // Prix moyen
        type: String,
        required: false
    },
    problem:{  // Problèmes rencontrés
        type: String,
        required: false
    },
    showroom:{  // Présence d'une salle d'exposition
        type: Boolean,
        required: false
    },
    speciality:{  // Produit le plus acheté ou le plus vendu
        type: String,
        required: false
    },
    type_carpentry:{  // type de menuiserie
        type: String,
        required: false
    },
    weightloss:{  // Intéressé par la perte de poids ?
        type: Boolean,
        required: false
    },
    beauty_product:{  // Produit de beauté déjà
        type: String,
        required: false
    },
    weightloss_product:{  // Produit contre le perte de poids déjà utilisé
        type: String,
        required: false
    },
    type_care:{  // Intérêt en matière de soin
        type: String,
        required: false
    },
    suggestion:{
        type: String,
        required: false
    },
    created_at:{
        type: Date,
        default: Date.now
    }
},  {
    toJSON: { 
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

module.exports = mongoose.model('Contacts', ContactSchema);