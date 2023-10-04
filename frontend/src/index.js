import React from "react";
import ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const stripePromise = loadStripe(
  "pk_test_51MxWA9LwzK2ZnIKMJfqwM9euD1ubGrXRUsvLUkN02InIsfa25fxK1Gdo5ryK5IvyQYGWmNBQCOp3MtjgKPeLVU9H005Pb1qvft"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Elements stripe={stripePromise}>
  <App />
  // </Elements>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
