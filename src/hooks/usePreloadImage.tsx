import { useState, useEffect } from 'react';
import { CatImage } from '../types/theCatApi';

function usePreloadImage(image: CatImage | null): [string] {
    const imageUrl = image?.url;
    const [status, setStatus] = useState<string>('loading');

    useEffect(() => {
        if (!imageUrl) return;

        const img: HTMLImageElement = document.createElement('img');

        function onload(): void {
            setStatus('loaded');
        }

        function onerror(): void {
            setStatus('failed');
        }

        img.addEventListener('load', onload);
        img.addEventListener('error', onerror);

        img.src = imageUrl;

        return function cleanup(): void {
            img.removeEventListener('load', onload);
            img.removeEventListener('error', onerror);
            setStatus('loading');
        };
    }, [imageUrl]);

    return [status];
}

export default usePreloadImage;
