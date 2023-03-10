import React from 'react';
import { Slide } from 'react-awesome-reveal';
import "./about.scss";

function About() {
  return (
    <div className='about'>
        <img src="HI-Logo-Orange.png" alt="Halle Immo" />

        <p className='about__text'>
        Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Quisque velit nisi, pretium ut lacinia in, elementum id enim.

        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus.
        </p>
        
          <div className='about__pics'>

                <div className='about__pics__div'>
                  <img src="nicolas.webp" alt="Nicolas" />
                  <div>Nicolas Lebouc</div>
                </div>
                <div className='about__pics__div'>
                  <img src="xavier.webp" alt="Xavier" />
                  <div>Xavier Laporte</div>
                </div>
                <div className='about__pics__div'>
                  <img src="vincent.webp" alt="Vincent" />
                  <div>Vincent Clergue</div>
                </div>    
          </div>
        
    </div>
  )
}

export default About