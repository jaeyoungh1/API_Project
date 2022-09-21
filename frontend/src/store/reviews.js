import { csrfFetch } from './csrf';

const CREATE_REVIEW = 'reviews/create_review'
const ADD_REVIEW_IMG = 'reviews/add_review_photo'
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

export function addReviewImage(img) {
    return {
        type: ADD_REVIEW_IMG,
        img
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


export const getAllSpotReviews = (spotId) => async dispatch => {
    let res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        let data = await res.json()
        console.log('data', data)
        dispatch(loadAllReviews(data.Reviews))
        return data
    }
}

export const getOwnerReviews = () => async dispatch => {
    let res = await csrfFetch(`api/reviews/current`)
    if (res.ok) {
        let data = await res.json()
        dispatch(loadUserReviews(data.Reviews))
        return data
    }
}

export const createOneReview = (review) => async dispatch => {
    let { address, city, state, country, lat, lng, name, description, price } = review
    let { url } = review

    try {
        const response = await csrfFetch(`/api/reviews`, {
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
        dispatch(createAReview(data));
        const imgResponse = await csrfFetch(`/api/reviews/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify(
                { url, preview: true }
            )
        });
        if (imgResponse.ok) {
            let imgData = await imgResponse.json()
            dispatch(addReviewImage(imgData))
        }
        return data;
    }
    catch (error) {
        let errorJSON = await error.json()
        throw errorJSON //figure out why it won't show more than 16
    }

}

// export const updateOneReview = (reviewId, review) => async dispatch => {
//     let { address, city, state, country, lat, lng, name, description, price } = review
//     let { url } = review
//     try {
//         const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//             method: 'PUT',
//             body: JSON.stringify(
//                 { address, city, state, country, lat, lng, name, description, price }
//             )
//         });

//         if (!response.ok) {
//             let error
//             error = await response.text();
//             console.log(error)
//         }


//         const data = await response.json();
//         dispatch(createAReview(data));
//         if (url.length > 0) {
//             const imgResponse = await csrfFetch(`/api/reviews/${data.id}/images`, {
//                 method: 'POST',
//                 body: JSON.stringify(
//                     { url, preview: true }
//                 )
//             });
//             if (imgResponse.ok) {
//                 let imgData = await imgResponse.json()
//                 dispatch(addPrevImg(imgData))
//             }
//         }
//         return data;
//     }
//     catch (error) {
//         console.log(error)
//         let errorJSON = await error.json()
//         throw errorJSON
//     }
// };

// export const deleteOneReview = (reviewId) => async dispatch => {
//     let res = await csrfFetch(`api/reviews/${reviewId}`, {
//         method: 'DELETE'
//     })
//     if (res.ok) {
//         let data = await res.json()
//         console.log('data shape', data)
//         dispatch(deleteAReview(reviewId))
//     }
// }

const initialState = {  spot: {ReviewData: {}, User: {}, ReviewImages:[]} , user: { ReviewData: {}, ReviewImages: [], User: {}, Spot: {} } } 

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
            newState = { ...state, spot: { ReviewData: { ...reviewData }, User: { ...userData }, ReviewImages: [...reviewImg] }}
            return newState
        case LOAD_USER_REVIEWS:
            action.reviews.forEach(review => {
                reviewData[review.id] = review;
                userData[review.id] = review.User
                spotData[review.id] = review.Spot
                reviewImg = [...reviewImg, ...review.ReviewImages]
            })
            newState = { ...state, user: { ReviewData: { ...reviewData }, User: { ...userData }, ReviewImages: [...reviewImg], Spot: {...spotData} } }
            return newState
        // case CREATE_REVIEW:
        //     newState = {
        //         ...state,
        //         allReviews: { ...state.allReviews, [action.review.id]: action.review }
        //     };
        //     return newState;
        // case ADD_PREV_IMG:
        //     newState = {
        //         ...state,
        //         singleReview: { ...state.singleReview, reviewData: {}, ReviewImages: [action.url], Owner: {} }
        //     }
        //     return newState
        // case UPDATE_REVIEW:
        //     return {
        //         ...state,
        //         allReviews: {
        //             [action.review.id]: {
        //                 ...state[action.review.id]
        //             },
        //             ...action.review
        //         }
        //     };
        // case REMOVE_REVIEW:
        //     newAllReviews = {}
        //     let stateArr = Object.values(state.allReviews)
        //     console.log(stateArr)
        //     stateArr.forEach(obj => {
        //         console.log(obj.id)
        //         return newAllReviews[obj.id] = obj

        //     })
        //     newState = { ...state, allReviews: newAllReviews }
        //     console.log('newState', newState)
        //     delete newState.allReviews[action.reviewId]
        //     return newState
        default:
            return state
    }

}
