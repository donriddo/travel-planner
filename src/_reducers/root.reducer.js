import { rootConstants } from '../_constants';

export function root(state = {}, action) {
  switch (action.type) {
    case rootConstants.SHOW_SEARCH:
      return {
          ...state,
          view: 'search'
      };
    case rootConstants.SHOW_RESULT:
      return {
          ...state,
          view: 'result'
      };
    default:
      return state
  }
}