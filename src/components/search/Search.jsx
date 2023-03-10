import React, {useState, useEffect} from 'react';
import './search.scss';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import {theme} from '../../styles/Theme';
import {ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();
    const [price , setPrice] = useState("900000");
    const [type , setType] = useState("");
    const [place , setPlace] = useState("");


    const criterias = [];

        if (price !== "") {
            criterias.push({
                id: "30",
                operator: "INFERIEUR",
                value: price
            });
        }

        if (type !== "") {
            criterias.push({
                id: "27",
                operator: "EGAL",
                value: type
            });
        }

        if (place !== "") {
            criterias.push({
                id: "65",
                operator: "CONTIENT",
                value: place
            });
        }


    function handleSearch(){
        fetch(
            "https://v2.immo-facile.com/api/site/products/search?fetch=products_photos,descriptions,criteres_text,criteres_fulltext,criteres_number&sort_type=date&sort_order=desc",
            {
                method : 'POST',
              headers: {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + localStorage.getItem('access')
               
              },
              body: JSON.stringify( {
                manufacturer_id: '348524',
                criterias
              })
            }
          )
          .then(function (response) {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then(function (data) {
  
            navigate('/recherche', {state: data });
            console.table(data);
            console.log("La recherche est là !");
            
          })
            .catch(function (error) {
              console.warn(error);
            });
        
    }

    useEffect(()=> {
        console.log("price " + price);
        console.log("type " + type);
        console.log("place " + place);

    }, [price, type, place])



  return (
    <div className='search'>
        <div className='search__box'>
            <span>Type de bien</span>
            <select name="type" id="type-select" onChange={(e) => setType(e.target.value )}>
                <option value="">--Choisir un type de bien--</option>
                <option value="1">Appartement</option>
                <option value="2">Maison</option>
                <option value="10">Terrain</option>
                <option value="6">Immeuble</option>
            </select>
        </div>
        <div className='search__box'>
            <span>Code Postal / Ville</span>
            <input type='text' placeholder='ex: 75015 Paris' onChange={(e) => setPlace(e.target.value )} />
        </div>
        <div className='search__box'>
            <span>Budget max.</span>
            <select name="type" id="type-select" onChange={(e) => setPrice(e.target.value )}>
                <option value="900000">--Selectionner le budget max.--</option>
                <option value="200000">200 000 €</option>
                <option value="300000">300 000 €</option>
                <option value="400000">400 000 €</option>
                <option value="500000">500 000 €</option>
                <option value="600000">600 000 €</option>
                <option value="700000">700 000 €</option>
                <option value="800000">800 000 €</option>
                <option value="900000">900 000 €</option>
            </select>
        </div>
        <div className='search__button'>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color={theme.main} endIcon={<SearchIcon />} onClick={handleSearch}>
                Chercher
                </Button>
            </ThemeProvider>
        </div>

    </div>
  )
}

export default Search