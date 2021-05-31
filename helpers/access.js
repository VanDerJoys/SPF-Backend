// Access level : admin, super admin, Télévendeurs
function defineAccess(type){
    if (type ==  'Super administrateur') {
        return "/super-administrateur";
    } else if(type == 'Administrateur'){
        return "/administrateur";
    }  else{
        // type == "Télévendeurs"
        return "/télé-vendeurs";
    }
}

module.exports = defineAccess;