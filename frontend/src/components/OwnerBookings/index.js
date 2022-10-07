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
    const [selectedTab, setSelectedTab] = useState("Upcoming");

    useEffect(() => {
        dispatch(getOwnerBookings())
    }, [dispatch])

    // const handleTabSwitching = () => {
    //     setActiveTab()
    // }

    // const deleteBooking = async (bookingId) => {
    // console.log("IM BEING DELETED")
    // await dispatch(deleteOneBooking(bookingId))
    // }
    if (!currentUser) {
        return <Redirect to='/' />
    }



    let ownerBookingsUpcoming;
    let ownerBookingsPast;
    let bookingArr = Object.values(bookingUserData)
    let upcomingBookingArr = bookingArr.filter(booking => new Date(booking.startDate) > new Date())
    let pastBookingArr = bookingArr.filter(booking => new Date(booking.startDate) < new Date())

    if (upcomingBookingArr.length > 0) {ownerBookingsUpcoming = upcomingBookingArr.map(booking => {
            // console.log('startdate', new Date(booking.startDate) > new Date())
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
    } else ownerBookingsUpcoming = <h3>You don't have any upcoming bookings</h3>

    if (pastBookingArr.length > 0) {
        ownerBookingsPast = pastBookingArr.map(booking => {
            // console.log('startdate', new Date(booking.startDate) > new Date())
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
    } else ownerBookingsPast = <h3>You don't have any previous bookings</h3>

    return (
        <>
            <h3>
                My Reservations
            </h3>
            <div>
                <div onClick={() => setSelectedTab("Upcoming")}>Upcoming</div>
                <div onClick={() => setSelectedTab("Past")}>Past</div>
            </div>
            <div>
                {selectedTab === 'Upcoming' ? ownerBookingsUpcoming : ownerBookingsPast}
            </div>
            {/* {bookingArr.length > 0 ? ownerBookings : <h1>You don't have any current bookings</h1>} */}
        </>
    )
}