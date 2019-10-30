import { API_KEY } from '../config/config';

const catAPIRequest = async url => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'x-api-key': API_KEY
		}
	});

	return await response.json();
};

export default catAPIRequest;
