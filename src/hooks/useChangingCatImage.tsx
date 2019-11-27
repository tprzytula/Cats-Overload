import React, { useEffect, useCallback, useReducer } from 'react';
import usePreloadImage from './usePreloadImage';
import { fetchCat } from '../utils/catAPIRequest';
import { CatImage } from '../types/theCatApi';

enum ActionType {
    CategoryChanged = 'CATEGORY_CHANGED',
    ImageSelected = 'IMAGE_SELECTED',
    ChangeImage = 'CHANGE_IMAGE',
}

interface State {
    currentCat: CatImage | null;
    nextCat: CatImage | null;
}

type Action =
    | { type: ActionType.CategoryChanged }
    | { type: ActionType.ChangeImage }
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
            if (!state.currentCat) {
                return {
                    ...state,
                    currentCat: action.payload.nextCat,
                };
            }

            return {
                ...state,
                nextCat: action.payload.nextCat,
            };
        }
        case ActionType.ChangeImage: {
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

    usePreloadImage(nextCat);

    useEffect(() => {
        selectNextCatDetails();
    }, [selectNextCatDetails]);

    useEffect(() => {
        dispatch({ type: ActionType.CategoryChanged });
    }, [catCategory]);

    useEffect(() => {
        if (nextCat === null) {
            selectNextCatDetails();
        }
    }, [nextCat, selectNextCatDetails]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch({ type: ActionType.ChangeImage });
        }, refreshRate);

        return (): void => {
            clearTimeout(timeout);
        };
    }, [currentCat, refreshRate]);

    return [currentCat];
}

export default useChangingCatImage;
