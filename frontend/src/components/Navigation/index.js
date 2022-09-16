import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { ProfileButton } from "./ProfileButton"


export const Navigation = () => {

    const currentUser = useSelector(state => state.session.user)

    return (
        <nav>
            {currentUser && (
                <>
                    <ul>
                        <li key='home'><NavLink exact to='/'>Home</NavLink></li>
                    </ul>
                    <ProfileButton />
                </>
            )}
            {!currentUser && (
                <ul>
                    <li key='home'><NavLink exact to='/'>Home</NavLink></li>
                    <li key='signup'><NavLink to='/signup'>Sign Up</NavLink></li>
                    <li key='login'><NavLink to='/login'>Login</NavLink></li>
                </ul>
            )}
        </nav>
    )
}