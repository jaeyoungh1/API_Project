import { useEffect, useState } from "react"
import { NavLink, useParams, Redirect, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOneSpots } from "../../store/spots"
import { getAllSpotReviews } from "../../store/reviews"
import { createOneBooking, getAllSpotBookings } from "../../store/bookings"
import './SpotShowcase.css'
import aircover from '../../images/aircover.png'
import noimage from '../../images/noimage.png'

export const SpotShowcase = () => {
    const history = useHistory()
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState('')

    const [bookingStart, setBookingStart] = useState('')
    const [bookingEnd, setBookingEnd] = useState('')
    const [bookingError, setBookingError] = useState(false)
    const [showBookings, setShowBookings] = useState(false)

    const currentUser = useSelector(state => state.session.user)

    const spotData = useSelector(state => state.spots.singleSpot)
    const spot = spotData.spotData
    const spotImgArr = spotData.SpotImages

    const reviewData = useSelector(state => state.reviews.spot)
    const reviewArr = Object.values(reviewData.ReviewData)
    const spotUserId = useSelector(state => state.spots.singleSpot.Owner.id)
    const spotUserName = useSelector(state => state.spots.singleSpot.Owner.firstName)
    const spotBooking = useSelector(state => Object.values(state.bookings.spot))

    let currentUserId
    currentUser ? currentUserId = currentUser.id : currentUserId = undefined

    let allSpotBookings
    // console.log('spootBooking', spotBooking)
    allSpotBookings = spotBooking.length === 0 ? <div>No upcoming bookings</div> : spotBooking.map(booking => {
        console.log("BOOKING", booking)
        return (
            <div>
                {booking.User && <span>{booking.User.firstName} {booking.User.lastName} is staying from  </span>}
                {booking.startDate && new Date(new Date(booking.startDate?.replace(/-/g, '\/'))).toString().slice(0, -42)} to {new Date(new Date(booking.endDate?.replace(/-/g, '\/'))).toString().slice(0, -42)}
                {booking.User && <div>Reservation made on {booking.createdAt.slice(0, -14)}</div>}
            </div>
        )
    })

    useEffect(() => {
        dispatch(getOneSpots(+spotId)).then(res => setErrors(res))
        dispatch(getAllSpotReviews(+spotId))
        dispatch(getAllSpotBookings(+spotId))

    }, [dispatch])

    let areErrors = false;
    errors === "Spot couldn't be found" ? areErrors = true : areErrors = false;

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

    let otherImglength = otherImg.length
    if (otherImg.length < 4) {
        for (let i = 3; i >= otherImglength; i--) {
            otherImg[i] = noimage
        }
    }

    if (!spotData || !reviewData) return null
    if (areErrors) {
        return <Redirect to='/whoops' />
    }

    const onSubmit = async e => {
        e.preventDefault()

        if (currentUser && currentUserId === spotUserId) {
            setBookingError(true)
        }

        const submission = {
            "startDate": bookingStart,
            "endDate": bookingEnd
        }

        // console.log(submission, 'submission')
        let createdBooking;
        try {
            createdBooking = await dispatch(createOneBooking(spotId, submission))
        } catch (err) {
            if (err) {
                let errMsgs = err.errors
                let errMsgsArr = Object.values(errMsgs)
                setErrors(errMsgsArr)
            }
        }
        if (createdBooking) {
            setBookingStart('')
            setBookingEnd('')
            setErrors([])
            return history.push(`/my-bookings`)
        }
    }

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
                {<div className="one-spot-pics-not-preview">
                    {otherImg.length > 0 && otherImg.map(url => <img id={`spot-image-${url.id}`} className='not-preview-image' alt={spot.name} src={url} />)}
                    {/* {otherImg.length < 4 && <img className='not-preview-image' alt={spot.name} src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.electricmirror.com%2Fportfolio-items%2Faria-4%2Fimage-coming-soon%2F&psig=AOvVaw1vz55xwww2emiF5T44clsZ&ust=1664062878144000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPD_kLuLrPoCFQAAAAAdAAAAABAE'} />} */}
                </div>}
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
                            <span id='numreviews'>{spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}</span>
                        </div>
                    </div>

                    <div className='checkout-errors'>
                        {bookingError && <div>You may not reserve a spot you're hosting</div>}
                        {bookingEnd && bookingStart && (new Date(bookingEnd).getTime() <= new Date(bookingStart).getTime()) && (<div className='checkout-error'> Checkout must occur after Check-In </div>)}
                        {(new Date(bookingEnd).getTime() > new Date(bookingStart).getTime()) && errors.length > 0 && (
                            // {console.log(errors.filter(error=> error.includes("conflicts"))}
                            <div className='create-booking-errorlist' key={errors}>
                                {errors.filter(error => error.includes("conflict")) &&
                                    <div className='create-booking-error'> Your requested dates conflict with an existing reservation</div>
                                }
                            </div>
                        )}
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className='one-spot-checkout-dates'>
                            <div className='checkin'>CHECK-IN
                                <input
                                    id='booking'
                                    type='date'
                                    value={bookingStart}
                                    onChange={e => setBookingStart(e.target.value)}>
                                </input>
                            </div>
                            <div className='checkin'>CHECKOUT
                                <input
                                    id='booking'
                                    type='date'
                                    value={bookingEnd}
                                    onChange={e => setBookingEnd(e.target.value)}>
                                </input>
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
                        <button className='submit-booking' type='submit'>Reserve</button>
                    </form>
                    {/* {bookingEnd && bookingStart && (new Date(bookingEnd).getTime() <= new Date(bookingStart).getTime()) && (<div> End Date cannot be on or before Start Date </div>)} */}
                    <div className='wontbecharged'>
                        You won't be charged yet
                    </div>
                    {bookingEnd && bookingStart && ((new Date(bookingEnd).getTime() - new Date(bookingStart).getTime()) / (1000 * 60 * 60 * 24)) > 0 &&
                        <>
                            <div className='booking-lines'>
                                <div className='booking-price-night'> ${spot.price} x {((new Date(bookingEnd).getTime() - new Date(bookingStart).getTime()) / (1000 * 60 * 60 * 24))} nights </div>
                                {bookingEnd && bookingStart ? ((new Date(bookingEnd).getTime() - new Date(bookingStart).getTime()) / (1000 * 60 * 60 * 24)) > 0 && <div> ${spot.price * ((new Date(bookingEnd).getTime() - new Date(bookingStart).getTime()) / (1000 * 60 * 60 * 24))} </div> : <div>...</div>}
                            </div>
                            <div className='booking-lines'>
                                <div className='booking-price-night'> Cleaning fee</div>
                                <div>$60</div>
                            </div>
                            <div className='booking-lines'>
                                <div className='booking-price-night'>Service fee</div>
                                <div>$120</div>
                            </div>
                        </>
                    }

                    <div className='descriptionbreak'></div>

                    <div className='total-booking'>
                        <div>
                            Total before taxes
                        </div>
                        {bookingEnd && bookingStart ? ((new Date(bookingEnd).getTime() - new Date(bookingStart).getTime()) / (1000 * 60 * 60 * 24)) > 0 && <div> ${60 + 120 + spot.price * ((new Date(bookingEnd).getTime() - new Date(bookingStart).getTime()) / (1000 * 60 * 60 * 24))} </div> : <div>...</div>}
                    </div>

                </div>
            </div>

            <div className='descriptionbreak'></div>




            <div className='show-bookings' onClick={() => setShowBookings(!showBookings)} >
                {showBookings ? "Hide booked dates" : "Show booked dates"}
            </div>
            <div className='bookings-shown' >{showBookings && allSpotBookings}</div>


            <div className='descriptionbreak'></div>

            <div className='one-spot-reviews'>
                <h2>{spot.avgStarRating === null ? `★ New` : `★ ${spot.avgStarRating}`} · {spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}</h2>
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