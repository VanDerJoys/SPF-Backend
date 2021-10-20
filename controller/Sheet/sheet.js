const SheetSchema = require("../../model/Schemas/sheet");
const Contacts = require('../../model/Schemas/contacts');
const dataParser = require('../../helpers/dashboard-data-parser');
const mongoose = require("mongoose");

class Calls {
  async createSheet(data, postId, contactId) {
    let sheet = await SheetSchema.updateOne(
      { post: postId },
      {
        post: postId,
        $inc: { //increment the value of contact qualification
          rdv: data == "s2" ? 1 : 0, 
          argument: data == "s1" ? 1 : 0, 
          order: data == "s3" ? 1 : 0, 
          busy_call: data == "s4" ? 1 : 0, 
          unavailable: data == "s5" ? 1 : 0, 
          unreachable: data == "s6" ? 1 : 0, 
          doNotCall: data == "s7" ? 1 : 0
        } 
      },
      { upsert: true },
    );

    await Contacts.updateOne({_id: contactId}, {"$set":{archived: true}});

    return sheet;
  }

  // get all sheets grouped by post
  async getAllSheets() {
    try {
      let sheets = await SheetSchema
      .find({}, { __v: 0, _id: 0 })
      .populate({
        path: "post",
        select: {
          __v: 0,
          created_at: 0,
        },
      });

      return sheets;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSheetOfOnePost(post_id) {
    try {
      let sheets = await SheetSchema.aggregate([
        {
          $match: {
            post_id: mongoose.Types.ObjectId(post_id),
            created_at: new Date().toDateString()
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

  async getDashboardData() {
    try {
      let sheets = await SheetSchema.aggregate([
        {
          $group: {
            _id: "$post",
            // calls: { $sum: "$calls" },
            // notebooks: { $sum: "$notebooks" },
            // arguments: { $sum: "$arguments" },
            order: { $sum: "$order" },
            // busy_calls: { $sum: "$busy_calls" },
            // unavailable: { $sum: "$unavailable" },
            // unreachable: { $sum: "$unreachable" },
            // do_not_call: { $sum: "$do_not_call" },
            post: { $push: "$post" },
          },
        },
      ]);
      let results = await SheetSchema.populate(sheets, {
        path: "post",
        select: {
          __v: 0,
          created_at: 0,
          available: 0,
          account: 0
        },
      });

      return dataParser(results);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


}

module.exports = Calls;
