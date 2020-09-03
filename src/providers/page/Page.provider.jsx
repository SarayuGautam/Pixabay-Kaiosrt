import React, { createContext, useReducer } from "react";

const initialState = { page: "home" };

const actionNames = {
  SET_PAGE: "SET_PAGE"
};

const reduce = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionNames.SET_PAGE:
      return Object.assign({}, state, { page: payload });

    default:
      break;
  }
};

export const pageActions = {
  setPage: page => ({ type: actionNames.SET_PAGE, payload: page })
};

export const PageContext = createContext(initialState);

const PageProvider = ({ children }) => {
  const [pageState, pageDispatch] = useReducer(reduce, initialState);

  return (
    <PageContext.Provider value={{ pageState, pageDispatch }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;
