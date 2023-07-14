import React, { Fragment } from 'react'
import BackgroundImage from './assets/bg.png'
import NavbarBeforeLogin from './navbar/NavbarBeforeLogin'

export default function LandingPage() {
    return (
        <Fragment>
            <NavbarBeforeLogin/>
            <div style={HeaderStyle}/>
        </Fragment>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
