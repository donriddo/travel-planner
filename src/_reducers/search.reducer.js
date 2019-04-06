import { searchConstants } from '../_constants';
import { rootActions } from '../_actions';

export function search(state = {}, action) {
  switch (action.type) {
    case searchConstants.GET_DISTANCE_REQUEST:
      return {
        ...state,
        from: action.search.start,
        to: action.search.end,
        date: action.search.date,
        numOfPassengers: action.search.passengers,
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
    case searchConstants.GEOCODE_START_REQUEST:
      return {
        ...state,
        requestStartAddress: action.address,
        loading: true
      };
    case searchConstants.GEOCODE_START_SUCCESS:
      return {
        ...state,
        start: action.data.start,
        startLat: action.data.startLat,
        startLng: action.data.startLng,
        loading: false
      };
    case searchConstants.GEOCODE_START_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };
    case searchConstants.GEOCODE_END_REQUEST:
      return {
        ...state,
        requestEndAddress: action.address,
        loading: true
      };
    case searchConstants.GEOCODE_END_SUCCESS:
      return {
        ...state,
        end: action.data.end,
        endLat: action.data.endLat,
        endLng: action.data.endLng,
        loading: false
      };
    case searchConstants.GEOCODE_END_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };
    case searchConstants.UPDATE_FIELD:
      return { 
        ...state,
        ...action.data,
        loading: false
      };
    default:
      return state
  }
}