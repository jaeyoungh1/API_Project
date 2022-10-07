import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerReviews, updateOneReview } from '../../store/reviews'
// import './OwnerReviews.css'

export const ManageReviewPhotos = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviewId } = useParams()

    const currReviewData = useSelector(state => state.reviews.user)
    const currReview = currReviewData.ReviewData[reviewId]
    const currReviewSpot = currReview.Spot
    const currReviewImg = currReview.ReviewImages

    // console.log('currReview', currReview)
    // console.log('currReviewImg', currReviewImg)
    // console.log('curReviewSpot', currReviewSpot)


    const [url, setUrl] = useState([])

    useEffect(() => {
        dispatch(getOwnerReviews())
    }, [dispatch])

    const onSubmit = async e => {
        e.preventDefault()

        const submission = {
            url
        }
        let createdReview;
        try {
            createdReview = await dispatch(updateOneReview(reviewId, submission))
        } catch (err) {
            if (err) {
                let errMsgs = err.errors
                let errMsgsArr = Object.values(errMsgs)
                // setErrors(errMsgsArr)
            }
        }

        if (createdReview) {
            setUrl([])
            // console.log('REVIEW BEING EDITED', createdReview)
            history.push(`/my-reviews`)
        }
    }



    let reviewImages
    reviewImages = currReviewImg.map(obj => {
        return (
            <div className='img-div-wrapper'>
                <div className='review-img-wrapper'>
                    <img src={obj.url} />
                </div>
            </div>
        )
    })

    if (!currReviewData) return null
    return (
        <>
            <div className='review-header-wrapper'>
                <h2 className='review-header'>Manage Review Photos for {currReviewSpot.name}</h2>
            </div>
            <div className='review-wrapper'>
                {reviewImages}
            </div>
        </>
    )
}