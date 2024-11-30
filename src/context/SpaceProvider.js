import React, { createContext, useReducer } from 'react';

export const SpacesContext = createContext();
export const SpaceProvider = ({ children }) => {
  //Initial State and Actions
  const initialState = {
    spaces: [],
  };

  const actions = {
    ADD_SPACE_ITEMS: 'ADD_SPACE_ITEMS',
    UPDATE_SPACE_ITEM: 'UPDATE_SPACE_ITEM',
    REMOVE_SPACE_ITEM: 'REMOVE_SPACE_ITEM',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case actions.ADD_SPACE_ITEMS:
        return {
          spaces: [...state.spaces, ...action.spaces],
        };
      case actions.REMOVE_SPACE_ITEM: {
        const filteredSpaces = state.spaces.filter(
          (space) => space._id !== action.spaceId
        );
        return { spaces: filteredSpaces };
      }
      case actions.UPDATE_SPACE_ITEM: {
        const updatedSpaces = state.spaces.map((space) =>
          space._id === action.space._id ? { ...action.space } : space
        );
        return { spaces: updatedSpaces };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    spaces: state.spaces,
    addSpaces: (spaces) => {
      dispatch({ type: actions.ADD_SPACE_ITEMS, spaces });
    },
    updateSpace: (space) => {
      dispatch({ type: actions.UPDATE_SPACE_ITEM, space });
    },
    removeSpace: (space) => {
      dispatch({ type: actions.REMOVE_SPACE_ITEM, spaceId: space._id });
    },
  };

  return (
    <SpacesContext.Provider value={value}>{children}</SpacesContext.Provider>
  );
};