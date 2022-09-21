import { useEffect, useState } from "react"
import { NavLink} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOwnerReviews } from "../../store/reviews"
import { getAllSpots } from "../../store/spots"
import { deleteOneReview } from "../../store/reviews"
import './OwnerReviews.css'

export const OwnerReviews = () => {
    const dispatch = useDispatch()
    const [spotsLoaded, setSpotsLoaded] = useState(false)

    const reviewData = useSelector(state => state.reviews.user)
    const reviewArr = Object.values(reviewData.ReviewData)

    const spotData = useSelector(state => state.spots.allSpots)

    useEffect(() => {
        if (Object.values(spotData).length > 1) setSpotsLoaded(true)
    }, [spotData])

    useEffect(() => {
        dispatch(getOwnerReviews())
        dispatch(getAllSpots())
    }, [dispatch])

    const deleteReview = async (reviewId) => {
        console.log("IM BEING DELETED")
        await dispatch(deleteOneReview(reviewId))
    }

    let ownerReviews;
    if (spotsLoaded) {
        ownerReviews = reviewArr.map(review => {
            return (
                <div className='single-review-div' key={review.id}>
                    <h3>Review for <span className='review-spotname'>{spotData[review.spotId].name}</span></h3>{/* get spot name for this  */}
                    <p className='review-body'>
                        ★ {review.stars}   "{review.review}"
                    </p>
                    <p className='review-date'>
                        Written {new Date(review.createdAt).toString().slice(3, -42)}
                    </p>
                    <span className='review-span'>
                        <NavLink to={`/${review.id}/edit-review`}><div className='review-button-wrapper'><button id='edit-review'>Edit Review</button></div></NavLink>
                        <div className='review-button-wrapper'><button id='delete-review' onClick={() => deleteReview(review.id)} >Delete Review</button></div>
                    </span>

                    <div>
                        {review.ReviewImages.length > 0 && <p className='review-photos-header'>My Photos for This Spot:</p>}
                        <div className='review-img-wrapper'>
                            {review.ReviewImages.map(obj => {
                                return (
                                    <div>
                                        <img className='review-img' alt={review.review} src={obj.url} />
                                    </div>
                                )
                            })}
                        </div>
                                {review.ReviewImages.length > 0 && (<span>
                                    <button>Manage Photos</button>
                                </span>)}
                    </div>
                </div>)
        })
    }

    return (
        <>
            <div className='review-header-wrapper'>
                <h2 className='review-header'>My Reviews</h2>
            </div>
            <div className='review-wrapper'>
                {ownerReviews}
            </div>
        </>
    )
}