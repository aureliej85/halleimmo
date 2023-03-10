import React from "react";
import "./contact.scss";
import { useState } from 'react';
import { send } from 'emailjs-com';

function Contact() {
  const [toSend, setToSend] = useState({
    from_name: "",
    message: "",
    reply_to: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send("service_60lz1m8", "template_kue15fa", toSend, "vPevnm3T39p2JnFMZ")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact">
        <div className="contact__hero"> 
            <img src="contact.png" alt="Contactez-nous !" />

        
            <form onSubmit={onSubmit}>
                <h1>Contactez-nous</h1>
            
                <input
                type="text"
                name="from_name"
                placeholder="Votre nom"
                value={toSend.from_name}
                onChange={handleChange}
                />
                <input
                type="text"
                name="reply_to"
                placeholder="Votre email"
                value={toSend.reply_to}
                onChange={handleChange}
                />
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
  );
}

export default Contact;
