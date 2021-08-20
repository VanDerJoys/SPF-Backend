const SheetSchema = require("../../model/Schemas/sheet");
const mongoose = require("mongoose");

class Calls {
  //   constructor(
  //     post_id,
  //     call,
  //     notebook,
  //     argument,
  //     order,
  //     busy_call,
  //     unavailable,
  //     unreachable,
  //     do_not_call,
  //     tranche
  //   ) {
  //     this.post_id = post_id;
  //     this.call = call;
  //     this.notebook = notebook;
  //     this.argument = argument;
  //     this.order = order;
  //     this.busy_call = busy_call;
  //     this.unavailable = unavailable;
  //     this.unreachable = unreachable;
  //     this.do_not_call = do_not_call;
  //     this.tranche = tranche;
  //   }
  async createSheet(data) {
    const sheet = new SheetSchema({
      post_id: data.post_id,
      calls: data.calls,
      notebooks: data.notebooks,
      arguments: data.arguments,
      orders: data.orders,
      busy_calls: data.busy_calls,
      unavailable: data.unavailable,
      unreachable: data.unreachable,
      do_not_call: data.do_not_call,
      tranche: data.tranche,
    });
    try {
      let results = await sheet.save();
      return results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSheetOfADate(date1, date2) {
    try {
      const date1Search = new Date(date1);
      const date2Search = new Date(date2);
      let sheets = await SheetSchema.aggregate([
        {
          $match: {
            created_at: { $gte: date1Search, $lte: date2Search },
          },
        },
        {
          $group: {
            _id: "$post_id",
            calls: { $sum: "$calls" },
            notebooks: { $sum: "$notebooks" },
            arguments: { $sum: "$arguments" },
            orders: { $sum: "$orders" },
            busy_calls: { $sum: "$busy_calls" },
            unavailable: { $sum: "$unavailable" },
            unreachable: { $sum: "$unreachable" },
            do_not_call: { $sum: "$do_not_call" },
            post_id: { $push: "$post_id" },
          },
        },
      ]);
      let results = await SheetSchema.populate(sheets, {
        path: "post_id",
        select: {
          __v: 0,
          created_at: 0,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  
  async getAllSheetsOfOnePost(post_id) {
    try {
      let sheets = await SheetSchema.find({ post: post_id }, { __v: 0 });
      return sheets;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteOneSheet(sheet_id) {
    try {
      let call = await SheetSchema.deleteOne({ _id: sheet_id });
      return call;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Calls;
