import React, {useState, useEffect} from 'react';
import "./ventes.scss";
import Search from '../search/Search';
import CardHome from '../elements/CardHome';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

function Ventes() {
    const [allventes, setAllventes] = useState([]);


    const [search , setSearch] = useState("");
   

    function getToken(){
        let username = "67";
        let password =
          "z455PTZJzaTg1HEz7I63E7lVbGzyzGvSJ0UqDlyWO3YnAbryhMV0ybNKU9YC6NA5";
        let auth = btoa(`${username}:${password}`);
    
        fetch(
          "https://v2.immo-facile.com/api/client/token/site?site_id=104826&manufacturer_id=",
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${auth}`,
            },
          }
        )
          .then(function (response) {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then(function (data) {
            localStorage.setItem('access', data.access_token);
            console.log("POST basic auth " + data);
            console.table(data);
          })
          .catch(function (error) {
            console.warn(error);
          });
      }
    

    function getNosVentes(){

        fetch(
            "https://v2.immo-facile.com/api/site/products/search?fetch=products_photos,descriptions,criteres_text,criteres_fulltext,criteres_number&sort_type=date&sort_order=desc",
            {
                method : 'POST',
              headers: {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + localStorage.getItem('access')
               
              },
              body: {
                manufacturer_id: '348524',
              }
            }
          )
          .then(function (response) {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then(function (data) {
            setAllventes(data);
            console.table(data);
            
          })
            .catch(function (error) {
              console.warn(error);
            });
    
      }

      
      useEffect(() => {
        getToken();
        getNosVentes();  
      
      }, []);
     
      useEffect(()=>{
        console.log("search " + search)
      }, [search])

  return (
    <div className='ventes'>

      <div className='ventes__hero'>
        <div className='ventes__hero__container'>
        <Search />

        </div>

      </div>
      

        <section className="ventes__cards">

      
          

          <Fade>
          <div className="ventes__cards__box">
            {allventes?.map((elt, index) => (

                elt.criteres_text.filter((e)=> e.critere_id === 121).map((f)=>{
                    return (f.critere_value === "Vendu") || (f.critere_value === "Compromis") &&

                      //  <Link to={`/${elt.id}`}>
                            <div className="ventes__cards__box__item">
                                <div className="ventes__cards__box__item__sold">Vendu</div>

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

                                    price={" "}
                                    />

                            </div>
                            
                        // </Link>

                })

                
            ))}
          </div>
          </Fade>

        </section>

    </div>
  )
}

export default Ventes