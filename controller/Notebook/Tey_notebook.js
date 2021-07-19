const TeyContacts = require("../../model/Tchopetyamo/Tchopetyamo-contacts");

class TeyNotebookController{
    async addNotebook(contactId, period){
        try {
            let notebook = await TeyContacts.updateOne({_id: contactId}, {rdv: period});
            return notebook;
        } catch (error) {
            console.log("controller: "+error);
            throw error;
        }
    }

    async deleteNotebook(contactId){
        try {
            let notebook = await TeyContacts.updateOne({_id: contactId}, {$unset: {rdv: 1}});
            return notebook;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }
}

module.exports = TeyNotebookController;