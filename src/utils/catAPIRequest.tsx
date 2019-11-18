import { API_KEY } from '../config/config.json';
import { ICategoryResponse, ICatImage } from '../types/theCatApi';
const baseUrl = 'https://api.thecatapi.com/v1';

export const catAPIRequest = async (endpoint: string): Promise<any> => {
	const response = await fetch(`${ baseUrl }/${ endpoint }`, {
		method: 'GET',
		headers: {
			'x-api-key': API_KEY
		}
	});

	return await response.json();
};

export const fetchCat = async (category:number | string = ''): Promise<ICatImage> => {
	const [ cat ] = await catAPIRequest(`images/search?size=full&category_ids=${ category }`);

	return cat;
};

export const fetchCatCategories = async (): Promise<ICategoryResponse[]> => {
	return await catAPIRequest('categories');
};
