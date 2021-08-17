const SheetSchema = require('../../model/Schemas/sheet');
const mongoose = require('mongoose');

class Calls{
    constructor(post_id, call, notebook, argument, order, busy_call, unavailable, unreachable, do_not_call){
        this.post_id = post_id;
        this.call = call;
        this.notebook = notebook;
        this.argument = argument;
        this.order = order;
        this.busy_call = busy_call;
        this.unavailable = unavailable;
        this.unreachable = unreachable;
        this.do_not_call = do_not_call;
    }

    async createSheet(){
        try{
            let sheet = new SheetSchema({
                post: this.post_id,
                calls: this.call,
                notebooks: this.notebook,
                arguments: this.argument,
                orders: this.order,
                busy_calls: this.busy_call,
                unavailable: this.unavailable,
                unreachable: this.unreachable,
                do_not_call: this.do_not_call
            });
            let results = await sheet.save();
            return results;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getSheetOfOnePost(post_id){
        try {
            let sheets = await SheetSchema.aggregate([
                {
                    $match: {
                        post: mongoose.Types.ObjectId(post_id) 
                    }
                },
                {
                    $group: {
                        _id: "$post",
                        totalCalls: { $sum: "$calls" },
                        totalNotebooks: { $sum: "$notebooks"},
                        totalArguments: { $sum: "$arguments"},
                        totalOrders: { $sum: "$orders"},
                        totalBusy_calls: { $sum: "$busy_calls" },
                        totalUnavailables: { $sum: "$unavailable" },
                        totalUnreachables: { $sum: "$unreachable" },
                        totalDo_not_calls: { $sum: "$do_not_call" }
                    }
                }
            ])
            return sheets;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteOneSheet(sheet_id){
        try {
            let call = await SheetSchema.deleteOne({_id: sheet_id}, {__v: 0});
            return call;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }    
}   

module.exports = Calls;