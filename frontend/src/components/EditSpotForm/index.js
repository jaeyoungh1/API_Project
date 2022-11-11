import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSpots, updateOneSpot } from '../../store/spots'

import '../CreateSpotForm/spotForm.css'

export const EditASpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()

    const currSpotData = useSelector(state => state.spots.singleSpot)
    const currSpot = currSpotData.spotData
    const currSpotImg = currSpotData.SpotImages

    let currSpotId = currSpot.id
        
    let prevImg 
    if (currSpotImg.length > 0) prevImg = currSpotImg.find(obj => obj.preview === true).url
    
    let otherImg
    if (currSpotImg.length > 0) otherImg = currSpotImg.filter(obj => obj.preview === false)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState(currSpot.state)
    const [country, setCountry] = useState(currSpot.country)
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')

    const [otherUrl1, setOtherUrl1] = useState('')

    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneSpots(spotId))
    }, [dispatch])

    useEffect(() => {
        setAddress(currSpot.address)
        setCity(currSpot.city)
        setState(currSpot.state)
        setCountry(currSpot.country)
        setName(currSpot.name)
        setDescription(currSpot.description)
        setPrice(currSpot.price)
        setUrl(prevImg)
        setOtherUrl1(otherImg[0] ? otherImg[0].url : '')
    }, [spotId, currSpot])

    console.log('otherUrl1',otherUrl1)
    
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
            url,
            otherUrl1
        }
        let createdSpot;
        try {
            createdSpot = await dispatch(updateOneSpot(currSpotId, submission))
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
            setOtherUrl1('')

            setErrors([])
            history.push(`/my-spots`)
        }
    }
    return (
        <div id='create-spot-form-wrapper'>
            <div id='create-spot-name'>
                Edit {currSpot.name}
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
                                placeholder='123 App Academy St'
                                value={address}
                                onChange={e => setAddress(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>City</label>

                        <div className='create-spot-input='>

                            <input
                                type='text'
                                placeholder='San Francisco'
                                value={city}
                                onChange={e => setCity(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>State/Province</label>

                        <div className='create-spot-input'>

                            <input
                                type='text'
                                placeholder='California'
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
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Name of Your Spot</label>

                        <div className='create-spot-input'>
                            <input
                                type='text'
                                placeholder='App Academy'
                                value={name}
                                onChange={e => setName(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Description of Your Spot</label>

                        <div className='create-spot-input' id='create-spot-textarea'>
                            <textarea
                                className='create-spot-textarea'
                                placeholder='A place where software engineers are created!'
                                value={description}
                                onChange={e => setDescription(e.target.value)}>
                            </textarea>
                        </div>
                        <span className='create-spot-form-input-break'></span>
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
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Preview Image URL</label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={url}
                                onChange={e => setUrl(e.target.value)}>
                            </input>
                        </div>
                        <span className='create-spot-form-input-break'></span>
                        <label className='create-spot-input-title'>Other Spot Image URLs</label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl1}
                                onChange={e => setOtherUrl1(e.target.value)}>
                            </input>
                        </div>
                        {/* <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl2}
                                onChange={e => setOtherUrl2(e.target.value)}>
                            </input>
                        </div>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl3}
                                onChange={e => setOtherUrl3(e.target.value)}>
                            </input>
                        </div>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl4}
                                onChange={e => setOtherUrl4(e.target.value)}>
                            </input>
                        </div>  */}
                </div>
                        <div id='create-spot-button-wrapper' n>
                            <button id='create-spot-button' type='submit'>Edit My Spot</button>
                        </div>
                    </form>
            </div>
        </div>
    )
}