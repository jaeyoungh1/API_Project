import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerSpots } from '../../store/spots'
import './OwnerSpots.css'

export const OwnerSpots = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => Object.values(state.spots.allSpots))

    useEffect(() => {
        dispatch(getOwnerSpots())
    }, [dispatch])

    const spotsInfo = spots.map(spot => {
        return (
            <NavLink style={{ textDecoration: 'none', color: 'black' }} key={spot.id} to={`/spots/${spot.id}`}>
                <div className='owner-spot-divs'>
                    <div className={`spot ${spot.id}`}  >
                        <div className='spot-img-div'><img className='spot-img' alt={spot.previewImage} src={spot.previewImage} /></div>
                        <div className='spot-location-div'>{`${spot.city}, ${spot.state}`}<span style={{ fontWeight: '300' }} id={`rating-${spot.id}`}>{spot.avgRating !== null ? `★ ${spot.avgRating}` : `★ New`}</span></div>
                        <div className='spot-price-div' style={{ fontWeight: 500 }}>{`$${spot.price}`} <span style={{ fontWeight: 300 }}>night</span></div>
                    </div>
                    <div className='owner-actions'>
                        <NavLink to='/edit-spot'> <button className='owner-actions-button'>Edit</button> </NavLink>
                        <button className='owner-actions-button'>Delete</button>
                    </div>
                </div>
            </NavLink>
        )
    })

    console.log('spotsInfo', spotsInfo)

    if (!spots) return null

    return (
        <>
            <div className='owner-spots-header'>
                <h1>My Spots</h1>
            </div>
            <div id='owner-spots-wrapper'>
                {spotsInfo}
            </div>
        </>
    )
}