import { useState, useEffect, useCallback } from 'react';
import useImage from './useImage';
import { fetchCat } from '../utils/catAPIRequest';

function useRefreshingRandomCatImage(refreshRate, selectedCategory) {
	const [ catImage, setCatImage ] = useState(null);
	const [ randomCat, setRandomCat ] = useState({ url: null });
	const [ image, status ] = useImage(randomCat.url);
	const memoizedFetchCat = useCallback(
		() => {
			fetchCat(selectedCategory?.value).then(result => setRandomCat(result[0]));
		},
		[ selectedCategory ],
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
