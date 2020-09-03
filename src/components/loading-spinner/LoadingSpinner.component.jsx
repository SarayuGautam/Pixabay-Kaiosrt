import React from "react";
import "./LoadingSpinner.styles.scss";

const LoadingSpinner = () => (
  <div id="SpinnerOverlay">
    <div className="spinner-container" />
  </div>
);

export default LoadingSpinner; //Este es un high order component
