import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
	currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { 
        ...state,
        currentUser: payload,
      };
      // default returns state only if the action type is not called. Remember every single 
      // reducers recieves every single action in Redux, so instead of throwing an error when
      // the type doesn't match, we return the current state.
    default:
      return state;
  }
};