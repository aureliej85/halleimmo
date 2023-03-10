import React from 'react';
import { useState } from 'react';
import './dpe.scss';

function Dpe({dpe}) {
 const [ thisDpe , setThisDpe] = useState("");

 const dpeArray = [{letter : "A", color :"#479264"}, {letter : "B", color :"#54a64a"}, {letter : "C", color :"#6db56b"}, {letter : "D", color :"#f2e32f"}, {letter : "E", color :"#edac31"}, {letter : "F", color :"#e87832"}, {letter : "G", color :"#d2382d"},];

  return (
    <div className='dpe'>
        {dpeArray.map((elt, index)=><div key={index} className={elt.letter === dpe ? 'dpe__box big' : 'dpe__box'} id={elt.letter}>{elt.letter}</div>)}

        {/* style={{marginRight: spacing + 'em'}} */}
    </div>
  )
}

export default Dpe