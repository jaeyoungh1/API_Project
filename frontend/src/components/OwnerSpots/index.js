import { useEffect } from 'react'
import { NavLink , Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerSpots, deleteOneSpot } from '../../store/spots'
import './OwnerSpots.css'

export const OwnerSpots = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => Object.values(state.spots.allSpots))
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOwnerSpots())
    }, [dispatch])

    const deleteSpot = async (spotId) => {
        await dispatch(deleteOneSpot(spotId))
    }

    const spotsInfo = spots.map(spot => {
        return (
            <div className='owner-spot-divs'>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} key={spot.id} to={`/spots/${spot.id}`}>
                    <div className={`spot ${spot.id}`}  >
                        <div className='spot-img-div'><img className='spot-img' alt={spot.previewImage} src={spot.previewImage} /></div>
                        <div className='spot-location-div'>{`${spot.city}, ${spot.state}`}<span style={{ fontWeight: '300' }} id={`rating-${spot.id}`}>{spot.avgRating !== null ? `★ ${spot.avgRating}` : `★ New`}</span></div>
                        <div className='spot-price-div' style={{ fontWeight: 500 }}>{`$${spot.price}`} <span style={{ fontWeight: 300 }}>night</span></div>
                    </div>
                </NavLink>
                <div className='owner-actions'>
                    <NavLink to={`${spot.id}/edit-spot`}> <button className='owner-actions-button'>Edit</button> </NavLink>
                    <NavLink to={`${spot.id}/edit-spot-images`}> <button className='owner-actions-button'>Manage Photos</button> </NavLink>
                    <button className='owner-actions-button' onClick={() => deleteSpot(spot.id)}>Delete</button>
                </div>
            </div>

        )
    })


    if (!currentUser) {
        return <Redirect to='/' />
    }

    if (!spots) return null

    return (
        <>
            <div className='owner-spots-header'>
                <h1>My Spots</h1>
            </div>
            {spots.length ? <div id='owner-spots-wrapper'>
                {spotsInfo}
            </div> :
            <div id='owner-no-spots'>
                You're not currently hosting any spots.
            </div>}
        </>
    )
}