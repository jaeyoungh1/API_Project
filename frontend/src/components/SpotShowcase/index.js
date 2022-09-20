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

    // create one spot, get one spot, figuring out previmg for create one spot
    // blocker: issue with adding new spot to state after hitting 20 spots

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
                    <h2>{spot.avgStarRating === null ? `★ New` : `★${spot.avgStarRating}`}· {spot.numReviews} reviews</h2>
                </div>

            </div>

        </div>
    )
}