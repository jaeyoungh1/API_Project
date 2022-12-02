import { useEffect, useState } from "react"
import { NavLink, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addImage, deleteImage, getOwnerReviews } from "../../store/reviews"
import { getAllSpots } from "../../store/spots"
import trash from '../../images/trash.svg'
import { deleteOneReview } from "../../store/reviews"
import './OwnerReviews.css'

export const OwnerReviews = () => {
    const dispatch = useDispatch()
    const [spotsLoaded, setSpotsLoaded] = useState(false)
    const [seeUrl, setSeeUrl] = useState('')
    const [imgUrl, setImgUrl] = useState(null)
    const [deletePhoto, setDeletePhoto] = useState('')

    const currentUser = useSelector(state => state.session.user)

    const reviewData = useSelector(state => state.reviews.user)
    const reviewArr = Object.values(reviewData.ReviewData)

    const spotData = reviewData.Spot

    useEffect(() => {
        if (Object.values(reviewData).length > 1) setSpotsLoaded(true)
    }, [spotData])

    useEffect(() => {
        dispatch(getOwnerReviews())
    }, [dispatch])

    const deleteReview = async (reviewId) => {
        await dispatch(deleteOneReview(reviewId))
    }
    async function deleteImg(id) {
        await dispatch(deleteImage(id))
        dispatch(getOwnerReviews())
    }

    async function addReviewImg(e) {
        e.preventDefault()
        // const img = {
        //     url: imgUrl
        // }
        // console.log(img, seeUrl)
        await dispatch(addImage(+seeUrl, imgUrl))
        dispatch(getOwnerReviews())
    }
    if (!currentUser) {
        return <Redirect to='/' />
    }

    let ownerReviews;
    if (spotsLoaded) {
        ownerReviews = reviewArr.map(review => {
            return (
                <div className='single-review-div' key={review.id}>
                    <h3>Review for
                        <NavLink style={{ textDecoration: 'none' }} to={`/spots/${spotData[review.id].id}`}><span className='review-spotname'> {spotData[review.id].name}</span></NavLink>
                    </h3>{/* get spot name for this  */}
                    <p className='review-body'>
                        ★ {review.stars}   "{review.review}"
                    </p>
                    <p className='review-date'>
                        Written {new Date(review.createdAt).toString().slice(3, -42)}
                    </p>
                    <span className='review-span'>
                        <NavLink to={`/${review.id}/edit-review`}><div className='review-button-wrapper'><button className='manage-reviews-button'>Edit Review</button></div></NavLink>
                        <div className='review-button-wrapper'><button className='manage-reviews-button' onClick={() => setSeeUrl(review.id)} >Add Review Photo</button></div>
                        <div className='review-button-wrapper'><button className='manage-reviews-button' onClick={() => deleteReview(review.id)} >Delete Review</button></div>
                    </span>
                    {seeUrl === review.id && <form onSubmit={addReviewImg}>
                        <label>Add Review Image Url</label>
                        <input type='file' onChange={e => setImgUrl(e.target.files[0])} />
                        <button className='manage-reviews-button' type='submit'>Add Photo</button>
                    </form>}

                    <div>
                        {review.ReviewImages.length > 0 && <p className='review-photos-header'>My Photos for This Spot:</p>}
                        <div className='review-img-wrapper'>
                            {review.ReviewImages.map(obj => {
                                return (
                                    <div>
                                        <img className='review-img' alt={review.review} src={obj.url}
                                            
                                        />
                                        {<img onClick={() => deleteImg(obj.id)} alt='trash' src={trash} className='delete-photo' />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>)
        })
    }

    return (
        <>
            <div className='review-header-wrapper'>
                <h2 className='review-header'>My Reviews</h2>
            </div>
            <div className='review-wrapper-wrapper'>

                {reviewArr.length ? (<div className='review-wrapper'>
                    {ownerReviews}
                </div>) :
                    <div id='owner-no-reviews'>
                        You haven't written any reviews yet.
                    </div>
                }
            </div>
        </>
    )
}