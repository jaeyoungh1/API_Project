import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSpots, updateOneSpot } from '../../store/spots'

import './ManageSpotImages.css'

export const EditSpotImages = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

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
        otherImg ? setOtherUrl1(otherImg[0] ? otherImg[0].url : '') : setOtherUrl1('')
    }, [spotId, currSpot])

    let otherImgDiv
    if (otherImg && otherImg.length > 0) {
        otherImgDiv = otherImg.map((obj,i) => {
            return (
                <>
                    <div className='edit-spot-img-div'>
                        <img className='edit-spot-img' alt={obj.id} src={obj.url} />
                    </div>
                    <label className='create-spot-input-title'>Other Spot Image URLs</label>
                    <div className='create-spot-input'>
                        <input
                            // required
                            type='text'
                            placeholder='https://...'
                            value={otherUrl1}} 
                            // ^^^^^^figuring out how to set each URL
                            onChange={e => setOtherUrl1(e.target.value)}>
                        </input>
                    </div>
                </>
            )
        })
    }
    console.log("otherImg", otherImg)

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
                Manage Photos for {currSpot.name}
            </div>
            <div id='create-spot-wrapper'>
                {/* <div className='errors-wrapper'>
                    {errors.length > 0 && (
                        <ul className='create-spot-errorlist' key={errors}>
                            <div>Please address the following errors:</div>
                            {errors.map(error => (
                                <li className='create-spot-error' key={error}>{error}</li>
                            ))}

                        </ul>
                    )}
                </div> */}

                <form className='create-spot-form' onSubmit={onSubmit}>
                    <div>Preview Image</div>
                    <div className='edit-spot-img-div'>
                        <img className='edit-spot-img' alt={currSpot.name} src={prevImg} />
                    </div>
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
                    <div>Other Photos</div>
                    <div>{otherImgDiv}</div>
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
                    <div id='create-spot-button-wrapper' n>
                        <button id='create-spot-button' type='submit'>Edit My Spot</button>
                    </div>
                </form>
            </div>
        </div>
    )
}