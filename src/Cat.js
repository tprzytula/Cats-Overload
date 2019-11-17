import React from 'react';
import styled from 'styled-components';
import useRefreshingRandomCatImage from './hooks/useRefreshingRandomCatImage';

const StyledImage = styled.img`
	max-height: 100vh;
	max-width: 100vw;
`;

function Cat({ category }) {
	const [ image ] = useRefreshingRandomCatImage(60000, category);

	if (!image) {
		return <span>Loading ...</span>;
	}

	return <StyledImage src={ image.src } className="Cat" alt="cat"/>
}

export default Cat;
