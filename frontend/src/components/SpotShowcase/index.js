import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOneSpots } from "../../store/spots"
import { getAllSpotReviews } from "../../store/reviews"
import './SpotShowcase.css'

export const SpotShowcase = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const spotData = useSelector(state => state.spots.singleSpot)
    const spot = spotData.spotData
    const spotImgArr = spotData.SpotImages

    const reviewData = useSelector(state => state.reviews.spot)
    console.log('reviewData', reviewData)
    const reviewArr = Object.values(reviewData.ReviewData)
    console.log('reviewArr',reviewArr)

    useEffect(() => {
        dispatch(getOneSpots(+spotId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllSpotReviews(+spotId))
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

    if (!spotData || !reviewData) return null

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

            <div className='one-spot-details-scroll'>
                <div className='details'>
                    <h2>Entire home hosted by {spotData.Owner.firstName}</h2>
                    {/* <div className='profilepic onespot'>

                    </div> */}
                    <h2>aircover</h2>
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                    <p>{spot.description}</p>
                </div>
                <div className='one-spot-checkout floating-tab'>
                    <div className='one-spot-checkout header'>
                        <span>${spot.price} night</span>
                        <span>{spot.avgStarRating === null ? `★ New` : `★${spot.avgStarRating}`}</span>
                        <span>{spot.numReviews} reviews</span>
                    </div>
                    <div className='one-spot-checkout dates'>
                        <div id='checkin date'>Check-In
                            <input type='date'></input>
                        </div>
                        <div id='checkout date'>Check-Out
                            <input type='date'></input>
                        </div>
                    </div>
                    <div className='one-spot-checkout dates'>
                        <div id='one-spot guests'>Guests
                            <select>
                                <option value='1'>1 guest</option>
                                <option value='2'>2 guests</option>
                                <option value='3'>3 guests</option>
                                <option value='4'>4 guests</option>
                                <option value='5'>5 guests</option>
                                <option value='6'>6 guests</option>
                                <option value='7'>7 guests</option>
                                <option value='8'>8 guests</option>
                                <option value='9'>9 guests</option>
                                <option value='10'>10 guests</option>
                                <option value='11'>11 guests</option>
                                <option value='12'>12 guests</option>
                                <option value='13'>13 guests</option>
                                <option value='14'>14 guests</option>
                                <option value='15'>15 guests</option>
                                <option value='16'>16 guests</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='one-spot-reviews'>
                    <h2>{spot.avgStarRating === null ? `★ New` : `★${spot.avgStarRating}`}· {spot.numReviews} review(s)</h2>
                    <div className='spot-reviews'>
                        <div>
                            <NavLink to={`/${spot.id}/create-review`}>Review This Spot</NavLink>
                        </div>
                        {reviewArr.map(obj => {
                            return (
                                <div>
                                    <h3>{reviewData.User[obj.id].firstName}</h3>
                                    <p>{new Date(obj.createdAt).toString().slice(3, -42)}</p>
                                    <p>{obj.review}</p>
                                    <div>
                                        {obj.ReviewImages.map(obj => {
                                            return (
                                                <img alt='reviewphoto' src={obj.url}/>
                                            )
                                        })} 
                                        </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

        </div>
    )
}