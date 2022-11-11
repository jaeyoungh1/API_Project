import ReactStars from 'react-rating-stars-component'
import { useEffect, useState } from 'react'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerReviews, updateOneReview } from '../../store/reviews'

import './EditReview.css'

export const EditAReview = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviewId } = useParams()
    const currentUser = useSelector(state => state.session.user)

    const currReviewData = useSelector(state => state.reviews.user)
    const currReview = currReviewData.ReviewData[reviewId]

    const currReviewImg = currReviewData.ReviewImages

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

    
    const ratingChanged = (newRating) => {
        setStars(newRating)
    };
   
    if (!currentUser) {
        return <Redirect to='/' />
    }
    
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
                    <div className='create-review-wrapper'>

                        <label className='create-review-input-title'>Review</label>
                        <div className='create-review-input-review'>
                            <textarea
                                id='review'
                                placeholder='What a great location..'
                                value={review}
                                onChange={e => setReview(e.target.value)}>
                            </textarea>
                        </div>
                        <span className='create-review-form-input-break'></span>

                        <label className='create-review-input-title'>Rating</label>

                        {stars > 0 && <div className='create-review-input-rating'>
                            <ReactStars
                                count={5}
                                value={stars}
                                onChange={ratingChanged}
                                size={20}
                                emptyIcon={<i className="far fa-star"></i>}
                                filledIcon={<i className="fa fa-star"></i>}
                                activeColor="#dc1c72" />

                        </div>}
                        <span className='create-review-form-input-break'></span>


                        <label className='create-review-input-title'>Add a Picture</label>
                        <div className='create-review-input'>
                            <input
                                type='text'
                                placeholder='https://...'
                                value={url}
                                onChange={e => setUrl(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div id='create-review-button-wrapper' n>
                        <button id='create-review-button' className='mouse-cursor-gradient-tracking' type='submit'>Edit My Review</button>
                    </div>
                </form>
            </div>
        </>
    )
}