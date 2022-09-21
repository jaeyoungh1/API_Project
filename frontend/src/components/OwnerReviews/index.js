import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOwnerReviews } from "../../store/reviews"
import { getAllSpots } from "../../store/spots"
// import './SpotShowcase.css'

export const OwnerReviews = () => {
    const dispatch = useDispatch()

    const reviewData = useSelector(state => state.reviews.user)
    console.log('reviewData', reviewData)
    const reviewArr = Object.values(reviewData.ReviewData)
    const reviewImgArr = reviewData.ReviewImages
    console.log(reviewArr)

    const spotData = useSelector(state => state.spots.allSpots)

    console.log(spotData)

    useEffect(() => {
        dispatch(getOwnerReviews())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    let prevImg
    let otherImg = []
    if (reviewImgArr) {
        for (let img of reviewImgArr) {
            if (img.preview === true)
                prevImg = img.url
            else {
                otherImg.push(img.url)
            }
        }
    }

    if (!reviewData) return null

    let ownerReviews = reviewArr.map(review => {
        <div>
            <h3>Review for {reviewData.review.id}</h3>{/* get spot name for this  */}
            <p>
                {review.review}
                {/* date */}
            </p>
            <div>
                {prevImg}
            </div>
        </div>
    })
    return (
        <div>
            {ownerReviews}
        </div>
    )
}