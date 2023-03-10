import React from 'react';
import "./recherche.scss";
import { useLocation } from 'react-router-dom';
import CardHome from '../elements/CardHome';
import Search from './Search';
import { Link } from 'react-router-dom';

function Recherche() {
    const location = useLocation();
  const data = location.state;

  return (
    <div className='recherche'>

        <div className='recherche__hero'>
          <div className='recherche__hero__container'>
            <Search />

          </div>

        </div>

      <div className='recherche__cards'>

        

      {
        !data.length ? " Aucun bien ne correspond aux critères selectionnés" :
            
        data?.map((elt, index) => (

          elt.criteres_text.filter((e)=> e.critere_id === 121).map((f)=>{
            return (f.critere_value === "EnCours") &&

              <Link to={`/${elt.id}`}>
                <CardHome
                  key={index}
                  image={elt.products_photos[0].chemin}
                  titre={elt.descriptions[0].title}

                  ville={ 
                  elt.criteres_text.filter((e)=> e.critere_id === 54).map((f)=>{
                      return f.critere_value;
                  })}

                  rooms={
                      elt.criteres_number.filter((e)=> e.critere_id === 33).map((f)=>{
                              return f.critere_value ;
                      })}

                  bedrooms={
                      elt.criteres_number.filter((e)=> e.critere_id === 38).map((f)=>{
                          return f.critere_value ;
                  })}

        
                  size={
                      elt.criteres_number.filter((e)=> e.critere_id === 34).map((f)=>{
                          return f.critere_value ;
                  })}

                  price={
                      elt.criteres_number.filter((e)=> e.critere_id === 30).map((f)=>{
                          return f.critere_value ;
                  })}
                />
              </Link>

})


))}
      


      </div>
        
        
    </div>
  )
}

export default Recherche