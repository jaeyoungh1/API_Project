import { csrfFetch } from './csrf';

const CREATE_SPOT = 'spots/create_spot'
const LOAD_ALL_SPOTS = 'spots/load_all_spots'
const LOAD_ONE_SPOT = 'spots/load_one_spot'
const UPDATE_SPOT = 'spots/update_spot'
const REMOVE_SPOT = 'spots/remove_spot'

export function loadAllSpots(spots) {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    }
}
export function loadASpot(spot) {
    return {
        type: LOAD_ONE_SPOT,
        spot
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

export const getOneSpots = (spotId) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}`)
    console.log('getonespotdata', res)
    if (res.ok) {
        let data = await res.json()
        dispatch(loadASpot(data))
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
        throw errorJSON //figure out why it won't show more than 16
    }

}

export const updateOneSpot = payload => async dispatch => {
    try {
        const response = await fetch(`/api/spots/${payload.id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            let error
            let errorJSON;
            error = await response.text();
            try {
                errorJSON = JSON.parse(error);
            }
            catch {
                throw new Error(error);
            }
            throw new Error(`${errorJSON.error}`);
        }


        const data = await response.json();
        dispatch(updateASpot(data));
        return data;
    }
    catch (error) {
        let errorJSON = await error.json()
        throw errorJSON //figure out why it won't show more than 16
    }
};



const initialState = { allSpots: { spotId: {} }, singleSpot: { spotData: {}, SpotImages: [], Owner: {}} }

export default function spotsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            newState = { ...state, allSpots: { ...action.spots } }
            return newState
        case LOAD_ONE_SPOT:
            newState = { ...state,
                 singleSpot: { ...state.singleSpot, spotData: {...action.spot}} }
            return newState
        case CREATE_SPOT:
            newState = {
                ...state,
                allSpots: { ...state.allSpots, [action.spot.id]: action.spot }
            };
            return newState;

        case UPDATE_SPOT:
            return {
                ...state,
                allSpots: {
                    [action.spot.id]: {
                        ...state[action.spot.id]
                    },
                    ...action.spot
                }
            };

        default:
            return state
    }

}
