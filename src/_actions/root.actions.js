import { rootConstants } from '../_constants';

export const rootActions = {
    showSearch,
    showResult,
};

function showSearch() {
    return dispatch => dispatch({ type: rootConstants.SHOW_SEARCH });
}

function showResult() {
    return dispatch => dispatch({ type: rootConstants.SHOW_RESULT });
}
