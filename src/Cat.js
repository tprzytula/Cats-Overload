import React from 'react';
import './App.css';
import useRefreshingRandomCatImage from './hooks/useRefreshingRandomCatImage';

function Cat({ category }) {
	const [ image ] = useRefreshingRandomCatImage(5000, category);

	if (!image) {
		return <span>Loading ...</span>;
	}

	return <img src={ image.src } className="Cat" alt="cat"/>
}

export default Cat;
