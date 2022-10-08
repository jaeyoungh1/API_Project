import { useEffect, useState } from 'react'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerBookings, updateOneBooking } from '../../store/bookings'

// import './EditBooking.cs'

export const EditABooking = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { bookingId } = useParams()
    // let bookingId = props.bookingId
    console.log("bookingId", bookingId)
    const currentUser = useSelector(state => state.session.user)

    const bookingUserData = useSelector(state => state.bookings.user[bookingId])
    // const bookingSpotData = if (bookingUserData useSelector(state => state.bookings.user[bookingId].Spot)

    const bookingUser = useSelector(state => state.bookings.user)
    const [bookingStart, setBookingStart] = useState('')
    const [bookingEnd, setBookingEnd] = useState('')
    const [spotName, setSpotName] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOwnerBookings())
    }, [dispatch])

    let bookingSpotData;

    useEffect(() => {
        if (bookingUserData) {
            setBookingStart(bookingUserData.startDate)
            setBookingEnd(bookingUserData.endDate)
        } 
        if (bookingSpotData.Spot) {
            setSpotName(bookingUserData.Spot.name)
        }

    }, [bookingId, bookingUserData])

    if (!currentUser) {
        return <Redirect to='/' />
    }

    const onSubmit = async e => {
        e.preventDefault()

        const submission = {
            "startDate": bookingStart,
            "endDate": bookingEnd
        }
        let createdBooking;
        try {
            createdBooking = await dispatch(updateOneBooking(+bookingId, submission))
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
    // console.log('spotData', bookingSpotData)
    console.log('spotName', spotName)

 
        
        return (
            <>
                <div id='create-booking-name'>
                    <h2>Edit Booking for <span className='booking-spot-name'> {spotName} </span></h2>
                </div>
                <div id='create-booking-wrapper'>
                    <div className='errors-wrapper'>
                        {errors.length > 0 && (
                            <ul className='create-booking-errorlist' key={errors}>
                                <div>Please address the following errors:</div>
                                {errors.map(error => (
                                    <li className='create-booking-error' key={error}>{error}</li>
                                ))}

                            </ul>
                        )}
                    </div>
                    <form className='create-booking-form' onSubmit={onSubmit}>

                        <label className='create-booking-input-title'>Check-In Date</label>
                        <div className='create-booking-input-booking'>
                            <input
                                id='booking'
                                type='date'
                                value={bookingStart}
                                onChange={e => setBookingStart(e.target.value)}>
                            </input>
                        </div>
                        <label className='create-booking-input-title'>Check-Out Date</label>
                        <div className='create-booking-input-booking'>
                            <input
                                id='booking'
                                type='date'
                                value={bookingEnd}
                                onChange={e => setBookingEnd(e.target.value)}>
                            </input>
                        </div>

                        <div id='create-booking-button-wrapper' n>
                            <button id='create-booking-button' type='submit'>Update My Booking</button>
                        </div>
                    </form>
                </div>
            </>
        )
    
}