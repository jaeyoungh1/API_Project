import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from '../../store/spots'

export const SpotsList = () => {
    const dispatch = useDispatch()

    const spots = useSelector(state => Object.values(state.spots.allSpots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [])


    const spotsInfo = spots.map(spot => {
        return (
            <div className={`spot ${spot.id}`}>
                <div id={`img-${spot.id}`}><img style={{ width: 300, height: 300, objectFit: 'cover' }} alt={spot.previewImage} src={spot.previewImage} /></div>
                <div>{`${spot.city}, ${spot.state}`}<span id={`rating-${spot.id}`}>{`★ ${spot.avgRating}`}</span></div>
                <div style={{fontWeight:'bold'}}>{`$${spot.price}`} <span style={{fontWeight:300}}>night</span></div>
            </div>
        )
    })

    if (!spots) return null
    return (
        <div id='spots-wrapper'>

            <div>
                {spotsInfo}
            </div>

        </div>
    )
}