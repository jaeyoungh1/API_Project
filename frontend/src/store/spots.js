import { csrfFetch } from './csrf';

const CREATE_SPOT = 'spots/create_spot'
const LOAD_ALL_SPOTS = 'spots/load_all_spots'
const LOAD_ONE_SPOT = 'spots/load_one_spot'
const UPDATE_SPOT = 'spots/update_spot'
const REMOVE_SPOT = 'spots/remove_spot'

const ADD_PREV_IMAGE = 'spot/add_prev_image'
const ADD_REG_IMG = 'spots/spot/edit_reg_img'
const DELETE_IMG = 'spots/spot/delete_img'
const CLEAN_UP = 'spots/cleanup'


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



export const addPrevImg = (img) => {
    return {
        type: ADD_PREV_IMAGE,
        img
    }
}

export function addRegImg(url) {
    return {
        type: ADD_REG_IMG,
        url
    }
}
export function deleteImg(id) {
    return {
        type: DELETE_IMG,
        id
    }
}

export function _cleanUp() {
    return {
        type: CLEAN_UP
    }
}

export const getAllSpots = () => async dispatch => {
    let res = await csrfFetch('/api/spots')
    if (res.ok) {
        let data = await res.json()
        dispatch(loadAllSpots(data.Spots))
        return data
    } else console.log(await res.json())
}

export const getOneSpots = (spotId) => async dispatch => {
    try {
        let res = await csrfFetch(`/api/spots/${spotId}`)
        if (res.ok) {
            let data = await res.json()
            dispatch(loadASpot(data))
            return data
        }
    } catch (err) {
        let error = await err.json()
        // console.log('error', error.message)
        return error.message
    }
}

export const getOwnerSpots = () => async dispatch => {
    let res = await csrfFetch(`api/spots/current`)
    if (res.ok) {
        let data = await res.json()
        dispatch(loadAllSpots(data.Spots))
        return data
    }
}

export const createOneSpot = (spot) => async dispatch => {
    let { address, city, state, country, lat, lng, name, description, price } = spot
    let { url } = spot
    let { otherUrl1, otherUrl2, otherUrl3, otherUrl4 } = spot

    try {
        const response = await csrfFetch(`/api/spots`, {
            method: 'POST',
            body: JSON.stringify(
                { address, city, state, country, lat, lng, name, description, price }
            )
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
        const imgResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify(
                { url, preview: true }
            )
        });
        if (imgResponse.ok) {
            let imgData = await imgResponse.json()
            dispatch(addPrevImg(imgData))
        }
        const otherImgResponse1 = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify(
                { url: otherUrl1, preview: false }
            )
        });
        if (otherImgResponse1.ok) {
            let imgData = await otherImgResponse1.json()
            dispatch(addRegImg(imgData))
        }
        const otherImgResponse2 = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify(
                { url: otherUrl2, preview: false }
            )
        });
        if (otherImgResponse2.ok) {
            let imgData = await otherImgResponse2.json()
            dispatch(addRegImg(imgData))
        }
        const otherImgResponse3 = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify(
                { url: otherUrl3, preview: false }
            )
        });
        if (otherImgResponse3.ok) {
            let imgData = await otherImgResponse3.json()
            dispatch(addRegImg(imgData))
        }
        const otherImgResponse4 = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify(
                { url: otherUrl4, preview: false }
            )
        });
        if (otherImgResponse4.ok) {
            let imgData = await otherImgResponse4.json()
            dispatch(addRegImg(imgData))
        }

        return data;
    }
    catch (error) {
        let errorJSON = await error.json()
        throw errorJSON //figure out why it won't show more than 16
    }

}

export const updateOneSpot = (spotId, spot) => async dispatch => {
    let { address, city, state, country, lat, lng, name, description, price } = spot
    let { url } = spot
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            body: JSON.stringify(
                { address, city, state, country, lat, lng, name, description, price }
            )
        });

        if (!response.ok) {
            let error
            error = await response.text();
            throw error
        }


        const data = await response.json();
        dispatch(updateASpot(data));
        // console.log('spot data', data)
        if (url.length > 0) {
            let spotRes = await csrfFetch(`/api/spots/${data.id}`)
            if (spotRes.ok) {
                let spotData = await spotRes.json()
                // console.log('oneSpotData', spotData.SpotImages)
                let prevImg = spotData.SpotImages.find(obj => obj.preview === true)
                let deleteImg = await csrfFetch(`/api/spot-images/${prevImg.id}`, {
                    method: "DELETE"
                })
                if (deleteImg.ok) {
                    let newImg = await csrfFetch(`/api/spots/${data.id}/images`, {
                        method: 'POST',
                        body: JSON.stringify(
                            { url, preview: true }
                        )
                    })
                    if (newImg.ok) {
                        let imgData = await newImg.json()
                        dispatch(addPrevImg(imgData))
                    }
                }
            }
        }
        return data;
    }
    catch (error) {
        let errorJSON = await error.json()
        throw errorJSON
    }
};


export const deleteOneSpot = (spotId) => async dispatch => {
    let res = await csrfFetch(`api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        let data = await res.json()
        dispatch(deleteASpot(spotId))
    }
}

export const addSpotImg = (spotId, spot) => async dispatch => {

    let { otherUrl1 } = spot
    // console.log("INSIDE STORE", spot)

    const formData = new FormData();
    formData.append("preview", false)

    if (otherUrl1) {
        formData.append("image", otherUrl1);
        // console.log("INSIDE STORE FORM DATA", formData)
        // console.log("OTHERURL1", otherUrl1, spotId)

        let newImg = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });

        let imgData = await newImg.json()
        if (!imgData.ok) console.log("ERROR: ", imgData)
        // console.log("INSIDE STORE IMGDATA", imgData)
        dispatch(addRegImg(imgData))
    }

}


export const AddPreviewImg = (spotId, url) => async dispatch => {

    let spotRes = await csrfFetch(`/api/spots/${spotId}`)
    if (spotRes.ok) {
        let spotData = await spotRes.json()
        let prevImg = spotData.SpotImages.find(obj => obj.preview === true)
        let deleteImg = await csrfFetch(`/api/spot-images/${prevImg.id}`, {
            method: "DELETE"
            // decided to change page to deleting images and adding images, no editing 
        })
        if (deleteImg.ok) {
            const formData = new FormData();
            formData.append("preview", true)

            if (url) {
                formData.append("image", url);
                // console.log("INSIDE STORE FORM DATA", formData)
                // console.log("OTHERURL1", otherUrl1, spotId)

                let newImg = await csrfFetch(`/api/spots/${spotId}/images`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData,
                });

                let imgData = await newImg.json()
                if (!imgData.ok) console.log("ERROR: ", imgData)
                // console.log("INSIDE STORE IMGDATA", imgData)
                dispatch(addPrevImg(imgData))
            }
            // let newImg = await csrfFetch(`/api/spots/${spotId}/images`, {
            //     method: 'POST',
            //     body: JSON.stringify(
            //         { url, preview: true }
            //     )
            // })
            // if (newImg.ok) {
            //     let imgData = await newImg.json()
            //     console.log("PREV IMG DATA", imgData)
            //     dispatch(addPrevImg(imgData))
            // }
        }
    }
}



export const deleteSpotImg = (imageId) => async dispatch => {
    let response = await csrfFetch(`/api/spot-images/${imageId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteImg(imageId))
    }


}


export const cleanUp = () => async dispatch => {
    dispatch(_cleanUp())
}

const initialState = { allSpots: { spotId: {} }, singleSpot: { spotData: {}, SpotImages: [], Owner: {} } }

export default function spotsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            let allSpotsState = {}
            newState = { ...state, allSpots: { ...action.spots } }
            let allSpotsArr = Object.values(newState.allSpots)
            allSpotsArr.forEach(obj => { //figuring out how to load curr reviews
                return allSpotsState[obj.id] = obj
            })
            newState = { ...state, allSpots: allSpotsState }
            // console.log(newState)
            return newState
        case LOAD_ONE_SPOT:
            newState = {
                ...state,
                singleSpot: { ...state.singleSpot, spotData: { ...action.spot }, SpotImages: [...action.spot.SpotImages], Owner: { ...action.spot.Owner } }
            }
            return newState
        case CREATE_SPOT:
            newState = {
                ...state,
                allSpots: { ...state.allSpots, [action.spot.id]: action.spot }
            };
            return newState;
        case UPDATE_SPOT:
            newState = {
                ...state,
                allSpots: { ...state.allSpots, [action.spot.id]: action.spot }
            };
            return newState
        case REMOVE_SPOT:
            let newAllSpots = {}
            let stateArr = Object.values(state.allSpots)
            stateArr.forEach(obj => { //figuring out how to load curr reviews
                return newAllSpots[obj.id] = obj

            })
            newState = { ...state, allSpots: newAllSpots }
            delete newState.allSpots[action.spotId]
            return newState
        case ADD_PREV_IMAGE:
            newState = {
                ...state,
                singleSpot: { ...state.singleSpot, SpotImages: [...state.singleSpot.SpotImages, action.url] },
                allSpots: { ...state.allSpots, }
            }
            return newState
        case ADD_REG_IMG:
            newState = {
                ...state,
                singleSpot: { ...state.singleSpot, SpotImages: [...state.singleSpot.SpotImages, action.url] },
                allSpots: { ...state.allSpots, }
            }
            return newState
        case DELETE_IMG:
            let newArr = state.singleSpot.SpotImages
            // console.log("NEW ARR", newArr)
            // console.log("ACTION ID", action.id)
            let obj = newArr.filter(obj => obj.id === action.id)
            newArr.slice((newArr.indexOf(obj)), 1)

            newState = { ...state, singleSpot: { ...state.singleSpot, SpotImages: newArr } }
            return newState
        case CLEAN_UP:
            return initialState
        default:
            return state
    }

}
