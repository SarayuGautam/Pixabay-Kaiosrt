import React, { createContext, useReducer } from "react";

const initialState = {
  order: "popular",
  myid: "popular1"
};

const actionNames = {
  SELECT_TAB: "SELECT_TAB",
  LOAD_MORE: "LOAD_MORE",
  SEARCH: "SEARCH",
  INITIALIZE: "INITIALIZE"
};

// for managing page
let page = 2;

const reduce = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionNames.SELECT_TAB:
      page = 2; // re initializing page number

      return Object.assign({}, state, payload, {
        page: 1
      });

    case actionNames.LOAD_MORE:
      return Object.assign({}, state, {
        page: payload,
        myid: state.myid.replace(/[0-9]+$/, payload)
      });

    case actionNames.SEARCH:
      return Object.assign({}, { q: payload, myid: payload + "1" });

    case actionNames.INITIALIZE:
      return Object.assign({}, initialState);

    default:
      return Error("image action not available");
  }
};

export const imageActions = {
  selectTab: options => ({
    type: actionNames.SELECT_TAB,
    payload: options
  }),
  loadMore: () => ({ type: actionNames.LOAD_MORE, payload: page++ }),
  search: query => ({ type: actionNames.SEARCH, payload: query }),
  initialize: () => ({ type: actionNames.INITIALIZE })
};

export const ImageContext = createContext(initialState);

const TabProvider = ({ children }) => {
  const [imageState, imageDispatch] = useReducer(
    reduce,
    initialState
  );

  return (
    <ImageContext.Provider value={{ imageState, imageDispatch }}>
      {children}
    </ImageContext.Provider>
  );
};

export default TabProvider;
