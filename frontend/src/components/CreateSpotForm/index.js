import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOneSpot } from '../../store/spots'

import './spotForm.css'

export const CreateASpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState([])

    const onSubmit = async e => {
        e.preventDefault()

        const submission = {
            address,
            city,
            state,
            country,
            lat: 34.0, //include this in form? // what does the create spot look like?
            lng: 66.0, //can leave it blank and make a default lat:0
            name,
            description,
            price,
            url
        }
        let createdSpot;
        try {
            createdSpot = await dispatch(createOneSpot(submission))
        } catch (err) {
            if (err) {
                let errMsgs = err.errors
                let errMsgsArr = Object.values(errMsgs)
                setErrors(errMsgsArr)
            }
        }

        if (createdSpot) {
            setAddress('')
            setCity('')
            setState('')
            setCountry('')
            setLat('')
            setLng('')
            setName('')
            setDescription('')
            setPrice('')
            setUrl('')

            console.log('SPOT BEING CREATED', createdSpot)
            setErrors([])
            history.push(`/spots/${createdSpot.id}`)
        }
    }
    return (
        <>
            <div id='create-spot-name'>
                Host Your Spot
            </div>
            <div id='create-spot-wrapper'>
                <div className='errors-wrapper'>
                    {errors.length > 0 && (
                        <ul className='create-spot-errorlist' key={errors}>
                            <div>Please address the following errors:</div>
                            {errors.map(error => (
                                <li className='create-spot-error' key={error}>{error}</li>
                            ))}

                        </ul>
                    )}
                </div>
                <form className='create-spot-form' onSubmit={onSubmit}>

                    <label className='create-spot-input-title'>Address</label>
                    <div className='create-spot-input address'>
                        <input
                            id='address'
                            type='text'
                            placeholder='123 App Academy St'
                            value={address}
                            onChange={e => setAddress(e.target.value)}>
                        </input>
                    </div>
                    <label className='create-spot-input-title'>City</label>

                    <div className='create-spot-input='>

                        <input
                            type='text'
                            placeholder='San Francisco'
                            value={city}
                            onChange={e => setCity(e.target.value)}>
                        </input>
                    </div>
                    <label className='create-spot-input-title'>State/Province</label>

                    <div className='create-spot-input'>

                        <input
                            type='text'
                            placeholder='California'
                            value={state}
                            onChange={e => setState(e.target.value)}>
                        </input>
                    </div>
                    <label className='create-spot-input-title'>Country</label>

                    <div className='create-spot-input'>
                        <select id="country" name="country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}>
                            <option value='' disabled>Select a country...</option>
                            <option value="United States of America">United States of America</option>
                            <option value="Canada">Canada</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="France">France</option>
                            <option value="Greece">Greece</option>
                            <option value="Guam">Guam</option>
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="Macao">Macao</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Thailand">Thailand</option>                            <option value="United Kingdom">United Kingdom</option>
                        </select>

                    </div>
                    <label className='create-spot-input-title'>Name of Your Spot</label>

                    <div className='create-spot-input'>
                        <input
                            type='text'
                            placeholder='App Academy'
                            value={name}
                            onChange={e => setName(e.target.value)}>
                        </input>
                    </div>
                    <label className='create-spot-input-title'>Description of Your Spot</label>

                    <div className='create-spot-input'>
                        <input
                            type='text'
                            placeholder='A place where software engineers are devloped!'
                            value={description}
                            onChange={e => setDescription(e.target.value)}>
                        </input>
                    </div>
                    <label className='create-spot-input-title'>Price per Night (American Dollars $)</label>
                    <div className='create-spot-input'>
                        <input
                            type='number'
                            placeholder='123'
                            min='1'
                            value={price}
                            onChange={e => setPrice(e.target.value)}>
                        </input>
                    </div>
                    <label className='create-spot-input-title'>Preview Image URL</label>
                    <div className='create-spot-input'>
                        <input
                            type='text'
                            placeholder='https://...'
                            value={url}
                            onChange={e => setUrl(e.target.value)}>
                        </input>
                    </div>
                    <div id='create-spot-button-wrapper' n>
                        <button id='create-spot-button' type='submit'>Create New Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}