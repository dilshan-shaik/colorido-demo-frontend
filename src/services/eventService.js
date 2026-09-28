import {
    fetchEvents,
    fetchEvent
} from "./api";

const eventService = {

    getAllEvents: async () => {

        return await fetchEvents();

    },

    getEventById: async (id) => {

        return await fetchEvent(id);

    }

};

export default eventService;