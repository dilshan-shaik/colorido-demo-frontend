import { getAuthHeaders } from './auth';

const BASE_URL = '/api';

async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();

        let message = errorText;

        try {
            const json = JSON.parse(errorText);
            message = json.message || json.error || errorText;
        } catch {
            // Response was not JSON
        }

        throw new Error(
            message || `Request failed with status ${response.status}`
        );
    }

    const contentType = response.headers.get('content-type');

    if (
        contentType &&
        contentType.includes('application/json')
    ) {
        return response.json();
    }

    return response.text();
}

const resultService = {

    // ==========================================
    // GET ALL RESULTS - ADMIN
    // ==========================================

    getAllResults: async () => {

        const response = await fetch(
            `${BASE_URL}/results`
        );

        return handleResponse(response);
    },


    // ==========================================
    // GET PUBLISHED RESULTS
    // ==========================================

    getPublishedResults: async () => {

        const response = await fetch(
            `${BASE_URL}/results/published`
        );

        return handleResponse(response);
    },


    // ==========================================
    // GET RESULTS BY EVENT - ADMIN
    // ==========================================

    getResultsByEvent: async (eventId) => {

        const response = await fetch(
            `${BASE_URL}/results/event/${eventId}`,
            {
                headers: getAuthHeaders()
            }
        );

        return handleResponse(response);
    },


    // ==========================================
    // GET PUBLISHED RESULTS BY EVENT - PUBLIC
    // ==========================================

    getPublishedResultsByEvent: async (eventId) => {

        const response = await fetch(
            `${BASE_URL}/results/event/${eventId}/published`
        );

        return handleResponse(response);
    },


    // ==========================================
    // CREATE RESULT - ADMIN
    // ==========================================

    createResult: async (eventId, result) => {

        const response = await fetch(
            `${BASE_URL}/results/event/${eventId}`,
            {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(result)
            }
        );

        return handleResponse(response);
    },


    // ==========================================
    // UPDATE RESULT - ADMIN
    // ==========================================

    updateResult: async (
        id,
        eventId,
        result
    ) => {

        const response = await fetch(
            `${BASE_URL}/results/${id}/event/${eventId}`,
            {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(result)
            }
        );

        return handleResponse(response);
    },


    // ==========================================
    // DELETE RESULT - ADMIN
    // ==========================================

    deleteResult: async (id) => {

        const response = await fetch(
            `${BASE_URL}/results/${id}`,
            {
                method: 'DELETE',
                headers: getAuthHeaders()
            }
        );

        return handleResponse(response);
    },


    // ==========================================
    // PUBLISH / UNPUBLISH
    // ==========================================

    togglePublish: async (id) => {

        const response = await fetch(
            `${BASE_URL}/results/${id}/toggle-publish`,
            {
                method: 'PATCH',
                headers: getAuthHeaders()
            }
        );

        return handleResponse(response);
    }

};

export default resultService;