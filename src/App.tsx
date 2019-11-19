import React, { useState, useLayoutEffect } from 'react';
import ChangingCatImage from './components/ChangingCatImage';
import { fetchCatCategories } from './utils/catAPIRequest';
import Select from 'react-select';
import styled from 'styled-components';
import { INTERVAL } from './config/config.json';
import { ValueType } from 'react-select';
import { CategoryResponse } from './types/theCatApi';

interface Category {
    value: number,
    label: string
}

const getCategories = async (): Promise<Category[]> => {
    const response: Array<CategoryResponse> = await fetchCatCategories();

    return response.map(({ id, name }) => ({ value: id, label: name }));
};

const StyledContainer = styled.div`
    text-align: center;
`;

const StyledControls = styled.div`
    width: 300px;
    margin: 0 auto;
    padding: 1em;
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const IMAGE_INTERVAL: number = parseInt(INTERVAL, 10);

function App() {
    const [ selectedCategory, setSelectedCategory ] = useState<Category | null>( null);
    const [ categories, setCategories ] = useState<Category[]>([]);

    useLayoutEffect(() => {
        getCategories().then(result => setCategories(result));
    }, []);

    return (
        <StyledContainer>
            <StyledControls>
                <Select
                    options={ categories }
                    onChange={(category: ValueType<Category>): void => {
                        setSelectedCategory(category as Category)
                    }}
                    isClearable
                />
            </StyledControls>
            <StyledContent>
                <ChangingCatImage
                    category={ selectedCategory?.value }
                    interval={ IMAGE_INTERVAL }
                />
            </StyledContent>
        </StyledContainer>
    );
}

export default App;
