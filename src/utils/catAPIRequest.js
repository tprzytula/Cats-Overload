import { API_KEY } from '../config/config';

const baseUrl = 'https://api.thecatapi.com/v1';

export const catAPIRequest = async endpoint => {
	const response = await fetch(`${ baseUrl }/${ endpoint }`, {
		method: 'GET',
		headers: {
			'x-api-key': API_KEY
		}
	});

	return await response.json();
};

export const fetchCat = async (category = '') => {
	const [ cat ] = await catAPIRequest(`images/search?size=full&category_ids=${ category }`);

	return cat;
};

export const fetchCatCategories = async () => {
	return await catAPIRequest('categories');
};
