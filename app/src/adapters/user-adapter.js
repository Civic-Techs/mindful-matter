import { fetchData } from './handleFetch.js';
import { getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/users';

export const createUser = async ({ username, password, display_name, pronouns, pfp_src }) => {
    try {
        return fetchHandler(baseUrl, getPostOptions({ username, password, display_name, pronouns, pfp_src }))
    } catch (e) {
        console.error('Error creating user: ', e);
        throw new Error(e.message || 'an unexpected error occurred');
    }
}

export const getUser = async (id) => {
    try {
        return fetchHandler(`${baseUrl}/${id}`)
    } catch (e) {
        console.error('Error fetching user: ', e);
        throw new Error(e.message || 'an unexpected error occurred');
    }
};

export const updateUsername = async ({ id, username }) => (
    fetchData(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
);
export const updateUser = async (id, data) => {
    return fetchData(`${baseUrl}/${id}`, getPatchOptions(data));
};