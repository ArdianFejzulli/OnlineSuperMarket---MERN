import { DirectoryActionTypes } from './directory.types'
/* First using static data */

const INITIAL_STATE = {
  sections: []
}

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DirectoryActionTypes.SET_SUB_CATEGORIES:
      return {
        ...state,
        sections: action.payload
      }
    default:
      return state;
  }
}

export default directoryReducer;