import React from 'react';
import styled from 'styled-components';
import useChangingCatImage from '../hooks/useChangingCatImage';

const StyledImage = styled.img`
	max-height: 100vh;
	max-width: 100vw;
`;

interface IProps {
	category: number | undefined,
	interval: number
}

const ChangingCatImage: React.FC<IProps> = ({ category, interval }) => {
	const [ image ] = useChangingCatImage(interval, category);

	if (!image) {
		return <span>Loading ...</span>;
	}

	return <StyledImage src={ image.url } className="Cat" alt="cat"/>
};

export default ChangingCatImage;
