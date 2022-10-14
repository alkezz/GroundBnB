import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
// import SignUpPage from "./components/SignUpPage"
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      {/* <Route path="/signup">
        <SignUpPage />
      </Route> */}
    </Switch>
  );
}

export default App;
