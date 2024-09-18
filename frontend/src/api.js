import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class Api {
    static token = null;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${Api.token}` };
        method = (method || 'get').toLowerCase();

        try {
            const response = await axios({ url, method, data, headers });
            return response.data;
        } catch (err) {
            console.error('API Error:', err.response || err);
            const message = err.response?.data?.error?.message || 'An error occurred';
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async login(data) {
        console.log('front api request');
        const res = await this.request('auth/token', data, 'post');
        console.log('front api request result', res);
        Api.token = res.token;
        localStorage.setItem('token', res.token);
        return res.token;
    }

    static async updateUser(username, updatedData) {
        console.log('Updating user with data:', updatedData);
        try {
            const res = await this.request(`users/${username}`, updatedData, 'patch');
            console.log('API Response:', res.user);
            return res.user;
        } catch (err) {
            console.error('API updateUser error', err.response || err);
            const message = err.response?.data?.error?.message || 'Failed to update user profile';
            throw new Error(message);
        }
    }

    static async getCurrentUser(username) {
        const res = await this.request(`users/${username}`);
        return res.user;
    }

    static async saveLog(logData) {
        return await this.request('tdee', logData, 'post');
    }

    static async fetchTDEELogs(userId, startDate) {
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        console.debug('Fetching TDEE logs with userId:', userId, 'and startDate:', formattedStartDate);
        const response = await this.request(
            `tdee/${userId}?startDate=${encodeURIComponent(formattedStartDate)}`,
            {},
            'get'
        );
        console.debug('Fetched TDEE logs:', response);
        return response;
    }

    static async fetchNutritionLogs(userId) {
        return await this.request(`nutritionLogs/${userId}`);
    }

    static async fetchActivityLogs(userId) {
        return await this.request(`activityLogs/${userId}`);
    }

    // Added method to fetch logs by date range
    static async fetchTDEELogsByDateRange(userId, startDate, endDate) {
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
        console.debug(
            'Fetching TDEE logs with userId:',
            userId,
            'from startDate:',
            formattedStartDate,
            'to endDate:',
            formattedEndDate
        );
        const response = await this.request(
            `tdee/${userId}?startDate=${encodeURIComponent(formattedStartDate)}&endDate=${encodeURIComponent(
                formattedEndDate
            )}`,
            {},
            'get'
        );
        console.debug('Fetched TDEE logs by date range:', response);
        return response;
    }
}

export default Api;