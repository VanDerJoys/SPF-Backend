const Sheet = require('../model/Schemas/sheet');
const dataParser = require('../helpers/dashboard-data-parser');

class DashboardController{
// get Events
    async getDashboardData() {
        try {
            let sheets = await Sheet.aggregate([
                {
                    $group: {
                        _id: "$post",
                        calls: {
                            $sum: {
                                $add: [ "$rdv", "$argument", "$busy_call", "$unavailable", "$unreachable", "$order", "$doNotCall" ]
                            }
                        },
                        post: { $first: "$post" },
                    },
                },
            ]);
            let results = await Sheet.populate(sheets, {
                path: "post",
                select: {
                    __v: 0,
                    created_at: 0,
                    available: 0,
                    account: 0
                },
            });
            // return results;
            return dataParser(results);
        } catch (error) {
        console.log(error);
        throw error;
        }
    }
}

module.exports = DashboardController;