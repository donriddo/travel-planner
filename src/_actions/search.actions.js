import geolib from 'geolib';

import { searchConstants } from '../_constants';
import { rootActions } from '../_actions';

export const searchActions = {
    getDistance
};

function getDistance(data) {
    console.log('Got data: ', data);
    return dispatch => {
        dispatch(request(data));
        // dispatch(rootActions.showLoader());

        const distance = geolib.getDistance(
            { latitude: data.startLat, longitude: data.startLng },
            { latitude: data.endLat, longitude: data.endLng }
        );

        dispatch(success(distance));
        dispatch(rootActions.showResult());
    };

    function request(search) { return { type: searchConstants.GET_DISTANCE_REQUEST, search } }
    function success(distance) { return { type: searchConstants.GET_DISTANCE_SUCCESS, distance } }
    function failure(error) { return { type: searchConstants.GET_DISTANCE_FAILURE, error } }
}

