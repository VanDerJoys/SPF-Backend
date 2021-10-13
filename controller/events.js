const Event = require('../model/Schemas/events');

class EventController{
    
    async createEvent(post, name, start){
        function rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a;
        }
        const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];
        try {
            let event = await Event.updateOne(
                { post: post }, 
                {
                    $push: {
                        events: {
                            name: name, 
                            start: start, 
                            color: colors[rnd(0, colors.length - 1)], 
                            timed: true
                        }
                    }
                },
                { upsert: true }
            )
            return event;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

// get Events
    async getEvents(post){
        try {
            let results = await Event.findOne({post: post}, {__v: 0, created_at: 0, _id: 0});
            let events = [];
            let allEvents = [];
            if(results){
                events = new Array(results.events);
                events.forEach(event => {
                    allEvents.push({
                        name: event.name,
                        start: event.start,
                        color: event.color,
                        timed: event.timed
                    })
                });
                return events;
            }
            return results;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = EventController;