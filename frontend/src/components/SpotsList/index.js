import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from '../../store/spots'
import './SpotsList.css'

export const SpotsList = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => Object.values(state.spots.allSpots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [])


    const spotsInfo = spots.map(spot => {
        return (
            <div className={`spot ${spot.id}`}>
                <div className='spot-img-div'><img className='spot-img' alt={spot.previewImage} src={spot.previewImage} /></div>
                <div className='spot-location-div'>{`${spot.city}, ${spot.state}`}<span style={{fontWeight:'300'}} id={`rating-${spot.id}`}>{ spot.avgRating !== null ? `★ ${spot.avgRating}`: `no reviews`}</span></div>
                <div className='spot-price-div' style={{fontWeight:500}}>{`$${spot.price}`} <span style={{fontWeight:300}}>night</span></div>
            </div>
        )
    })

    if (!spots) return null
    return (
        <div id='spots-wrapper'>
                {spotsInfo}
        </div>
    )
}