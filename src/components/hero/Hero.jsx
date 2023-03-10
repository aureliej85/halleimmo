import React from 'react';
import './hero.scss';
import Search from '../search/Search';

function Hero() {
  return (
    <section className='hero'>
        <div className='hero__container'>
            <Search />
        </div>     
    </section>
  )
}

export default Hero