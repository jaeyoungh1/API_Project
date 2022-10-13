import ReactStars from "react-rating-stars-component"
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOneReview } from '../../store/reviews'


import '../EditReview/EditReview.css'

export const CreateAReview = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

    const currSpotData = useSelector(state => state.spots.singleSpot.spotData)


    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState([])


    const ratingChanged = (newRating) => {
        setStars(newRating)
    };


    const onSubmit = async e => {
        e.preventDefault()

        const submission = {
            review,
            stars,
            url
        }

        console.log('submission', submission)

        let createdReview;
        try {
            createdReview = await dispatch(createOneReview(+spotId, submission))
            console.log('createdReview', createdReview)
        } catch (err) {
            if (err) {
                if (err.statusCode === 400) {
                    console.log('err', err)
                    let errMsgs = err.errors
                    let errMsgsArr = Object.values(errMsgs)
                    setErrors(errMsgsArr)
                }
                if (err.statusCode === 403) {

                    setErrors(['You already have written a review for this spot! Feel free to edit your existing review'])
                }
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
                <h2>Create Review for <span className='review-spot-name'> {currSpotData.name}</span></h2>
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

                        <div className='create-review-input-rating'>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={20}
                                emptyIcon={<i className="far fa-star"></i>}
                                filledIcon={<i className="fa fa-star"></i>}
                                activeColor="#dc1c72" />

                        </div>
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
                        <button id='create-review-button' type='submit'>Create Review</button>
                    </div>
                </form>
            </div>
        </>
    )
}