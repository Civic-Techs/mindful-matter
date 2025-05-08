import { fetchData } from './handleFetch.js';
import { getPostOptions, getPatchOptions } from "./utils";

const baseUrl = '/api/users';

export const createUser = async ({ name, bio, profile_img, email, username, password_hash }) => {
    try {
        return fetchData(baseUrl, getPostOptions({ name, bio, profile_img, email, username, password_hash }))
    } catch (e) {
        console.error('Error creating user: ', e);
        throw new Error(e.message || 'an unexpected error occurred');
    }
}

export const getUser = async (id) => {
    try {
        return fetchData(`${baseUrl}/${id}`);
    } catch (e) {
        console.error('Error fetching user: ', e);
        throw new Error(e.message || 'an unexpected error occurred');
    }
};

export const updateUser = async (id, data) => {
    const allowedFields = ['name', 'bio', 'profile_img', 'email', 'username'];

    const sanitizedData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => allowedFields.includes(key) && value !== undefined)
    );

    if (Object.keys(sanitizedData).length === 0) {
        throw new Error("No valid fields provided for update.");
    }


    try {
        return fetchData(`${baseUrl}/${id}`, getPatchOptions(sanitizedData));
    } catch (e) {
        console.error(`Error updating user ${id}: `, e);
        throw new Error(e.message || 'an unexpected error occurred');
    }
};
