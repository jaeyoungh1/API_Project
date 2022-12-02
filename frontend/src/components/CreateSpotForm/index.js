import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOneSpot } from '../../store/spots'

import './spotForm.css'

export const CreateASpot = () => {
    let currentUser = useSelector(state => state.session.user)
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
    const [url, setUrl] = useState(null)
    const [otherUrl1, setOtherUrl1] = useState(null)
    const [otherUrl2, setOtherUrl2] = useState(null)
    const [otherUrl3, setOtherUrl3] = useState(null)
    const [otherUrl4, setOtherUrl4] = useState(null)
    const [loading, setLoading] = useState(false)


    const [errors, setErrors] = useState([])

    // const otherArr = []

    if (!currentUser) {
        return <Redirect to='/' />
    }

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)

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
            url,
            otherUrl1,
            otherUrl2,
            otherUrl3,
            otherUrl4
        }
        let createdSpot;
        try {
            createdSpot = await dispatch(createOneSpot(submission))
        } catch (err) {
            if (err) {
                setLoading(false)
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
            setOtherUrl1('')
            setOtherUrl2('')
            setOtherUrl3('')
            setOtherUrl4('')

            // console.log('SPOT BEING CREATED', createdSpot)
            setErrors([])
            history.push(`/spots/${createdSpot.id}`)
        }
    }
    return (
        <div id='create-spot-form-wrapper'>
            <div id='create-spot-name'>
                What kind of place will you host?
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

                <div className='create-spot-form-input-wrapper'>
                        <label className='create-spot-input-title'>Address</label>
                        <div className='create-spot-input address'>
                            <input
                                id='address'
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>City</label>

                        <div className='create-spot-input='>

                            <input
                                type='text'
                                value={city}
                                onChange={e => setCity(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>State/Province</label>

                        <div className='create-spot-input'>

                            <input
                                type='text'
                                value={state}
                                onChange={e => setState(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Country</label>

                        <div className='create-spot-input'>
                            <select id="country" name="country"
                                value={country}
                                onChange={e => setCountry(e.target.value)}>
                                <option value=''> </option>
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
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Name of Your Spot</label>

                        <div className='create-spot-input'>
                            <input
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Description of Your Spot</label>

                        <div className='create-spot-input' id='create-spot-textarea'>
                            <textarea
                                className='create-spot-textarea'
                                value={description}
                                onChange={e => setDescription(e.target.value)}>
                            </textarea>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Price per Night (American Dollars $)</label>
                        <div className='create-spot-input'>
                            <input
                                type='number'
                                min='1'
                                value={price}
                                onChange={e => setPrice(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Preview Image</label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='file'
                                // value={url}
                                onChange={e => setUrl(e.target.files[0])}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Additional Images </label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='file'
                                
                                // value={otherUrl1}
                                // placeholder='...'
                                onChange={e => setOtherUrl1(e.target.files[0])}>
                            </input>
                        </div>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='file'
                                placeholder='...'
                                onChange={e => setOtherUrl2(e.target.files[0])}>
                            </input>
                        </div>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='file'
                                placeholder='...'
                                onChange={e => setOtherUrl3(e.target.files[0])}>
                            </input>
                        </div>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='file'
                                placeholder='...'
                                onChange={e => setOtherUrl4(e.target.files[0])}>
                            </input>
                        </div>
                </div>
                        <div id='create-spot-button-wrapper' n>
                            <button id='create-spot-button' type='submit'>{loading ? "Loading...": "Create New Spot"}</button>
                        </div>
                    </form>
            </div>
        </div>
    )
}