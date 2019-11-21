import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useChangingCatImage from '../hooks/useChangingCatImage';

const StyledImage = styled.img`
    max-height: 100vh;
    max-width: 100vw;
`;

interface Props {
    category: number | undefined;
    interval: number;
}

const ChangingCatImage: React.FC<Props> = ({ category, interval }) => {
    const [image] = useChangingCatImage(interval, category);

    if (!image) {
        return <span>Loading ...</span>;
    }

    return <StyledImage src={image.url} className="Cat" alt="cat" />;
};

ChangingCatImage.propTypes = {
    category: PropTypes.number,
    interval: PropTypes.number.isRequired,
};

export default ChangingCatImage;
