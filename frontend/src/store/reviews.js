import { csrfFetch } from './csrf';

const CREATE_REVIEW = 'reviews/create_review'
const ADD_REVIEW_IMG = 'reviews/add_review_photo'
const DELETE_REVIEW_IMG = 'reviews/delete_review_photo'
const LOAD_SPOT_REVIEWS = 'reviews/load_spot_reviews'
const LOAD_USER_REVIEWS = 'reviews/load_user_reviews'
const UPDATE_REVIEW = 'reviews/update_review'
const REMOVE_REVIEW = 'reviews/remove_review'

export function loadAllReviews(reviews) {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviews
    }
}

export function addReviewImage(url) {
    return {
        type: ADD_REVIEW_IMG,
        url
    }
}

export function loadUserReviews(reviews) {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
}

export function createAReview(review) {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export function updateAReview(review) {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

export function deleteAReview(reviewId) {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

export function deleteReviewPhoto(imageId) {
    return {
        type: DELETE_REVIEW_IMG,
        imageId
    }
}


export const getAllSpotReviews = (spotId) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        let data = await res.json()
        dispatch(loadAllReviews(data.Reviews))
        return data
    }
}


export const getOwnerReviews = () => async dispatch => {
    let res = await csrfFetch(`/api/reviews/current`)
    if (res.ok) {
        let data = await res.json()
        dispatch(loadUserReviews(data.Reviews))
        return data
    }
}

export const createOneReview = (spotId, reviewData) => async dispatch => {
    let { review, stars } = reviewData
    let { url } = reviewData

    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(
                { review, stars }
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
        data.ReviewImages = []
        dispatch(createAReview(data));

        if (url.length > 0) {

            const imgResponse = await csrfFetch(`/api/reviews/${data.id}/images`, {
                method: 'POST',
                body: JSON.stringify(
                    { url }
                )
            });
            if (imgResponse.ok) {
                let imgData = await imgResponse.json()
                dispatch(addReviewImage(imgData.url))
            }
        }
        return data;
    }
    catch (error) {
        let errorJSON = await error.json()
        throw errorJSON
    }

}

export const updateOneReview = (reviewId, review) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'PUT',
            body: JSON.stringify(
                review
            )
        });

        console.log("RESPONSE", response)

        if (!response.ok) {
            let error
            error = await response.text();
        }


        const data = await response.json();
        dispatch(updateAReview(data));
        return data;
    }
    catch (error) {
        let errorJSON = await error.json()
        throw errorJSON
    }
};

export const deleteOneReview = (reviewId) => async dispatch => {
    let res = await csrfFetch(`api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        let data = await res.json()
        dispatch(deleteAReview(reviewId))
        return data
    }
}


export const addImage = (reviewId, img) => async dispatch => {
    const formData = new FormData();
    formData.append("image", img);

    // console.log("IMG", img)

    const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
    if (response.ok) {
        let data = await response.json()
        dispatch(addReviewImage(data))
        return data
    } else console.log(response)
}
export const deleteImage = (imageId) => async dispatch => {
    const response = await csrfFetch(`/api/review-images/${imageId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        let data = await response.json()
        dispatch(deleteReviewPhoto(imageId))
    }
}

const initialState = { spot: { ReviewData: {}, User: {}, ReviewImages: [] }, user: { ReviewData: {}, ReviewImages: [], User: {}, Spot: {} } }

export default function reviewsReducer(state = initialState, action) {
    let newState
    let reviewData = {}
    let userData = {}
    let spotData = {}
    let reviewImg = []
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            action.reviews.forEach(review => {
                reviewData[review.id] = review;
                userData[review.id] = review.User
                reviewImg = [...review.ReviewImages]
            })
            newState = { ...state, spot: { ReviewData: { ...reviewData }, User: { ...userData }, ReviewImages: [...reviewImg] } }
            return newState
        case LOAD_USER_REVIEWS:
            // console.log('reviews', action.reviews)
            action.reviews.forEach(review => {
                reviewData[review.id] = review;
                userData[review.id] = review.User
                spotData[review.id] = review.Spot
                reviewImg = [...reviewImg, ...review.ReviewImages]
            })
            newState = { ...state, user: { ReviewData: { ...reviewData }, User: { ...userData }, ReviewImages: [...reviewImg], Spot: { ...spotData } } }
            return newState
        case CREATE_REVIEW:
            reviewData[action.review.id] = action.review;
            userData[action.review.id] = action.review.userId
            newState = {
                ...state,
                spot: {
                    ReviewData: { ...reviewData }, User: { ...userData }, ReviewImages: [...reviewImg]
                }
            }
            return newState;
        case ADD_REVIEW_IMG:
            newState = {
                ...state,
                spot: { ...state.spot, ReviewImages: [...state.spot.ReviewImages, action.url], Owner: {} }
            }
            return newState
        case DELETE_REVIEW_IMG:
            let newArr = state.user.ReviewImages
            let obj = newArr.filter(obj => obj.id === action.id)
            newArr.slice((newArr.indexOf(obj)), 1)
            newState = { ...state, user: { ...state.user, ReviewImages: newArr } }
            return newState
        case UPDATE_REVIEW:
            reviewData[action.review.id] = action.review;
            userData[action.review.id] = action.review.userId
            newState = {
                ...state,
                spot: {
                    ReviewData: { ...reviewData }, User: { ...userData }, ReviewImages: [...reviewImg]
                }
            }
            return newState;

        case REMOVE_REVIEW:
            let newAllReviews = {}
            let stateArr = Object.values(state.user.ReviewData)
            console.log(stateArr)
            stateArr.forEach(obj => {
                return newAllReviews[obj.id] = obj

            })

            newState = { ...state, user: { ...state.user, ReviewData: { ...newAllReviews } } }
            delete newState.user.ReviewData[action.reviewId]
            return newState
        default:
            return state
    }

}
