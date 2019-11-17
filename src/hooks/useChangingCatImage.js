import { useEffect, useCallback, useReducer } from 'react';
import usePreloadImage from './usePreloadImage';
import { fetchCat } from '../utils/catAPIRequest';

function catImageReducer(state, action) {
	switch (action.type) {
		case "CATEGORY_CHANGED": {
			return {
				currentCat: null,
				nextCat: null
			}
		}
		case "IMAGE_SELECTED": {
			return {
				...state,
				nextCat: action.catImage
			};

		}
		case "IMAGE_LOADED": {
			return {
				currentCat: state.nextCat,
				nextCat: null
			};
		}
		default: {
			throw new Error(`Unhandled action type: ${ action.type }`);
		}
	}
}

function useChangingCatImage(refreshRate, catCategory) {
	const [{ currentCat, nextCat }, dispatch] = useReducer(catImageReducer, {
		currentCat: null,
		nextCat: null
	});
	const [ status ] = usePreloadImage(nextCat);
	const selectNextCatDetails = useCallback(
		() => {
			fetchCat(catCategory).then(result => dispatch({
				type: 'IMAGE_SELECTED',
				catImage: result
			}));
		},
		[ catCategory ],
	);

	useEffect(() => {
		selectNextCatDetails();
	}, [ selectNextCatDetails ]);

	useEffect(() => {
		dispatch({ type: 'CATEGORY_CHANGED'});
	}, [ catCategory ]);

	useEffect(() => {
		if (status === 'loaded') {
			dispatch({ type: 'IMAGE_LOADED' });
		}
	}, [ status ]);

	useEffect(() => {
		const timeout = setTimeout(selectNextCatDetails, refreshRate);

		return () => {
			clearTimeout(timeout);
		}
	}, [ currentCat, refreshRate, selectNextCatDetails ]);

	return [ currentCat ]
}

export default useChangingCatImage;
