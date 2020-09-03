import React from 'react';
import LoadingSpinner from './LoadingSpinner.component';

const LoadingSpinnerHOC = WrappedComponent => ({ isLoading, ...otherProps }) => (
    isLoading ? (
        <LoadingSpinner />
    ) : (
        <WrappedComponent { ...otherProps } />
    )
);

export default LoadingSpinnerHOC; //Este es un high order component