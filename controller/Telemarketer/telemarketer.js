const Marketer = require("../../model/Telemarketer/telemarketer");

const db = new Marketer();
class MarketerController{
    async getMarketer(){
        try {
            let response = await db.getMarketer();
            return response[0];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MarketerController