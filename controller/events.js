const Event = require('../model/Schemas/events');

class EventController{
    
    async createEvent(post, name, start, details){
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
                            details: details,
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
            let results = await Event.findOne({post: post}, {__v: 0, created_at: 0});
            let events = [];
            let allEvents = [];
            if(results){
                events = new Array(results.events);
                events.forEach(event => {
                    allEvents.push({
                        name: event.name,
                        details: event.details,
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

    async deleteEvent(postId, eventId){
        try {
            let results = await Event.updateOne({post: postId}, {$pull: {events: {_id: eventId}}});
            return results;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addAudioFilePath(postEventsId, eventId, audio){
        try {
            let results = await Event.updateOne({_id: postEventsId, "events._id": eventId}, {$set: {"events.$.audio": audio}});
            return results;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = EventController;