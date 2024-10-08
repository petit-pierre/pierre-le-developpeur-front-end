import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Slices/userSlice";
import { thunk } from "redux-thunk";

if (
  document.location.href.includes("https://pierre-le-developpeur.com/kasa") ||
  document.location.href.includes("https://pierre-le-developpeur.com/724")
) {
  if (
    document.location.href === "https://pierre-le-developpeur.com/kasa" ||
    document.location.href === "https://pierre-le-developpeur.com/kasa/"
  ) {
    document.location.href =
      "https://pierre-le-developpeur.com/kasa/index.html";
  }
  if (
    document.location.href === "https://pierre-le-developpeur.com/724" ||
    document.location.href === "https://pierre-le-developpeur.com/724/"
  ) {
    document.location.href = "https://pierre-le-developpeur.com/724/index.html";
  }
} else {
  const store = configureStore({
    reducer: combineReducers({
      data: userSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true,
  });

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
