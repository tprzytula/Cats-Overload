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
    currentCat: CatImage | null;
    nextCat: CatImage | null;
}

type Action =
    | { type: ActionType.CategoryChanged }
    | { type: ActionType.ImageLoaded }
    | { type: ActionType.ImageSelected; payload: { nextCat: CatImage } };

const catImageReducer: React.Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case ActionType.CategoryChanged: {
            return {
                currentCat: null,
                nextCat: null,
            };
        }
        case ActionType.ImageSelected: {
            return {
                ...state,
                nextCat: action.payload.nextCat,
            };
        }
        case ActionType.ImageLoaded: {
            return {
                currentCat: state.nextCat,
                nextCat: null,
            };
        }
    }
};

function useChangingCatImage(refreshRate: number, catCategory: number | undefined): [CatImage | null] {
    const [{ currentCat, nextCat }, dispatch] = useReducer(catImageReducer, {
        currentCat: null,
        nextCat: null,
    });
    const [status] = usePreloadImage(nextCat);
    const selectNextCatDetails = useCallback(() => {
        fetchCat(catCategory).then(result =>
            dispatch({
                type: ActionType.ImageSelected,
                payload: {
                    nextCat: result,
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
}

export default useChangingCatImage;
