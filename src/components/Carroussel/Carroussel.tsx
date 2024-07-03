import React, { useState } from 'react';
import useMediaWidth from '../../shared/utils/useMediaWidth';

interface CarrousselProps {
    images: string[],
    currentIndex: number
}

const Carroussel = ({ images, currentIndex }: CarrousselProps) => {

    const [index, setIndex] = useState<number>(currentIndex)
    const isLargeScreen = useMediaWidth(1100);

    function nextImg() {
        setIndex(index + 1)
        if (index > images.length - 2) {
            setIndex(0)
        }
        console.log(index)
    }

    function prevImg() {
        setIndex(index - 1)
        if (index < 1) {
            setIndex(4)
        }
        console.log(index)
    }
    return (



        <div id="modal" className="carrousel-container">
            <img src={images[index]} alt="" className="carrousel-image" />
            <div className="carrousel-control left">
                <button type="button" aria-label="Précédente" onClick={prevImg}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" fill='#467971' /></svg>
                </button>
            </div>
            <div className="carrousel-control right">
                <button type="button" aria-label="Suivante" onClick={nextImg}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" className='rotate-180'><path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" fill='#467971' /></svg>
                </button>
            </div>
        </div>



    )
};

export default Carroussel;