import React, {useState} from 'react';
import {nav} from "../../Data.jsx";
import { Link } from 'react-router-dom';
import './navBar.scss';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {theme} from '../../styles/Theme';
import {ThemeProvider } from '@mui/material/styles';
import SlideDrawer from '../elements/SlideDrawer.jsx';


function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [drawerClasses, setDrawerClasses] = useState("sideDrawer");

    function handleDrawer(){
        !isOpen ? setIsOpen(true) : setIsOpen(false);
        !isOpen ? setDrawerClasses("sideDrawer") : setDrawerClasses("sideDrawer open");
        console.log("open is what ? " + isOpen);
        console.log("drawerClass is what ? " + drawerClasses);
    }

  return (
    <nav className='navBar'>
        {/* <div className='navBar__drawer'>
            <MenuIcon />
        </div> */}
        <div className='navBar__logo'>
            <img src="HI-Logo-Orange.png" alt="Halle Immo"/>
        </div>
        <div className='navBar__menu'>
            <ul>
                {nav.map((list, index)=> 
                    <li key={index}><Link to={list.path}>{list.text}</Link></li>
                    )}
            </ul>
        </div>
        <div className='navBar__cta'>
            <ThemeProvider theme={theme}>
                <Link to="/estimation" ><Button variant="contained" color={theme.main} size="large">Estimation</Button></Link>
            </ThemeProvider>
        </div>

        <div className='navBar__drawer'>
            <button onClick={handleDrawer}><MenuIcon /></button>
            <SlideDrawer show={isOpen} drawerClass={drawerClasses}/>
        </div>
        
    </nav>
  )
}

export default Navbar