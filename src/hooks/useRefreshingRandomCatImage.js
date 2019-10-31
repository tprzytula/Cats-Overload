import { useState, useEffect, useCallback } from 'react';
import useImage from './useImage';
import catAPIRequest from '../utils/catAPIRequest';

export const fetchCat = async (category) => {
	const baseUrl = 'https://api.thecatapi.com/v1/images/search?size=full';
	const fetchUrl = category ? `${ baseUrl }&category_ids=${ category }` : baseUrl;

	return await catAPIRequest(fetchUrl);
};

function useRefreshingRandomCatImage(refreshRate, category) {
	const [ catImage, setCatImage ] = useState(null);
	const [ randomCat, setRandomCat ] = useState({ url: null });
	const [ image, status ] = useImage(randomCat.url);
	const memoizedFetchCat = useCallback(
		() => {
			fetchCat(category).then(result => setRandomCat(result[0]));
		},
		[category],
	);

	useEffect(() => {
		memoizedFetchCat();
	}, [ memoizedFetchCat ]);

	useEffect(() => {
		let timeout;
		const newImageFinishedLoading = status === 'loaded';

		if (newImageFinishedLoading) {
			setCatImage(image);

			if (refreshRate) {
				timeout = setTimeout(memoizedFetchCat, refreshRate);
			}
		}

		return () => { clearTimeout(timeout) }
	}, [ status, refreshRate, image, category, memoizedFetchCat ]);

	return [ catImage ];
}

export default useRefreshingRandomCatImage;
