import { useState, useEffect, useCallback } from 'react';
import useImage from './useImage';
import catAPIRequest from '../utils/catAPIRequest';

export const fetchCat = async category => {
	const baseUrl = 'https://api.thecatapi.com/v1/images/search?size=full';
	const fetchUrl = category && category.value ? `${ baseUrl }&category_ids=${ category.value }` : baseUrl;

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
		[ category ],
	);

	useEffect(() => {
		memoizedFetchCat();
	}, [ memoizedFetchCat ]);

	useEffect(() => {
		if (!catImage) return;

		const timeout = setTimeout(memoizedFetchCat, refreshRate);

		return () => { clearTimeout(timeout) }
	}, [ refreshRate, memoizedFetchCat, catImage ]);

	useEffect(() => {
		const newImageFinishedLoading = status === 'loaded';

		if (newImageFinishedLoading) {
			setCatImage(image);
		}
	}, [ status, image, memoizedFetchCat ]);

	return [ catImage ];
}

export default useRefreshingRandomCatImage;
