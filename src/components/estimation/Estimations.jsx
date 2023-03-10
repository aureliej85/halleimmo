import React from 'react';
import "./estimations.scss";
import { useState } from 'react';
import { send } from 'emailjs-com';

function Estimations() {

    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        telephone: '',
        adresse: '',
        cp: '',
        ville: '',
        message: '',
        reply_to: '',
      });
    
      const onSubmit = (e) => {
        e.preventDefault();
            send(
            'service_60lz1m8',
            'template_dsndpui',
            toSend,
            'vPevnm3T39p2JnFMZ'
            )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
      };
    
      const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
      };


  return (
    <div className="estimation">
    <div className="estimation__hero"> 
        <img src="contact.png" alt="Contactez-nous !" />

    
        <form onSubmit={onSubmit}>
            <h1>Estimation offerte</h1>

            <p>Si vous souhaitez faire évaluer votre bien immobilier, veuillez remplir le formulaire ci-dessous. Nous vous contacterons sous 48h.</p>
        
            <input
            type="text"
            name="from_name"
            placeholder="Votre nom et prénom"
            value={toSend.from_name}
            onChange={handleChange}
            />

            <div>
                <input
                type="text"
                name="reply_to"
                placeholder="Votre email"
                value={toSend.reply_to}
                onChange={handleChange}
                required="true"/>
                <input
                type="tel"
                name="telephone"
                placeholder="N° de téléphone"
                value={toSend.telephone}
                onChange={handleChange}
                required="true"/>
            </div>  
            <input
                type="text"
                name="adresse"
                placeholder="Votre adresse"
                value={toSend.adresse}
                onChange={handleChange}
                required="true"/> 
            <div>     
               
                <input
                type="number"
                name="cp"
                placeholder="Code Postal"
                value={toSend.cp}
                onChange={handleChange}
                required="true"/>
                <input
                type="text"
                name="ville"
                placeholder="Ville"
                value={toSend.ville}
                onChange={handleChange}
                required="true"/>
            </div>  
            <textarea
            type="text"
            name="message"
            placeholder="Votre message"
            rows="5" cols="33"
            value={toSend.message}
            onChange={handleChange}
            />
            
            <div
            class="g-recaptcha"
            data-sitekey="6LdBNd0kAAAAANpb91wGwEfrSvHmBN4kXszhqNzD"
            ></div>
            <br />
            <button type="submit">Envoyer</button>
        </form>
    
    </div>
</div>
  )
}

export default Estimations