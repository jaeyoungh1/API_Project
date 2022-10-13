import { Redirect } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import './SignupForm.css'

import { signUp } from '../../store/session'

export const SignUpPage = () => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const currentUser = useSelector(state => state.session.user)
    if (currentUser) return <Redirect to='/' />

    const onSubmit = async e => {
        e.preventDefault()

        if (password === confirmPassword) {
            setErrors([])
            return dispatch(signUp({ firstName, lastName, username, email, password }))
                .catch(async (res) => {
                    const data = await res.json()
                    const errorArr = Object.values(data.errors)
                    // console.log(errorArr)
                    if (data && errorArr) setErrors(errorArr)
                })
        }
        return setErrors(['Passwords must match'])
    }

    return (
        <form className='login-signup-modal' onSubmit={onSubmit}>
            <div className='modal-header'>Sign Up</div>
            <span className='break'></span>
            <div className='modal-subheader'>Welcome to HeirBnB! 👑</div>
            <div className='login-errors'>
                {errors.length > 0 && errors.map((error, idx) => <div key={idx}>{error}</div>)}
            </div>
            <div className='form-input-wrapper'>

                <div>
                    <label htmlFor='firstName' id='signup firstName'>First Name</label>
                    <input id='signup firstName' type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className='form-input-break'></div>
                <div>
                    <label htmlFor='lastName' id='signup lastName'>Last Name</label>
                    <input id='signup lastName' type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)} />
                </div>
                <div className='form-input-break'></div>
                <div>
                    <label htmlFor='email' id='signup email'>Email</label>
                    <div>

                    <input id='signup email' type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                        </div>
                </div>
                <div className='form-input-break'></div>
                <div>
                    <label htmlFor='username' id='signup username'>Username</label>
                        <input id='signup username' type='text'
                        value={username}
                        onChange={e => setUserName(e.target.value)} />
                </div>
                <div className='form-input-break'></div>
                <div>
                    <label htmlFor='password' id='signup password'>Password</label>
                    <input id='signup password' type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='form-input-break'></div>
                <div>
                    <label htmlFor='confirm password' id='signup confirm password'>Confirm Password</label>
                    <input id='signup confirm password' type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />
                </div>
            </div>
            <div className='signup-button-wrapper'><button className='signup-button' type='submit'>Sign Up</button></div>
        </form>
    )
}