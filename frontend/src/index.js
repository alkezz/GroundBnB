import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import ReactGA from "react-ga4";
import reportWebVitals from "./reportWebVitals"
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots"
import * as reviewActions from "./store/reviews"

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotActions = spotActions
  window.reviewActions = reviewActions
}


function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

// ReactGA.initialize("G-C3PD3DKRXK");
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactGA.pageview(window.location.pathname + window.location.search);

// const SendAnalytics = () => {
//   ReactGA.send({
//     hitType: "pageview",
//     page: window.location.pathname,
//   });
// }

// reportWebVitals(SendAnalytics)
