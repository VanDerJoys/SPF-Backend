const FemmeFataleContacts = require("../../model/Femme-fatale/Femme-fatale-contacts");

class FemmeFataleNotebookController{
    async addNotebook(contactId, period){
        try {
            let notebook = await FemmeFataleContacts.updateOne({_id: contactId}, {rdv: period});
            return notebook;
        } catch (error) {
            console.log("controller: "+error);
            throw error;
        }
    }

    async deleteNotebook(contactId){
        try {
            let notebook = await FemmeFataleContacts.updateOne({_id: contactId}, {$unset: {rdv: 1}});
            return notebook;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }
}

module.exports = FemmeFataleNotebookController;