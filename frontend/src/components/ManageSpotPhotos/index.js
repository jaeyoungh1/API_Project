import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSpots, addSpotImg, AddPreviewImg, deleteSpotImg } from '../../store/spots'
import trash from '../../images/trash.svg'

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

    const [url, setUrl] = useState(null)
    const [otherUrl1, setOtherUrl1] = useState(null)
    const [loading, setLoading] = useState(false)


    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneSpots(spotId))
    }, [dispatch])


    let otherImgDiv
    if (otherImg && otherImg.length > 0) {
        otherImgDiv = otherImg.map((obj, i) => {
            return (
                <div key={i}>
                    <div className='edit-spot-img-div'>
                        <img className='edit-spot-other-img' alt={obj.id} src={obj.url} />
                        {<img onClick={() => deleteImg(obj.id)} alt='trash' src={trash} className='delete-photo' />}
                    </div>
                </div >
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

    const updateFile = (e) => {
        // console.log("TARGET", e.target.files)
        const file = e.target.files[0];
        // console.log("FILE", file)
        if (file) setOtherUrl1(file);
    };
    const updatePrevFile = (e) => {
        // console.log("TARGET", e.target.files)
        const file = e.target.files[0];
        // console.log("FILE", file)
        if (file) setUrl(file);
    };

    const onSubmit = async e => {
        e.preventDefault()

        setLoading(true)
        if (url) {
            await dispatch(AddPreviewImg(spotId, url))
            await dispatch(getOneSpots(spotId))
            setUrl(null)
            setOtherUrl1(null)
            setLoading(false)
        }
        // console.log("URL1", otherUrl1)

        if (otherUrl1) {
            setLoading(true)

            const submission = {
                otherUrl1
            }

            console.log('spotid submission', spotId, submission)

            let createdSpot = await dispatch(addSpotImg(spotId, submission))

            setUrl(null)
            setOtherUrl1(null)
            setLoading(false)
        }
        return history.push(`/${spotId}/edit-spot-images`)

    }

    return (
        <div id='create-spot-form-wrapper'>
            <div id='create-spot-name'>
                Manage Photos for {currSpot?.name}
            </div >

            <form className='edit-spot-img-form' onSubmit={onSubmit}>
                <div id='edit-spot-img-wrapper'>

                    <div className='edit-spot-prev-img'>
                        <div>
                            <div className='edit-spot-prev-img-title'>
                                Current Preview Image
                            </div>
                            <img className='edit-spot-img' alt={currSpot?.name} src={prevImg} />
                            <div>
                                <label className='create-spot-input-title'>
                                    New Preview Image URL
                                </label>
                                <div className='create-spot-input'>
                                    <input
                                        // required
                                        type='file'
                                        // placeholder='https://...'
                                        // value={otherUrl1}
                                        onChange={updatePrevFile}
                                    // onChange={(e) => setOtherUrl1(e.target.files[0])}
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='manage-photos-div'>
                        Other Photos
                        <div className='edit-spot-photos-images'>{otherImgDiv}
                        </div>

                        <div className='edit-spot-photos-urls'>


                            <label className='create-spot-input-title'>
                                {"Add Photo Url"}
                            </label>
                            <div className='create-spot-input'>
                                <input
                                    // required
                                    type='file'
                                    // placeholder='https://...'
                                    // value={otherUrl1}
                                    onChange={updateFile}
                                // onChange={(e) => setOtherUrl1(e.target.files[0])}
                                >
                                </input>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='edit-spot-image-button' >
                    <button id='create-spot-button' type='submit'>{loading ? "Loading..." : "Add New Listing Photos"}</button>
                </div>
            </form>
            <div className='edit-spot-image-button' >
                <div onClick={() => returnToSpot()} id='return-to-listings'>Return to Listing Page</div>
            </div>
        </div>
    )
}