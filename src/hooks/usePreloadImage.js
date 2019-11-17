import { useState, useEffect } from 'react';

function usePreloadImage(image) {
	const url = image?.url;
	const [ status, setStatus ] = useState('loading');

	useEffect(() => {
		if (!url) return;

		const img = document.createElement('img');

		function onload() {
			setStatus('loaded');
		}

		function onerror() {
			setStatus('failed');
		}

		img.addEventListener('load', onload);
		img.addEventListener('error', onerror);

		img.src = url;

		return function cleanup() {
			img.removeEventListener('load', onload);
			img.removeEventListener('error', onerror);
			setStatus('loading');
		};
	}, [ url ]);

	return [ status ];
}

export default usePreloadImage;
