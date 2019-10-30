import { useState, useEffect } from 'react';

function useImage(url) {
	const [ imageDetails, setImageDetails ] = useState({ image: null, status: 'loading' });

	useEffect(() => {
		if (!url) return;

		const img = document.createElement('img');

		function onload() {
			setImageDetails({ image: img, status: 'loaded' });
		}

		function onerror() {
			setImageDetails({ image: undefined, status: 'failed' });
		}

		img.addEventListener('load', onload);
		img.addEventListener('error', onerror);

		img.src = url;

		return function cleanup() {
			img.removeEventListener('load', onload);
			img.removeEventListener('error', onerror);
			setImageDetails({ image: null, status: 'loading' });
		};
	}, [url]);

	return [ imageDetails.image, imageDetails.status ];
}

export default useImage;
