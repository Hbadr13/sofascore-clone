import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface DisplayImageProps {
    className?: string;
    src: string;
    width?: number;
    height?: number;
    alt: string;
    onErrorImage?: 'team' | 'player' | 'manager' | 'tournament' | 'flag';
}

const DisplayImage = ({ className, src, width, height, alt, onErrorImage }: DisplayImageProps) => {

    const [imageSrc, setImageSrc] = useState('')

    return (
        <Image
            onLoad={() => setImageSrc('')}
            className={className}
            src={imageSrc ? imageSrc : src}
            width={width}
            height={height}
            alt={alt}
            // onError={handleError}
            onError={e => setImageSrc(onErrorImage === 'player' || onErrorImage === 'manager'
                ? 'https://www.sofascore.com/static/images/placeholders/player.svg'
                : onErrorImage === 'team' ? 'https://www.sofascore.com/static/images/placeholders/team.svg'
                    : onErrorImage === 'tournament' ? 'https://www.sofascore.com/static/images/placeholders/tournament.svg'
                        : 'https://www.sofascore.com/static/images/placeholders/team.svg')}
        />
    );
};

export default DisplayImage;

