import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOneSpots } from "../../store/spots"
import { getAllSpotReviews } from "../../store/reviews"
import './SpotShowcase.css'
import aircover from '../../images/aircover.png'

export const SpotShowcase = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.session.user)

    const spotData = useSelector(state => state.spots.singleSpot)
    const spot = spotData.spotData
    const spotImgArr = spotData.SpotImages

    const reviewData = useSelector(state => state.reviews.spot)
    console.log('reviewData', reviewData)
    const reviewArr = Object.values(reviewData.ReviewData)
    const spotUserId = useSelector(state => state.spots.singleSpot.Owner.id)
    const spotUserName = useSelector(state => state.spots.singleSpot.Owner.firstName)

    
    let currentUserId 
    currentUser ? currentUserId = currentUser.id : currentUserId = undefined
    
    console.log('reviewArr', reviewArr)

    useEffect(() => {
        dispatch(getOneSpots(+spotId))
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

    let reviewExists;
    if (currentUserId && reviewArr.length > 0) {
        reviewExists = reviewArr.find(obj => obj.userId === currentUserId)
    }
        

    if (!spotData || !reviewData) return null

    return (
        <div className='one-spot-wrapper'>
            <h1>{spot.name}</h1>
            <div className='one-spot-underheader'>
                <span>{spot.avgStarRating === null ? `★ New` : `★${spot.avgStarRating}`}</span>
                <span> · {spot.numReviews} reviews · </span>
                <span>{spot.city}, {spot.state}, {spot.country}</span>
            </div>
            <div className="one-spot-pics">
                <img id='one-spot-preview' alt={spot.name} src={prevImg} />
                <div className="one-spot-pics-not-preview">
                    {otherImg.length > 0 && otherImg.map(url => <img className='not-preview-image' alt={spot.name} src={url} />)}
                </div>
            </div>

            <div className='one-spot-details-scroll'>
                <div className='details'>
                    <h3>Entire home hosted by {spotUserName}</h3>
                    <div className='descriptionbreak'></div>
                    <img className='aircover' alt='aircover' src={aircover} />
                    <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                    <div className='descriptionbreak'></div>
                    <p>{spot.description}</p>
                </div>
                <div className='one-spot-checkout-floating-tab'>
                    <div className='one-spot-checkout-header'>
                        <div><span className='one-spot-price'>${spot.price}</span> night</div>
                        <div className='one-spot-review'>

                            <span>{spot.avgStarRating === null ? `★ New` : `★ ${spot.avgStarRating}`} · </span>
                            <span id='numreviews'>{spot.numReviews} review(s)</span>
                        </div>
                    </div>
                    <div className='one-spot-checkout-dates'>
                        <div className='checkin'>CHECK-IN
                            <input type='date'></input>
                        </div>
                        <div className='checkin'>CHECKOUT
                            <input type='date'></input>
                        </div>
                    </div>
                    <div className='one-spot-checkout-guests'>
                        <div id='one-spot-guests'>
                            <div>GUESTS</div>
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
            </div>
            <div className='descriptionbreak'></div>

            <div className='one-spot-reviews'>
                <h2>{spot.avgStarRating === null ? `★ New` : `★ ${spot.avgStarRating}`} · {spot.numReviews} review(s)</h2>
                <div className='spot-reviews'>
                    {currentUser && currentUserId !== spotUserId && !reviewExists ?
                        (<div className='review-this-spot'>
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/${spot.id}/create-review`}>Review This Spot</NavLink>
                        </div>) :
                        (<div></div>)
                    }
                    {reviewArr.map(obj => {
                        return (
                            <div className='single-review'>
                                <h3>{reviewData.User[obj.id].firstName}</h3>
                                <p id='single-review-date' className='review-date'>{new Date(obj.createdAt).toString().slice(3, -42)}</p>
                                <p>{obj.review}</p>
                                <div >
                                    {obj.ReviewImages && obj.ReviewImages.map(obj => {
                                        return (
                                            <img className='single-review-image' alt='reviewphoto' src={obj.url} />
                                        
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}