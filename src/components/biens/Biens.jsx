import React from "react";
import "./biens.scss";
import { useEffect, useState } from "react";
import CardHome from "../elements/CardHome";
import { Link } from "react-router-dom";
import Search from "../search/Search";
import { url } from "../../Data.jsx";
import { Fade } from "react-awesome-reveal";
import Loading from "../elements/Loading";

function Biens() {
  const [allBiens, setAllBiens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
    fetch(
      url +
        "/site/products/search?fetch=products_photos,descriptions,criteres_text,criteres_fulltext,criteres_number&sort_type=date&sort_order=desc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
        body: {
          manufacturer_id: process.env.REACT_APP_MANUFACTURER,
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
        setAllBiens(data);
        setIsLoading(false);
        console.table(data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  useEffect(() => {
    getToken();
    getAllBiens();
  }, []);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="biens">
      <div className="biens__hero">
        <div className="biens__hero__container">
          <Search />
        </div>
      </div>

      <section className="biens__cards">
        <Fade>
          <div className="biens__cards__box">
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
      </section>
    </div>
  );
}

export default Biens;
