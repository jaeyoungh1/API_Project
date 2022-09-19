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

export const createOneSpot = (spot) => async dispatch => {

    try {
        const response = await csrfFetch(`/api/spots`, {
            method: 'POST',
            body: JSON.stringify(spot)
        });

        if (!response.ok) {
            let error
            let errorJSON;
            error = await response.text();
            // console.log('backend error', error)
            try {
                errorJSON = JSON.parse(error);
            }
            catch {
                throw new Error(error);
            }
            throw new Error(`${errorJSON.error}`);
        }


        const data = await response.json();
        dispatch(createASpot(data));
        return data;
    }
    catch (error) {
        let errorJSON = await error.json()
        // console.log('response error', errorJSON)
        throw errorJSON
    }
}

export const updateOneSpot = data => async dispatch => {
    const response = await fetch(`/api/spots/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(createASpot(spot));
        return spot;
    }
};

export const logout = () => async dispatch => {
    let res = await csrfFetch('api/session', {
        method: 'DELETE'
    })
    let data = await res.json()
    // dispatch(removeUser())
    return data
}


const initialState = { allSpots: { spotId: {} } }

export default function spotsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            newState = { ...state, allSpots: { ...action.spots } }
            return newState
        case CREATE_SPOT:
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                return newState;
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            };
        default:
            return state
    }

}
