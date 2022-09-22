import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { ProfileButton } from "./ProfileButton"
import { LoginButton } from "./LoginButton";
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from "../SignupFormPage";
import { DemoUser } from '../DemoUser'
import logo from '../../images/logo.png'

import './Navigation.css'

export const Navigation = () => {

    const currentUser = useSelector(state => state.session.user)

    let sessionLinks;
    if (currentUser) {
        sessionLinks = (
            <ProfileButton user={currentUser} />
        );
    } else {
        sessionLinks = (
            <>
            <LoginButton/>
                 {/* <LoginFormModal />
                <SignUpFormModal/> */}
            </>
        );
    }

    return (

        <>
        
        <ul>
            <li className='session'>
                <NavLink style={{ 'textDecoration': 'none', 'color': '#45454599' }} exact to="/">
                    <img className='logo' alt='logo' src={logo}/>
                </NavLink>
                <div className='sessionlinks'>
                    {sessionLinks}
                </div>
            </li>
        </ul>
        <div className='headerbreak'>
        </div>
        
        </>
    );
}
