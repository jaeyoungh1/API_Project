import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerReviews, updateOneReview } from '../../store/reviews'

import './EditReview.css'

export const EditAReview = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviewId } = useParams()

    const currReviewData = useSelector(state => state.reviews.user)
    // const currSpotData = useSelector(state => state.reviews.user.Spot)
    // const currReview = useSelector(state => state.reviews.user.ReviewData[reviewId])
    const currReview = currReviewData.ReviewData[reviewId]
    console.log('currReview', currReview)
    console.log('currReviewData', currReviewData)

    const currReviewImg = currReviewData.ReviewImages
    // const currSpot = currReview.Spot
    

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [url, setUrl] = useState([])
    const [spotName, setSpotName] = useState('')
    const [errors, setErrors] = useState([])
    
    useEffect(() => {
        dispatch(getOwnerReviews())
    }, [dispatch])

    
    useEffect(() => {
        if (currReview) {
            setReview(currReview.review)
            setStars(currReview.stars)
            setSpotName(currReview.Spot.name)
        }

    }, [reviewId, currReview])


    const onSubmit = async e => {
        e.preventDefault()

        const submission = {
            review,
            stars
        }
        let createdReview;
        try {
            createdReview = await dispatch(updateOneReview(reviewId, submission))
        } catch (err) {
            if (err) {
                let errMsgs = err.errors
                let errMsgsArr = Object.values(errMsgs)
                setErrors(errMsgsArr)
            }
        }

        if (createdReview) {
            setReview('')
            setStars(0)
            setUrl([])
        
            console.log('REVIEW BEING EDITED', createdReview)
            setErrors([])
            history.push(`/my-reviews`)
        }
    }

    return (
        <>
            <div id='create-review-name'>
                <h2>Edit Review for <span className='review-spot-name'> {spotName}</span></h2>
            </div>
            <div id='create-review-wrapper'>
                <div className='errors-wrapper'>
                    {errors.length > 0 && (
                        <ul className='create-review-errorlist' key={errors}>
                            <div>Please address the following errors:</div>
                            {errors.map(error => (
                                <li className='create-review-error' key={error}>{error}</li>
                            ))}

                        </ul>
                    )}
                </div>
                <form className='create-review-form' onSubmit={onSubmit}>

                    <label className='create-review-input-title'>Review</label>
                    <div className='create-review-input-review'>
                        <textarea
                            id='review'
                            placeholder='What a great location..'
                            value={review}
                            onChange={e => setReview(e.target.value)}>
                        </textarea>
                    </div>
                    <label className='create-review-input-title'>Rating</label>

                    <div className='create-review-input-rating'>

                        ★<input
                            type='number'
                            placeholder='4'
                            value={stars}
                            onChange={e => setStars(e.target.value)}>
                        </input>/5 
                    </div>
                    
                    {/* <label className='create-spot-input-title'>My Review Pictures</label>
                    <div className='remove-current-photos'>

                    <div className='create-spot-input'>
                        <input
                            type='text'
                            placeholder='https://...'
                            value={url}
                            onChange={e => setUrl(e.target.value)}>
                        </input>
                    </div> */}
                    <div id='create-review-button-wrapper' n>
                        <button id='create-review-button' type='submit'>Update My Review</button>
                    </div> 
                </form>
            </div>
        </>
    )
}