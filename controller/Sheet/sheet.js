const moment = require('moment');

const SheetSchema = require("../../model/Schemas/sheet");
const Contacts = require('../../model/Schemas/contacts');
// const Projects = require('../../model/Schemas/project');
const Group = require('../../model/Schemas/gestion_projet');

class Calls {
  async createSheet(data, groupId, contactId, postId) {
    let sheet = await SheetSchema.updateOne(
      { group: groupId, created_at: moment().format('YYYY-MM-DD') },
      {
        group: groupId,
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
  async getAllSheets(projectId) {
    try {
      let groups = await Group.find({projectId: projectId}, {_id: 1});
      let groupsArray = groups.map(function (obj) { return obj._id; });
      let sheets = await SheetSchema
      .find({group: { $in: groupsArray }, created_at: moment().format('YYYY-MM-DD')}, { __v: 0, _id: 0 })
      .populate({
        path: "group",
        select: {
          __v: 0,
          created_at: 0,
        },
        populate: {
          path: 'postId',
          select: { name: 1 }
        }
      });
      return sheets;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTotalSheet() {
    try {
      let sheet = await SheetSchema.aggregate([
        {
          $match: {
            created_at: moment().format('YYYY-MM-DD')
          },
        },
        {
          $group: {
            _id: null,
            rdv: { $sum: "$rdv" },
            argument: { $sum: "$argument" },
            order: { $sum: "$order" },
            busy_call: { $sum: "$busy_call" },
            unavailable: { $sum: "$unavailable" },
            unreachable: { $sum: "$unreachable" },
            doNotCalls: { $sum: "$doNotCall" },
          },
        },
      ]);

      return sheet;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Calls;
