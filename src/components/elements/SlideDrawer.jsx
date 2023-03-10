import React, {useState, useEffect} from 'react';
import "./slideDrawer.scss";
import MenuIcon from '@mui/icons-material/Menu';

function SlideDrawer({show, drawerClass}) {
    const [drawerClasses, setDrawerClasses] = useState(drawerClass);

    function handleClose(){
        !drawerClasses ? setDrawerClasses("sideDrawer") : setDrawerClasses("sideDrawer open");

        console.log("drawwerClasses apres click X " + drawerClasses);
    }

    useEffect(()=>{
        // !show === true ? setDrawerClasses("sideDrawer open") : setDrawerClasses("sideDrawer")

        console.log("inside slideDrawer // show is what ? " + show )

    }, [])

  return (
    <div className={drawerClasses}>
        <button onClick={handleClose}> X</button>
        coucou
        
    </div>
  )
}

export default SlideDrawer