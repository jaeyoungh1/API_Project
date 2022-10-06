import { useState } from 'react'
import { Redirect } from 'react-router-dom'



import './LoginForm.css';

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/session'
import { DemoUser } from '../DemoUser'


const LoginForm = () => {
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')

    let currentUser = useSelector(state => state.session.user)
    if (currentUser) return (<Redirect to='/' />)

    const onSubmit = e => {
        e.preventDefault()
        setErrors('')
        const user = {
            credential,
            password
        }
        return dispatch(login(user))
            .catch(async (res) => {
                const data = await res.json();
                console.log('data:', data)
                if (data && data.statusCode === 401) setErrors(data.message)
            })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='modal-header'>Log in</div>
                <span className='break'></span>
                <div className='modal-subheader'>Welcome to HeirBnB! 👑</div>

                <div className='login-errors'>
                    {errors && <div key={errors}>{errors}</div>}
                </div>
                <div className='form-input-wrapper'>

                    <div className='login login-credential'>
                        <label className='login' htmlFor='login credential'>Username or Email</label>
                        <input id='login credential' type='text'
                            value={credential}
                            onChange={e => setCredential(e.target.value)}
                            required />
                    </div>
                    <div className='form-input-break'>

                    </div>
                    <div className='login password'>
                        <label className='login' htmlFor='login password'>Password</label>
                        <input id='login password' type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </div>
                </div>
                <div className='login-button-wrapper'>
                    <button className='login-button' type='submit'>Login</button>
                </div>
                {/* </div> */}
                <div className='demo-user-wrapper'>
                    <DemoUser />
                </div>
            </form>
        </>
    )
}

export default LoginForm 