import React, { useState, useLayoutEffect } from 'react';
import Cat from './Cat';
import { fetchCatCategories } from './utils/catAPIRequest';
import Select from 'react-select';
import styled from 'styled-components';

const getCategories = async () => {
    const response = await fetchCatCategories();

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

function App() {
    const [ selectedCategory, setSelectedCategory ] = useState({});
    const [ categories, setCategories ] = useState([]);

    useLayoutEffect(() => {
        getCategories().then(result => setCategories(result));
    }, []);

    return (
        <StyledContainer>
            <StyledControls>
                <Select
                    options={ categories }
                    onChange = { setSelectedCategory }
                    isClearable
                />
            </StyledControls>
            <StyledContent>
                <Cat category={ selectedCategory } />
            </StyledContent>
        </StyledContainer>
    );
}

export default App;
