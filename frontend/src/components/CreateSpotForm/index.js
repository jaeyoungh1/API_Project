import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOneSpot } from '../../store/spots'

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
            price
            //add preview image, 2 fetches and a thunk
            //input type password
            // css text-overflow ...
            // css object-fit: cover;
            // mdn input fields 
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
            console.log('SPOT BEING CREATED')
            setErrors([])
            history.push(`/`)
        }
    }
    return (
        <>
        <div id='create-spot-name'>
            Host Your Spot
        </div>
        <div id='create-spot-wrapper'>
            <div className='errors'>
                {errors.length > 0 && (
                    <ul key={errors}>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}

                    </ul>
                )}
            </div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={e => setName(e.target.value)}>
                </input>
                <input
                    type='text'
                    placeholder='address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}>
                </input>
                <input
                    type='text'
                    placeholder='city'
                    value={city}
                    onChange={e => setCity(e.target.value)}>
                </input>
                <input
                    type='text'
                    placeholder='state'
                    value={state}
                    onChange={e => setState(e.target.value)}>
                </input>
                <input
                    type='text'
                    placeholder='country'
                    value={country}
                    onChange={e => setCountry(e.target.value)}>
                </input>
                <input
                    type='text'
                    placeholder='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}>
                </input>
                <input
                    type='text'
                    placeholder='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}>
                </input>
                <button id='create-spot-button' type='submit'>Create New Spot</button>
            </form>
        </div>
        </>
    )
}