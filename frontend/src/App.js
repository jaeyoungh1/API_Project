import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigation } from './components/Navigation';
import { SpotsList } from './components/SpotsList';
import { CreateASpot } from './components/CreateSpotForm';
import { EditASpot } from './components/EditSpotForm';
import { SpotShowcase } from './components/SpotShowcase';
import { OwnerSpots } from './components/OwnerSpots';
import { OwnerBookings } from './components/OwnerBookings';
import { OwnerReviews } from './components/OwnerReviews';
import { EditAReview } from './components/EditReview';
import { EditABooking } from './components/EditBookingForm/EditBookingForm';
import { CreateAReview } from './components/CreateReviewForm';
import { EditSpotImages } from './components/ManageSpotPhotos';
// import { ManageReviewPhotos } from './components/ManageReviewPhotos';
import { Whoops } from './components/404'

import * as sessionActions from './store/session'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsList />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotShowcase />
          </Route>
          {/* <Route path="/signup">
            <SignUpPage />
          </Route> */}
          <Route path='/new-spot'>
            <CreateASpot />
          </Route>
          <Route path="/:spotId/edit-spot">
            <EditASpot />
          </Route>
          <Route path="/:spotId/edit-spot-images">
            <EditSpotImages />
          </Route>
          <Route path='/my-spots'>
            <OwnerSpots />
          </Route>
          <Route path='/my-bookings'>
            <OwnerBookings />
          </Route>
          <Route path='/my-reviews'>
            <OwnerReviews />
          </Route>
          <Route path="/:reviewId/edit-review">
            <EditAReview />
          </Route>
          <Route path="/:bookingId/edit-booking">
            <EditABooking />
          </Route>
          <Route path="/:spotId/create-review">
            <CreateAReview />
          </Route>
          <Route>
            <Whoops />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
