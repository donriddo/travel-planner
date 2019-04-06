import geolib from 'geolib';
import { geocodeByAddress } from 'react-places-autocomplete';

import { searchConstants } from '../_constants';
import { rootActions } from '../_actions';
import { history } from '../_helpers';

export const searchActions = {
    getDistance,
    geocodeStartAddress,
    geocodeEndAddress,
    updateField
};

function getDistance(data) {
    return dispatch => {
        dispatch(request(data));
        // dispatch(rootActions.showLoader());

        const distance = geolib.getDistance(
            { latitude: data.startLat, longitude: data.startLng },
            { latitude: data.endLat, longitude: data.endLng }
        );

        dispatch(success(distance));
        history.push('/result');
    };

    function request(search) { return { type: searchConstants.GET_DISTANCE_REQUEST, search } }
    function success(distance) { return { type: searchConstants.GET_DISTANCE_SUCCESS, distance } }
    function failure(error) { return { type: searchConstants.GET_DISTANCE_FAILURE, error } }
}

function geocodeStartAddress(address) {
    return dispatch => {
        dispatch(request(address));
        // dispatch(rootActions.showLoader());
        geocodeByAddress(address)
            .then((results) => {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                dispatch(success({
                    start: results[0].formatted_address,
                    startLat: lat,
                    startLng: lng
                }));
                
            })
            .catch(error => dispatch(failure(error)));
    };

    function request(search) { return { type: searchConstants.GEOCODE_START_REQUEST, search } }
    function success(data) { return { type: searchConstants.GEOCODE_START_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.GEOCODE_START_FAILURE, error } }
}

function geocodeEndAddress(address) {
    return dispatch => {
        dispatch(request(address));
        // dispatch(rootActions.showLoader());
        geocodeByAddress(address)
            .then((results) => {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                dispatch(success({
                    end: results[0].formatted_address,
                    endLat: lat,
                    endLng: lng
                }));
                
            })
            .catch(error => dispatch(failure(error)));
    };

    function request(search) { return { type: searchConstants.GEOCODE_END_REQUEST, search } }
    function success(data) { return { type: searchConstants.GEOCODE_END_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.GEOCODE_END_FAILURE, error } }
}

function updateField(data) {
    return dispatch => {
        dispatch({ type: searchConstants.UPDATE_FIELD, data });
    };
}

