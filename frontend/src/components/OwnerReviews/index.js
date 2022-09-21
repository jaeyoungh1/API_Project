import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOwnerReviews } from "../../store/reviews"
import { getAllSpots } from "../../store/spots"
// import './SpotShowcase.css'

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

    let ownerReviews;
    if (spotsLoaded) {
        ownerReviews = reviewArr.map(review => {
            return (<div>
                <h3>Review for {spotData[review.spotId].name}</h3>{/* get spot name for this  */}
                <p>
                    {review.review}
                </p>
                <p>
                    Written {new Date(review.createdAt).toString().slice(3, -42)}
                </p>
                <div>
                    {review.ReviewImages.length > 0 && <p>My Photos for This Spot</p>}
                    {review.ReviewImages.map(obj => {
                        return (
                            <div>
                                <img alt={review.review} src={obj.url} />
                            </div>
                        )
                    })}
                </div>
            </div>)
        })
    }

    return (
        <>
            <div>
                {ownerReviews}
            </div>
        </>
    )
}