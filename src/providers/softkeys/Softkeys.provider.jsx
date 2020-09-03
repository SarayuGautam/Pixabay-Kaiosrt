import React, { createContext, useReducer } from "react";

const initialState = {
  left: "Tab Left",
  center: "Search",
  right: "Tab Right"
};

const actionNames = {
  SET_KEYS: "SET_KEYS"
};

const reduce = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionNames.SET_KEYS:
      return Object.assign({}, state, payload);

    default:
      break;
  }
};

export const softkActions = {
  setkeys: keys => ({ type: actionNames.SET_KEYS, payload: keys })
};

export const SoftkeysContext = createContext(initialState);

const SoftkeysProvider = ({ children }) => {
  const [softkState, softkDispatch] = useReducer(
    reduce,
    initialState
  );

  return (
    <SoftkeysContext.Provider value={{ softkState, softkDispatch }}>
      {children}
    </SoftkeysContext.Provider>
  );
};

export default SoftkeysProvider;
