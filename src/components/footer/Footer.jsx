import React from 'react';
import {navFooter} from "../../Data.jsx";
import { Link } from 'react-router-dom';
import './footer.scss';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {theme} from '../../styles/Theme';
import {ThemeProvider } from '@mui/material/styles';

function Footer() {
  return (
    <nav className='footer'>
        {/* <div className='navBar__drawer'>
            <MenuIcon />
        </div> */}
        <div className='footer__logo'>
            <img src="HI-Logo-Blanc.png" alt="Halle Immo"/>
        </div>
        <div className='footer__menu'>
            <ul>
                {navFooter.map((list, index)=> 
                    <li key={index}><Link to={list.path}>{list.text}</Link></li>
                    )}
            </ul>
        </div>
        <div className='footer__cta'>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color={theme.main}>Estimation</Button>
            </ThemeProvider>
        </div> 
        
    </nav>
  )
}

export default Footer