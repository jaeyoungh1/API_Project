import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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
            <NavLink style={{ textDecoration: 'none', color: 'black' }} key={spot.id} to={`/spots/${spot.id}`}>
                <div className={`spot ${spot.id}`}  >
                    <div className='spot-img-div'><img className='spot-img' alt={spot.previewImage} src={spot.previewImage} /></div>
                    <div className='spot-location-div'>{`${spot.city}, ${spot.state}`}<span style={{ fontWeight: '300' }} id={`rating-${spot.id}`}>{spot.avgRating !== null ? `★ ${spot.avgRating}` : `★ New`}</span></div>
                    <div className='spot-location-country-div' style={{ fontWeight: 300}} >{`${spot.country}`}</div>
                    <div className='spot-price-div' style={{ fontWeight: 500 }}>{`$${spot.price}`} <span style={{ fontWeight: 300 }}>night</span></div>
                </div>
            </NavLink>
        )
    })

    if (!spots) return null
    return (
        <>
            <div id='spots-wrapper'>
                {spotsInfo}
            </div>
            <div className='footer'>
                <div className='clone'>2022 HeirBnb · An Airbnb-clone homage to "The Good Place"</div>
                <div className='name'>Created by <a href='https://github.com/jaeyoungh1'>Jae Hwang</a></div>
            </div>
        </>
    )
}