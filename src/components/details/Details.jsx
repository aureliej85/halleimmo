import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./details.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import Dpe from "../elements/Dpe";
import Ges from "../elements/Ges";
import "react-slideshow-image/dist/styles.css";
import Carousel from "../elements/Carousel";
import WcIcon from "@mui/icons-material/Wc";
import ShowerIcon from "@mui/icons-material/Shower";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BalconyIcon from "@mui/icons-material/Balcony";
import DeckIcon from "@mui/icons-material/Deck";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ElevatorIcon from "@mui/icons-material/Elevator";
import LivingIcon from "@mui/icons-material/Living";
import Puce from "../elements/Puce";
import { url } from "../../Data.jsx";

function Details() {
  const idHome = useParams();
  const id_home = idHome[1];
  const [detailsHome, setDetailsHome] = useState({});
  const [video, setVideo] = useState();
  const navigation = useNavigate();
  

  function getHome() {
    fetch(
      `${url}/site/product/${idHome.id}?fetch=products_photos,descriptions,criteres_text,criteres_fulltext,criteres_number,criteres_flag`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((dataResponse) => {
        setDetailsHome(dataResponse);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function getVideo() {
    fetch(`https://85m.fr/halle-immo/wp-json/wp/v2/posts/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((dataResponse) => {
        setVideo(dataResponse);
        console.log("video " + dataResponse);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    getHome();
    getVideo();
    console.log("check the video");
  }, []);

  return (
    <div className="details">
      <section className="details__slide">
        <Carousel picTab={detailsHome?.products_photos} />
      </section>
      <section className="details__about">
        <div className="details__about__descr">
          <h1>{detailsHome?.descriptions?.[0]?.title}</h1>
          <div className="details__about__descr__prices">
            <div className="details__about__descr__prices__home">
              {detailsHome.price} €
              {detailsHome?.criteres_number
                ?.filter((e) => e.critere_id === 53)
                .map((f) => {
                  return f.critere_value;
                })}
            </div>
            <div className="details__about__descr__prices__m2">
              {detailsHome?.criteres_flag
                ?.filter((e) => e.critere_id === 142)
                .map((f) => (
                  <Puce critere={f.critere_value ? "calme" : " "} />
                ))}

              {detailsHome?.criteres_flag
                ?.filter((e) => e.critere_id === 143)
                .map((f) => (
                  <Puce critere={f.critere_value ? "clair" : " "} />
                ))}
            </div>
          </div>
          <p>
            <PlaceIcon fontSize="small" />{" "}
            {detailsHome?.criteres_text
              ?.filter((e) => e.critere_id === 54)
              .map((f) => {
                return f.critere_value;
              })}
          </p>

          <div className="details__about__descr__icons">
            <div className="details__about__descr__icons__box">
              <div className="details__about__descr__icons__box__icon">
                <HomeIcon />
                {detailsHome?.criteres_number
                  ?.filter((e) => e.critere_id === 33)
                  .map((f) => {
                    return f.critere_value;
                  })}
              </div>
              <div className="details__about__descr__icons__box__descr">
                Pièces
              </div>
            </div>
            <div className="details__about__descr__icons__box">
              <div className="details__about__descr__icons__box__icon">
                <HotelIcon />
                {detailsHome?.criteres_number
                  ?.filter((e) => e.critere_id === 38)
                  .map((f) => {
                    return f.critere_value;
                  })}
              </div>
              <div className="details__about__descr__icons__box__descr">
                Chambres
              </div>
            </div>
            <div className="details__about__descr__icons__box">
              <div className="details__about__descr__icons__box__icon">
                <AspectRatioIcon />
                {"\u00A0"}
                {"\u00A0"}
                {detailsHome?.criteres_number
                  ?.filter((e) => e.critere_id === 34)
                  .map((f) => {
                    return f.critere_value;
                  })}{" "}
                m2
              </div>
              <div className="details__about__descr__icons__box__descr">
                Surface
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="details__descr">
        <h2>Description</h2>
        <p>
          {detailsHome?.descriptions?.[0]?.description ??
            "Pas de description pour le moment."}
        </p>

        {video
          ? video
              ?.filter((e) => e.acf.id_du_bien === idHome.id)
              .map((f) => (
                <div>
                  <video controls width="50%">
                    <source src={f.acf.ajouter_la_video.url} type="video/mp4" />
                    Sorry, your browser doesn't support videos.
                  </video>
                </div>
              ))
          : ""}
      </section>

      <section className="details__enum">
        <h2>Caractéristiques</h2>
        <div className="details__enum__list">
          <div className="details__enum__list__cat">
            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 51)
              .map((f) => (
                <div>
                  <CalendarMonthIcon fontSize="small" /> Année de construction :{" "}
                  {f.critere_value}{" "}
                </div>
              ))}

            {detailsHome?.criteres_flag
              ?.filter((e) => e.critere_id === 217)
              .map((f) => (
                <div>
                  <CalendarMonthIcon fontSize="small" />{" "}
                  {f.critere_value ? "Plein pied" : ""}{" "}
                </div>
              ))}

            {/* {detailsHome?.criteres_number
                    ?.filter((e) => e.critere_id === 36)
                    .map((f) => (
                    <div> Surface terrain : {f.critere_value} m2</div>
                ))} */}

            {/* {detailsHome?.criteres_number
                    ?.filter((e) => e.critere_id === 39)
                    .map((f) => (
                    <div> <StairsIcon fontSize="small"/> {f.critere_value}{f.critere_value > 1 ?"eme étage" : "er étage"}</div>
                ))} */}

            {detailsHome?.criteres_flag
              ?.filter((e) => e.critere_id === 41)
              .map((f) => (
                <div>
                  {" "}
                  <ElevatorIcon fontSize="small" />{" "}
                  {f.critere_value > 0 ? "Ascenseur" : "Sans ascenseur"}
                </div>
              ))}

            {detailsHome?.criteres_text
              ?.filter((e) => e.critere_id === 42)
              .map((f) => (
                <div>
                  {" "}
                  <KitchenIcon fontSize="small" />{" "}
                  {f.critere_value ? "Cuisine aménagée, équipée" : ""}
                </div>
              ))}

            {detailsHome?.criteres_flag
              ?.filter((e) => e.critere_id === 155)
              .map((f) => (
                <div>
                  {" "}
                  <LivingIcon fontSize="small" />{" "}
                  {f.critere_value ? "Double séjour" : " séjour"}
                </div>
              ))}
          </div>
          <div className="details__enum__list__cat">
            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 43)
              .map((f) => (
                <div>
                  <BathtubIcon fontSize="small" /> {f.critere_value}{" "}
                  {f.critere_value > 1 ? "Salles de bain" : "Salle de bain"}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 44)
              .map((f) => (
                <div>
                  <ShowerIcon fontSize="small" /> {f.critere_value}{" "}
                  {f.critere_value > 1 ? "Salles d'eau" : "Salle d'eau"}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 171)
              .map((f) => (
                <div>
                  <WcIcon fontSize="small" /> {f.critere_value}{" "}
                  {f.critere_value > 1 ? "Toilettes" : "Toilette"}
                </div>
              ))}
          </div>

          <div className="details__enum__list__cat">
            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 48)
              .map((f) => (
                <div>
                  <WarehouseIcon fontSize="small" /> {f.critere_value}{" "}
                  {f.critere_value > 1 ? " Garages" : " Garage"}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 49)
              .map((f) => (
                <div>
                  <LocalParkingIcon fontSize="small" />
                  {f.critere_value} {f.critere_value > 1 ? "Places" : "Place"}
                </div>
              ))}
          </div>

          <div className="details__enum__list__cat">
            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 46)
              .map((f) => (
                <div>
                  <BalconyIcon fontSize="small" /> {f.critere_value}{" "}
                  {f.critere_value > 1 ? "Balcons" : "Balcon"}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 47)
              .map((f) => (
                <div>
                  <DeckIcon fontSize="small" />
                  {f.critere_value}{" "}
                  {f.critere_value > 1 ? "Terrasses" : "Terasse"}
                </div>
              ))}

            {/* {detailsHome?.criteres_flag
                    ?.filter((e) => e.critere_id === 2166)
                    .map((f) => (
                    <div><DeckIcon fontSize="small"/> {f.critere_value ? "Jardin" : "Pas de jardin" }</div>
                ))} */}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 50)
              .map((f) => (
                <div>
                  <CheckCircleOutlineIcon fontSize="small" /> {f.critere_value}{" "}
                  {f.critere_value > 1 ? "Caves" : "Cave"}
                </div>
              ))}
          </div>

          <div className="details__enum__list__cat">
            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 137)
              .map((f) => (
                <div>
                  <CheckCircleOutlineIcon fontSize="small" />{" "}
                  {f.critere_value ? "Accès Bus" : ""}{" "}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 138)
              .map((f) => (
                <div>
                  <CheckCircleOutlineIcon fontSize="small" />{" "}
                  {f.critere_value ? "Accès Métro" : ""}{" "}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 140)
              .map((f) => (
                <div>
                  <CheckCircleOutlineIcon fontSize="small" />{" "}
                  {f.critere_value ? "Accès Gare" : ""}{" "}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 161)
              .map((f) => (
                <div>
                  <CheckCircleOutlineIcon fontSize="small" />{" "}
                  {f.critere_value ? "Accès RER" : ""}{" "}
                </div>
              ))}

            {detailsHome?.criteres_number
              ?.filter((e) => e.critere_id === 139)
              .map((f) => (
                <div>
                  <CheckCircleOutlineIcon fontSize="small" />{" "}
                  {f.critere_value ? "Proche école" : ""}{" "}
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="details__diagnostique">
        <div>
          <h3>Consommation énergétique (DPE)</h3>
          {detailsHome?.criteres_text
            ?.filter((e) => e.critere_id === 1831)
            .map((f) => (
              <Dpe dpe={f.critere_value} />
            ))}
        </div>
        <div>
          <h3>Emission de gaz (GES)</h3>
          {detailsHome?.criteres_text
            ?.filter((e) => e.critere_id === 1832)
            .map((f) => (
              <Ges ges={f.critere_value} />
            ))}
        </div>
      </section>
      <section className="details__contact"></section>
    </div>
  );
}

export default Details;
