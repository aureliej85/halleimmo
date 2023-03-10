import React from 'react';
import "./carousel.scss";
import { useState } from "react";

function Carousel({picTab}) {
    const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevious({picTab}) {
    return setCurrentIndex( 
      currentIndex === 0 ? picTab.filter((e)=> (e.is_mid || e.is_red) === false).length - 1 : currentIndex - 1
    );
  }

  function handleNext() {
    return setCurrentIndex(
      currentIndex === picTab.filter((e)=> (e.is_mid || e.is_red) === false).length - 1 ? 0 : currentIndex + 1
    );
  }

  console.table(picTab);

  const carouselStyle = {
    width: "1240px",
    height: "515px",
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "100%",
    maxHeight: "100%",
    objectFit: "cover",
    borderRadius: "10px",

  }



  return (
    <div className="carrousel">
      {picTab?.filter((e)=> (e.is_mid || e.is_red) === false).length > 1 && (
        <button className="carrousel__previous" onClick={handlePrevious}>
          <img src="../arrow-back.png" alt="Back arrow" />
        </button>
      )}

      {picTab?.filter((e)=> (e.is_mid || e.is_red) === false).map((pic, index) => (
        <div key={index} className="carrousel__inner dismiss">
          {index === currentIndex && <img src={pic?.chemin} alt={`Photo ${currentIndex + 1}`} style={carouselStyle}/>}
          {index === currentIndex && (
            <span className="carrousel__number">
              {currentIndex + 1}/{picTab?.filter((e)=> (e.is_mid || e.is_red) === false).length}
            </span>
          )}
        </div>
      ))}
      {picTab?.filter((e)=> (e.is_mid || e.is_red) === false).length > 1 && (
        <button className="carrousel__next" onClick={handleNext}>
          <img src="../arrow-forward.png" alt="Forward arrow"/>
        </button>
      )}
    </div>
  );
}

export default Carousel