import { useEffect, useState } from "react"
import { NavLink, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getOwnerBookings } from "../../store/bookings"
import Tabs from '../tabs'
// import { getAllSpots } from "../../store/spots"
// import { deleteOneBooking } from "../../store/bookings"
// import './OwnerBookings.css'

export const OwnerBookings = () => {
    const dispatch = useDispatch()
    // const [spotsLoaded, setSpotsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.user)

    const bookingSpotData = useSelector(state => state.bookings.spot)
    const bookingUserData = useSelector(state => state.bookings.user)
    console.log("booking Spot Data", bookingSpotData)
    console.log("booking User Data", bookingUserData)

    // const spotData = bookingData.Spot

    // useEffect(() => {
    //     if (Object.values(bookingData).length > 1) setSpotsLoaded(true)
    // }, [spotData])

    useEffect(() => {
        dispatch(getOwnerBookings())
    }, [dispatch])

    // const deleteBooking = async (bookingId) => {
    // console.log("IM BEING DELETED")
    // await dispatch(deleteOneBooking(bookingId))
    // }
    const [selectedTab, setSelectedTab] = useState("Upcoming");

    if (!currentUser) {
        return <Redirect to='/' />
    }

    let ownerBookingsUpcoming;
    let ownerBookingsPast;
    let bookingArr = Object.values(bookingUserData)

    ownerBookingsUpcoming = bookingArr.map(booking => {
        console.log('startdate', booking.startDate > new Date())
        let nights = (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24)
        return (
            <div className='single-booking-div' key={booking.id}>
                <h4>
                    {nights} {nights > 1 ? "nights" : "night"} in {booking.Spot.state}
                </h4>
                <div>
                    {booking.startDate} to {booking.endDate} at <NavLink style={{ textDecoration: 'none' }} to={`/spots/${bookingSpotData[booking.id].id}`}><span className='booking-spotname'> {bookingSpotData[booking.id].name}</span></NavLink>
                </div>
                <p className='edit-booking https://i.insider.com/5e4c65927b1ede028c006075?width=1000&format=jpeg&auto=webp'>
                </p>
                <p className='delete-booking'>
                </p>

            </div>
        )
    })

    return (
        <>
            <h3>
                My Reservations
            </h3>
            <div>
                <div>Upcoming</div>
                <div>Past</div>
            </div>
            <div>
                {selectedTab === 'Upcoming' ? ownerBookingsUpcoming : ownerBookingsPast}
            </div>
            {/* {bookingArr.length > 0 ? ownerBookings : <h1>You don't have any current bookings</h1>} */}
        </>
    )
}