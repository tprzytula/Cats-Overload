import React, { useEffect, useCallback, useReducer } from 'react';
import usePreloadImage from './usePreloadImage';
import { fetchCat } from '../utils/catAPIRequest';
import { CatImage } from '../types/theCatApi';

enum ActionType {
    CategoryChanged = 'CATEGORY_CHANGED',
    ImageSelected = 'IMAGE_SELECTED',
    ImageLoaded = 'IMAGE_LOADED',
}

interface State {
    currentCat?: CatImage;
    nextCat?: CatImage;
}

interface Action {
    type: ActionType;
    payload?: {
        currentCat?: number;
        catImage?: CatImage;
    };
}

const catImageReducer: React.Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case ActionType.CategoryChanged: {
            return {
                currentCat: undefined,
                nextCat: undefined,
            };
        }
        case ActionType.ImageSelected: {
            return {
                currentCat: undefined,
                nextCat: action?.payload?.catImage,
            };
        }
        case ActionType.ImageLoaded: {
            return {
                currentCat: state.nextCat,
                nextCat: undefined,
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const useChangingCatImage = (refreshRate: number, catCategory: number | undefined): [CatImage | undefined] => {
    const [{ currentCat, nextCat }, dispatch] = useReducer(catImageReducer, {});
    const [status] = usePreloadImage(nextCat);
    const selectNextCatDetails = useCallback(() => {
        fetchCat(catCategory).then(catImage =>
            dispatch({
                type: ActionType.ImageSelected,
                payload: {
                    catImage,
                },
            }),
        );
    }, [catCategory]);

    useEffect(() => {
        selectNextCatDetails();
    }, [selectNextCatDetails]);

    useEffect(() => {
        dispatch({ type: ActionType.CategoryChanged });
    }, [catCategory]);

    useEffect(() => {
        if (status === 'loaded') {
            dispatch({ type: ActionType.ImageLoaded });
        }
    }, [status]);

    useEffect(() => {
        const timeout = setTimeout(selectNextCatDetails, refreshRate);

        return (): void => {
            clearTimeout(timeout);
        };
    }, [currentCat, refreshRate, selectNextCatDetails]);

    return [currentCat];
};

export default useChangingCatImage;
