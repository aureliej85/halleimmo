import React, { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import "./home.scss";
import { Slide, Fade } from "react-awesome-reveal";
import CardHome from "../elements/CardHome";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { url } from "../../Data.jsx";

import { Link } from "react-router-dom";

function Home() {
  const [allBiens, setAllBiens] = useState([]);

  function getToken() {
    let username = process.env.REACT_APP_USERNAME;
    let password = process.env.REACT_APP_PASSWORD;

    let auth = btoa(`${username}:${password}`);

    fetch(url + "/client/token/site?site_id=104826&manufacturer_id=", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(function (data) {
        localStorage.setItem("access", data.access_token);
        console.log("POST basic auth " + data);

        console.table(data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  function getAllBiens() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify({
        manufacturer_id: process.env.MANUFACTURER,
      }),
    };

    fetch(
      url +
        "/site/products/search?fetch=products_photos,descriptions,criteres_text,criteres_fulltext,criteres_number&sort_type=date&sort_order=desc&count=6",
      requestOptions
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(function (data) {
        setAllBiens(data);
        console.table(data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  useEffect(() => {
    getToken();
    getAllBiens();

    console.log("username " + process.env.REACT_APP_USERNAME);
  }, []);

  return (
    <div className="homePage">
      <Hero />
      <section className="homePage__subHero">
        <div className="homePage__subHero__box">
          <div className="homePage__subHero__box__title">
            <Slide direction={"left"}>
              <h2>Nouveaux Biens proposés en vente</h2>
            </Slide>
          </div>
          <div className="homePage__subHero__box__text">
            <Slide direction={"right"}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </Slide>
          </div>
        </div>
      </section>
      <section className="homePage__cards">
        <Fade>
          <div className="homePage__cards__box">
            {allBiens?.map((elt, index) =>
              elt.criteres_text
                .filter((e) => e.critere_id === 121)
                .map((f) => {
                  return (
                    f.critere_value === "EnCours" && (
                      <Link to={`/${elt.id}`}>
                        <CardHome
                          key={index}
                          image={elt.products_photos[0].chemin}
                          titre={elt.descriptions[0].title}
                          ville={elt.criteres_text
                            .filter((e) => e.critere_id === 54)
                            .map((f) => {
                              return f.critere_value;
                            })}
                          rooms={elt.criteres_number
                            .filter((e) => e.critere_id === 33)
                            .map((f) => {
                              return f.critere_value;
                            })}
                          bedrooms={elt.criteres_number
                            .filter((e) => e.critere_id === 38)
                            .map((f) => {
                              return f.critere_value;
                            })}
                          size={elt.criteres_number
                            .filter((e) => e.critere_id === 34)
                            .map((f) => {
                              return f.critere_value;
                            })}
                          price={elt.criteres_number
                            .filter((e) => e.critere_id === 30)
                            .map((f) => {
                              return f.critere_value;
                            })}
                        />
                      </Link>
                    )
                  );
                })
            )}
          </div>
        </Fade>

        <div className="homePage__cards__link">
          <VisibilityIcon fontSize="small" />
          <span>
            <Link to="nos-biens">Voir toutes les offres</Link>
          </span>
        </div>
      </section>
      <section className="homePage__newsletter">
        <div className="homePage__newsletter__box">
          <div className="homePage__newsletter__box__title">
            <Slide direction={"left"}>
              <h2>Restez informés sur nos nouvelles offres</h2>
            </Slide>
          </div>
          <div className="homePage__newsletter__box__text">
            <Slide direction={"right"}>
              <div>
                <a
                  href="https://www.facebook.com/profile.php?id=100089120203623"
                  rel="noopener"
                  target="_blank"
                >
                  <img src="facebook.png" alt="Facebook Halle Immo" />
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/halle_immo/"
                  rel="noopener"
                  target="_blank"
                >
                  <img src="instagram.png" alt="Instagram Halle Immo" />
                </a>
              </div>
              <div>
                <img src="linkedin.png" alt="Linkedin Halle Immo" />
              </div>
            </Slide>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
