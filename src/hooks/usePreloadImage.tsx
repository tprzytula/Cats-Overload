import { useState, useEffect } from 'react';
import { ICatImage } from '../types/theCatApi';

function usePreloadImage(image: ICatImage | undefined) {
	const imageUrl = image?.url;
	const [ status, setStatus ] = useState('loading');

	useEffect(() => {
		if (!imageUrl) return;

		const img = document.createElement('img');

		function onload() {
			setStatus('loaded');
		}

		function onerror() {
			setStatus('failed');
		}

		img.addEventListener('load', onload);
		img.addEventListener('error', onerror);

		img.src = imageUrl;

		return function cleanup() {
			img.removeEventListener('load', onload);
			img.removeEventListener('error', onerror);
			setStatus('loading');
		};
	}, [ imageUrl ]);

	return [ status ];
}

export default usePreloadImage;
