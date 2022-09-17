import { csrfFetch } from './csrf';

const CREATE_SPOT = 'spots/create_spot'
const LOAD_ALL_SPOTS = 'spots/load_all_spots'
const UPDATE_SPOT = 'spots/update_spot'
const REMOVE_SPOT = 'spots/remove_spot'

export function loadAllSpots(spots) {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    }
}

export function createASpot(spot) {
    return {
        type: CREATE_SPOT,
        spot
    }
}
export function updateASpot(spot) {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

export function deleteASpot(spotId) {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}


export const getAllSpots = () => async dispatch => {
    let res = await csrfFetch('/api/spots')
    if (res.ok) {
        let data = await res.json()
        dispatch(loadAllSpots(data.Spots))
        return data
    }
}

export const restoreUser = () => async dispatch => {
    console.log('Restoring User')
    const response = await csrfFetch('/api/session');

    const data = await response.json();
    dispatch((data));
    console.log('Restored User', data)
    return response

};

export const signUp = (user) => async dispatch => {
    const { firstName, lastName, username, email, password } = user
    let res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password
        })
    })
    let data = await res.json()
    console.log('data', data)
    dispatch((data))
    return res

}

export const logout = () => async dispatch => {
    let res = await csrfFetch('api/session', {
        method: 'DELETE'
    })
    let data = await res.json()
    // dispatch(removeUser())
    return data
}


const initialState = { allSpots: { spotId:{} } }

export default function spotsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            newState = {...state, allSpots: {...action.spots}}
            return newState
        default:
            return state
    }

}
