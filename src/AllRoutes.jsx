import { Routes, Route } from "react-router-dom"
import Home from "./components/home/Home";
import Biens from "./components/biens/Biens";
import Details from "./components/details/Details";
import Error from "./components/error/Error";
import Recherche from "./components/search/Recherche";
import Estimations from "./components/estimation/Estimations";
import Contact from "./components/contact/Contact";
import Ventes from "./components/ventes/Ventes";
import About from "./components/about/About";
import Mentions from "./components/mentions/Mentions";
import Honoraires from "./components/honoraires/Honoraires";

export const AllRoutes = () => {
    return (
       <div>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/:id" element={<Details/>} />
               <Route path="/error" element={<Error/>} />
               <Route path="/nos-biens" element={<Biens/>} />
               <Route path="/recherche" element={<Recherche/>} />
               <Route path="/nos-ventes" element={<Ventes/>} />
               <Route path="/estimation" element={<Estimations/>} />
               <Route path="/contact" element={<Contact/>} />
               <Route path="/a-propos" element={<About/>} />
               <Route path="/mentions-legales" element={<Mentions/>} />
               <Route path="/honoraires" element={<Honoraires/>} />
           </Routes>
       </div> )}



