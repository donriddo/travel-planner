import { searchConstants } from '../_constants';
import { rootActions } from '../_actions';

export function search(state = {}, action) {
  switch (action.type) {
    case searchConstants.GET_DISTANCE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case searchConstants.GET_DISTANCE_SUCCESS:
      return {
        ...state,
        distance: action.distance,
        loading: false
      };
    case searchConstants.GET_DISTANCE_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}