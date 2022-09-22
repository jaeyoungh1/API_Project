import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from "../SignupFormPage";
import { DemoUser } from '../DemoUser'

export const LoginButton = () => {
    const dispatch = useDispatch()
    let [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return;
        else setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    let sessionLinks = (
        <>
            
        </>
    );

    let menuVisibility
    showMenu === true ? menuVisibility = 'menu-visible' : menuVisibility = 'menu-not-visible'

    return (
        <>
            <div className='dropdownwrapper'>
                <div className='profilebuttonwrapper'>
                    <button onClick={openMenu} className='profilebutton'>
                        <i className="fa-solid fa-bars"></i>
                        <i className="fa-regular fa-user"></i>
                    </button>
                </div>
    
                    <div id='profile-dropdown' className={menuVisibility}>
                        <div className='sessionlinks'>
                        <LoginFormModal />
                        <SignUpFormModal />
                        </div>

                    </div>
                
            </div>
        </>
    )
}