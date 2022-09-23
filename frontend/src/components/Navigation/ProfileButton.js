import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../store/session'

export const ProfileButton = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
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
                        <i className="fa-solid fa-bars"></i>
                        <i className="fa-regular fa-user"></i>
                    </button>
                </div>
                {showMenu && (

                    <div id='profile-dropdown' className='profile dropdown'>
                        <div className='profile-info-wrapper'>
                            <div className='profile-info' key='username'>{user.username}</div>
                            <div className='profile-info' key='email'>{user.email}</div>
                        </div>
                        <div className='headerbreak'></div>
                        <div className='login-menu-wrapper'>
                            <div className='login-inner-div' key='myspots' onClick={() => history.push('/my-spots')}>
                                My Spots
                            </div>
                        </div>
                        <div className='login-menu-wrapper'>
                            <div className='login-inner-div' key='newspot' onClick={() => history.push('/new-spot')}>Host Your Spot
                            </div>
                        </div>
                        <div className='login-menu-wrapper'>

                            <div className='login-inner-div' key='myreviews' onClick={() => history.push('/my-reviews')}>My Reviews
                            </div>
                        </div>
                        <div>
                            <div className='login-menu-wrapper'>
                                <div className='login-inner-div' onClick={logoutUser}> Log Out</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}