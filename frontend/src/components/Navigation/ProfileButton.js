import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
                        <i className="fa-solid fa-bars"></i>
                        <i className="fa-regular fa-user"></i>
                    </button>
                </div>
                {showMenu && (

                    <div id='profile-dropdown' className='profile dropdown'>
                        <ul>

                            <li className='profileusername' key='username'>{user.username}</li>

                            <li className='profileemail' key='email'>{user.email}</li>
                        </ul>
                        <hr />
                        <span></span>
                        <div className='myspots-wrapper'>
                            <Link className='myspots-link' style={{ textDecoration: "none" }} to='/my-spots'>
                                <div className='myspots' key='myspots'>
                                    My Spots
                                </div>
                            </Link>
                        </div>
                        <div className='myspots-wrapper'>
                            <Link className='myspots-link' style={{ textDecoration: "none" }} to='/new-spot'>

                                <div className='newspot' key='newspot'>Host Your Spot
                                </div>
                            </Link>
                        </div>
                        <div className='myspots-wrapper'>
                            <Link className='myspots-link' style={{ textDecoration: "none" }} to='/my-reviews'>

                                <div className='newspot' key='myreviews'>My Reviews
                                </div>
                            </Link>
                        </div>
                        <div>
                            <div className='logout-div'><div onClick={logoutUser} className='logout'>Log Out</div></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}