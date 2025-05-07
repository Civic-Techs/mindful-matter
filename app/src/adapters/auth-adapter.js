import { fetchData } from './handleFetch.js';
import { getPostOptions, deleteOptions } from './utils.js';

const baseUrl = '/api'

export const signUserUp = async ({ name, dob, bio, profile_img, email, username, password }) => {
	try {
		return fetchData(`${baseUrl}/signup`, getPostOptions({ name, dob, bio, profile_img, email, username, password }));
	} catch (e) {
		console.error('Error completing sign up: ', e);
		throw new Error(e.message || 'an unexpected error occurred');
	}
}

export const checkForLoggedInUser = async () => {
	try {
		return fetchData(`${baseUrl}/me`);
	} catch (e) {
		console.error('Error fetching logged-in user: ', e);
		throw new Error(e.message || 'an unexpected error occurred');
	}
}

export const logUserIn = async ({ username, password }) => {
	try {
		return fetchData(`${baseUrl}/login`, getPostOptions({ username, password }));
	} catch (e) {
		console.error('Error logging user in: ', e);
		throw new Error(e.message || 'an unexpected error occurred');
	}
};

export const logUserOut = async () => {
	try {
		await fetchData(`${baseUrl}/logout`, deleteOptions);
		return true;
	} catch (e) {
		console.error('Error logging user out: ', e);
		throw new Error(e.message || 'an unexpected error occurred');
	}
};
