import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import AllSpotsPage from "./components/AllSpotsPage";
import SpotById from "./components/OneSpot";
import CreateSpotPage from "./components/CreateSpotPage"
import EditSpotPage from "./components/EditSpotPage"
import CreateReview from "./components/ReviewFormPage"
import Maps from "./components/Maps/Maps";
import MapContainer from "./components/Maps";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import "./App.css"

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
          <Route path='/' exact>
            <AllSpotsPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spots/:spotId/review/create">
            <CreateReview />
          </Route>
          <Route path="/spots/:spotId">
            <SpotById />
          </Route>
          <Route path="/spot/create">
            <CreateSpotPage />
          </Route>
          <Route path="/spot/:spotId/edit">
            <EditSpotPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
