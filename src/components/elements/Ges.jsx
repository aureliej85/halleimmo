import React from 'react';
import { useState, useEffect } from 'react';
import './ges.scss';

function Ges({ges}) {
 const [ thisDpe , setThisDpe] = useState("");

 const dpeArray = [{letter : "A", id :"Ages"}, {letter : "B", id :"Bges"}, {letter : "C", id :"Cges"}, {letter : "D", id :"Dges"}, {letter : "E", id :"Eges"}, {letter : "F", id :"Fges"}, {letter : "G", id :"Gges"},];



 useEffect(()=> {
  console.log("ges " + ges)
  console.table(dpeArray);
  console.log("letter in array " +dpeArray[2].letter)
 
  
 }, [])

  return (
    <div className='ges'>
        {dpeArray.map((elt, index)=><div key={index} className={elt.letter === ges ? 'ges__box big' : 'ges__box'} id={elt.id}>{elt.letter}</div>)}

        
    </div>
  )
}

export default Ges