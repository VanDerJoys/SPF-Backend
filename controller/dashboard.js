const Sheet = require('../model/Schemas/sheet');
const dataParser = require('../helpers/dashboard-data-parser');

const moment = require('moment');

class DashboardController{

    async getPeriodicData(period){
        try {
            let sheets = await Sheet.aggregate([
                {
                    $match: {
                        created_at: period
                    }
                },
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
            return dataParser(results);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
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
            return dataParser(results);
        } catch (error) {
        console.log(error);
        throw error;
        }
    }

    async getToday(){
        let results = await this.getPeriodicData(moment().format('YYYY-MM-DD'));
        return results;
    }

    async getYesterday(){
        let results = await this.getPeriodicData(moment().subtract(1, 'days').format('YYYY-MM-DD'));
        return results;
    }

    async getSevenDays(){
        let results = await this.getPeriodicData(moment().subtract(7, 'days').format('YYYY-MM-DD'));
        return results;
    }

    async getThirtyDays(){
        let results = await this.getPeriodicData(moment().subtract(30, 'days').format('YYYY-MM-DD'));
        return results;
    }
}

module.exports = DashboardController;