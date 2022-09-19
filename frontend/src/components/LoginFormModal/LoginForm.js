import { useState } from 'react'
import { Redirect } from 'react-router-dom'


import './LoginForm.css';

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/session'

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
        <form onSubmit={onSubmit}> 
            {/* <div className='wrapper'> */}
            <ul>
                {errors && <li key={errors}>{errors}</li>}
            </ul>
            <div className='login credential'>
                <label className='login' htmlFor='login credential'>Username or Email</label>
                <input id='login credential' type='text'
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                    required />
            </div>
            <div className='login password'>
                <label className='login' htmlFor='login password'>Password</label>
                <input id='login password' type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
            </div>
            <button id='login-button' type='submit'>Login</button>
            {/* </div> */}
        </form>
    )
}

export default LoginForm 