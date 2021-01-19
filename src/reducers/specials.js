import produce from "immer";
import { GET_SPECIALS_SUCCESS } from "../actions/specials";

const initialState = {
  specialsList: [],
};

const specialsReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_SPECIALS_SUCCESS:
        draft.specialsList = action.specials;
        break;
      default:
        return draft;
    }
  });
};

export default specialsReducer;
