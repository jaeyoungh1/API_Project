import { NavLink, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { ProfileButton } from "./ProfileButton"
import { LoginButton } from "./LoginButton";
import logo from '../../images/logo.png'

import './Navigation.css'

export const Navigation = () => {
    const url = useLocation().pathname
    const [page, setPage] = useState('')
    // console.log("URL", url)
    useEffect(() => {
        if (url.includes('spots')) {
            setPage('spot-details')
        }
    }, [url])
    // console.log("PAGE", page)

    const currentUser = useSelector(state => state.session.user)

    let sessionLinks;
    if (currentUser) {
        sessionLinks = (
            <ProfileButton user={currentUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginButton />
            </>
        );
    }

    return (

        <div >

            <ul className={page}>
                <li className='session'>
                    <NavLink style={{ 'textDecoration': 'none', 'color': '#45454599' }} exact to="/">
                        <img className='logo' alt='logo' src={logo} />
                    </NavLink>
                    <div className='sessionlinks'>
                        {sessionLinks}
                    </div>
                </li>
            </ul>
            <div className='headerbreak'>
            </div>

        </div>
    );
}
