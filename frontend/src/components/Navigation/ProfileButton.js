import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/session'

export const ProfileButton = ({ user }) => {
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

    const logoutUser = e => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <>
            <div className='dropdownwrapper'>
                <div className='profilebuttonwrapper'>
                    <button onClick={openMenu} className='profilebutton'>
                        <i className="fa-regular fa-user"></i>
                    </button>
                </div>
                {showMenu && (
                    <ul id='profile-dropdown' className='profile dropdown'>
                        <li className='profileusername' key='username'>{user.username}</li>
                        <li className='profileemail' key='email'>{user.email}</li>
                        <li>
                            <div className='logout-div'><button onClick={logoutUser} className='logout'>Log Out</button></div>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
}