import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSpots, addSpotImg, AddPreviewImg, deleteSpotImg } from '../../store/spots'

import './ManageSpotImages.css'

export const EditSpotImages = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

    const currSpotData = useSelector(state => state.spots.singleSpot)
    const currSpot = currSpotData.spotData
    const currSpotImg = currSpotData.SpotImages


    let prevImg
    if (currSpotImg?.length > 0) prevImg = currSpotImg.find(obj => obj?.preview === true).url

    let otherImg
    if (currSpotImg?.length > 0) otherImg = currSpotImg.filter(obj => obj?.preview === false)

    const [url, setUrl] = useState('')

    const [otherUrl1, setOtherUrl1] = useState('')
    const [otherUrl2, setOtherUrl2] = useState('')
    const [otherUrl3, setOtherUrl3] = useState('')
    const [otherUrl4, setOtherUrl4] = useState('')

    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneSpots(spotId))
    }, [dispatch])

    useEffect(() => {

        // setUrl(prevImg)
        // otherImg ? setOtherUrl1(otherImg[0] ? otherImg[0].url : '') : setOtherUrl1('')
        // otherImg ? setOtherUrl2(otherImg[1] ? otherImg[1].url : '') : setOtherUrl2('')
        // otherImg ? setOtherUrl3(otherImg[2] ? otherImg[2].url : '') : setOtherUrl3('')
        // otherImg ? setOtherUrl4(otherImg[3] ? otherImg[3].url : '') : setOtherUrl4('')

    }, [spotId, currSpot])

    let otherImgDiv
    if (otherImg && otherImg.length > 0) {
        otherImgDiv = otherImg.map((obj, i) => {
            return (
                <>
                    <div className='edit-spot-img-div'>
                        <img className='edit-spot-other-img' alt={obj.id} src={obj.url} />
                        <div onClick={() => deleteImg(obj.id)}>Delete</div>
                    </div>
                </>
            )
        })
    }

    function returnToSpot() {
        history.push(`/spots/${spotId}`)
    }

    async function deleteImg(id) {
        await dispatch(deleteSpotImg(id))
        await dispatch(getOneSpots(spotId))
    }

    const onSubmit = async e => {
        e.preventDefault()
        if (url.length > 0) {
            await dispatch(AddPreviewImg(spotId, url))
            await dispatch(getOneSpots(spotId))
        }

        const submission = {
            otherUrl1,
            otherUrl2,
            otherUrl3,
            otherUrl4
        }
        let createdSpot;
        try {
            // console.log('spotid submission', spotId, submission)
            createdSpot = await dispatch(addSpotImg(spotId, submission))
            setUrl('')
            setOtherUrl1('')
            setOtherUrl2('')
            setOtherUrl3('')
            setOtherUrl4('')
        } catch (err) {
            if (err) {
                console.log(err)
            }
        }

        if (createdSpot) {

            setErrors([])
            history.push(`/spots/${spotId}`)
        }
    }

    return (
        <div id='create-spot-form-wrapper'>
            <div id='create-spot-name'>
                Manage Photos for {currSpot?.name}
            </div >
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

            <form className='edit-spot-img-form' onSubmit={onSubmit}>
                <div id='edit-spot-img-wrapper'>
                    <div>Current Preview Image
                        <div className='edit-spot-img-div'>
                            <img className='edit-spot-img' alt={currSpot?.name} src={prevImg} />
                        </div>
                        <label className='create-spot-input-title'>New Preview Image URL</label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={url}
                                onChange={e => setUrl(e.target.value)}>
                            </input>
                        </div>
                    </div>

                    <div>Other Photos
                        <div className='edit-spot-photos-images'>{otherImgDiv}</div>
                    </div>

                    <div className='edit-spot-photos-urls'>


                        <label className='create-spot-input-title'>
                            {otherUrl1 ? "Edit Photo Url" : "Add Photo Url"}
                        </label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl1}
                                onChange={e => setOtherUrl1(e.target.value)}>
                            </input>
                        </div>
                        <label className='create-spot-input-title'>
                            {otherUrl1 ? "Edit Photo Url" : "Add Photo Url"}
                        </label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl2}
                                onChange={e => setOtherUrl2(e.target.value)}>
                            </input>
                        </div>
                        <label className='create-spot-input-title'>
                            {otherUrl1 ? "Edit Photo Url" : "Add Photo Url"}
                        </label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl3}
                                onChange={e => setOtherUrl3(e.target.value)}>
                            </input>
                        </div>
                        <label className='create-spot-input-title'>
                            {otherUrl1 ? "Edit Photo Url" : "Add Photo Url"}
                        </label>
                        <div className='create-spot-input'>
                            <input
                                // required
                                type='text'
                                placeholder='https://...'
                                value={otherUrl4}
                                onChange={e => setOtherUrl4(e.target.value)}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className='edit-spot-image-button' >
                    <button id='create-spot-button' type='submit'>Add New Listing Photos</button>
                </div>
            </form>
            <div className='edit-spot-image-button' >
                <div onClick={() => returnToSpot()} id='return-to-listings'>Return to Listing Page</div>
            </div>
        </div>
    )
}