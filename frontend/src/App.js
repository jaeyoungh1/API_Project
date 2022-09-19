import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
// import { LoginFormPage } from './components/LoginFormPage'
import { SignUpPage } from './components/SignupFormPage';
import { Navigation } from './components/Navigation';
import { SpotsList } from './components/SpotsList';
import { CreateASpot } from './components/CreateSpotForm';

import * as sessionActions from './store/session'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => console.log('User being restored...')).then(() => setIsLoaded(true));
  }, [dispatch]);

  console.log("isLoaded is: ", isLoaded)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotsList />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path='/new-spot'>
            <CreateASpot />
          </Route>
        </Switch>
      )}
    </>
  );
}
// return (
//     <>
//       <Navigation isLoaded={isLoaded} />

//       <Switch>
//         <Route exact path='/'>
//           <SpotsList />
//         </Route>
//         <Route path="/signup">
//           <SignUpPage />
//         </Route>
//         <Route path='/new-spot'>
//           <CreateASpot />
//         </Route>
//       </Switch>

//     </>
//   );
// }
export default App;
