import React, { useState, useLayoutEffect } from 'react';
import Cat from './Cat';
import catAPIRequest from './utils/catAPIRequest';
import './App.css';

const getCategories = async () => {
    return await catAPIRequest('https://api.thecatapi.com/v1/categories');
};

function Select({ categories = [], onCategoryChange = () => {} }) {
    return (
        <select onChange={ onCategoryChange }>
            <option value="">All</option>
            { categories.map(({ id, name }) => <option key={ id } value={ id }>{ name }</option>)}
        </select>
    );
}

function App() {
    const [ category, setCategory ] = useState(null);
    const [ categories, setCategories ] = useState([]);
    const onCategoryChange = ({ target }) => {
        setCategory(target.value);
    };

    useLayoutEffect(() => {
        getCategories().then(result => setCategories(result));
    }, []);

    return (
        <div className="App">
            <Select categories={ categories } onCategoryChange = { onCategoryChange } />
            <header className="App-header">
                <Cat category={ category } />
            </header>
        </div>
    );
}

export default App;
