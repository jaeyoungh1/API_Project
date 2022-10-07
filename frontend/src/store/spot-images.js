import { csrfFetch } from "./csrf"

const ADD_PREV_IMAGE = 'spot/add_prev_image'

export const addPrevImg = (img) => {
    return {   
        type: ADD_PREV_IMAGE,
        img
    }
}

export const AddPreviewImg = (data) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    const imageData = await response.json()
    dispatch(addPrevImg(imageData))
    return data;
}

let initialState = {}

export default function spotsReducer(state = initialState, action) {

}

