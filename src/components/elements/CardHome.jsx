import React from 'react';
import './cardHome.scss';
import PlaceIcon from '@mui/icons-material/Place';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

function CardHome({image, titre, ville, rooms, bedrooms, size, price}){

    return(
        <article className='card'>
            <div className='card__image'>
                <img src={image} alt={titre} />

            </div>
            <div className='card__content'>
                <div className='card__content__title'>
                    {titre} {price === " " ? " " : - price + "€"}
                </div>
                <div className='card__content__ville'>
                    <PlaceIcon fontSize='small'/>
                    {ville}    
                </div>
                <div className='card__content__details'>
                    <div className='card__content__details__box'>
                        <div className='card__content__details__box__icon'>
                            <HomeIcon />
                            {rooms}
                        </div>
                        <div className='card__content__details__box__descr'>
                            Pièces
                        </div>   
                    </div>
                    <div className='card__content__details__box'>
                        <div className='card__content__details__box__icon'>
                            <HotelIcon />
                            {bedrooms}
                        </div>
                        <div className='card__content__details__box__descr'>
                            Chambres
                        </div>      
                    </div>
                    <div className='card__content__details__box'>
                        <div className='card__content__details__box__icon'>
                            <AspectRatioIcon /> {'\u00A0'}{'\u00A0'}
                            {size} m2
                        </div>
                        <div className='card__content__details__box__descr'>
                            Surface
                        </div>  
                    </div>
                    
                </div>
            </div>

        </article>

    )

}

export default CardHome