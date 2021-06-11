// Access level : admin, super admin, Télévendeurs
function defineAccess(type){
    if (type ==  'superAdministrateur') {
        return "/superAdministrateur";
    } else if(type == 'Administrateur'){
        return "/administrateur";
    }  else{
        // type == "Télévendeur"
        return "/télé-vendeurs";
    }
}

module.exports = defineAccess;