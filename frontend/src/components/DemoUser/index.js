import { useDispatch } from 'react-redux'
import { login } from '../../store/session'
import './demoUser.css'

export const DemoUser = () => {
    const dispatch = useDispatch()
    const loginDemo = () => {
        return dispatch(login({
            credential: 'Demo-Tahani',
            password: 'password'
        }))
    }

    return (
        <span className='.login-button-wrapper'>
        <button className='login-button' onClick={loginDemo}>Login as Demo User</button>
        </span>
    )
}