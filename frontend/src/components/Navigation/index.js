import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { ProfileButton } from "./ProfileButton"
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
                <LoginFormModal />
                {/* <span><NavLink style={{'text-decoration':'none', 'color': '#45454599'}}to="/login">Log In</NavLink></span> */}
                <SignUpFormModal/>
                {/* <span><NavLink style={{ 'textDecoration': 'none', 'color': '#45454599' }} to="/signup">Sign Up</NavLink></span> */}
                <DemoUser />
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
        <div className='descriptionbreak'>
        </div>
        </>
    );
}
