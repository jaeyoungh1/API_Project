import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOneSpots } from "../../store/spots"
import './SpotShowcase.css'

export const SpotShowcase = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spotData = useSelector(state => state.spots.singleSpot)
    const spot = spotData.spotData
    const spotImgArr = spotData.SpotImages

    useEffect(() => {
        dispatch(getOneSpots(+spotId))
    }, [dispatch])

    let prevImg
    let otherImg = []
    if (spotImgArr) {
        for (let img of spotImgArr) {
            if (img.preview === true)
                prevImg = img.url
            else {
                otherImg.push(img.url)
            }
        }
    }

    console.log(otherImg)

    if (!spotData) return null

    return (
        <div className='one-spot-wrapper'>
            <h1>{spot.name}</h1>
            <div className='one-spot-underheader'>
                <span>{spot.avgStarRating === null ? `★ New` : `★${spot.avgStarRating}`}</span>
                <span>{spot.numReviews} reviews</span>
                <span>{spot.city}, {spot.state}, {spot.country}</span>
            </div>
            <div className="one-spot-pics">
                <img id='one-spot-preview' alt={spot.name} src={prevImg} />
                {otherImg.length > 0 && otherImg.map(url => <img alt={spot.name} src={url} />)}
            </div>

            <div className='one-spot-details-calendar'>
                <div className='details'>
                    <h2>Entire home hosted by </h2>
                    {/* <div className='profilepic onespot'>

                    </div> */}
                    <h2>aircover</h2>
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                    <p>{spot.description}</p>
                </div>
                <div className='one-spot-checkout'>
                    <div className='one-spot-checkout header'>
                        <span>${spot.price} night</span>
                        <span>{spot.avgStarRating === null ? `★ New` : `★${spot.avgStarRating}`}</span>
                        <span>{spot.numReviews} reviews</span>
                    </div>
                    <div className='one-spot-checkout dates'>
                        <div id='checkin date'>Check-In
                            <input type='date'></input>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}