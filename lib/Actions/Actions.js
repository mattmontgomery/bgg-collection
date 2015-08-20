import rp from 'request-promise';
export const CollectionFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_OWNED: 'SHOW_OWNED'
};

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION';
export function requestCollection(username) {
    return {
        type: REQUEST_COLLECTION,
        username
    }
}

export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
export function receiveCollection(username, json) {
    return {
        type: RECEIVE_COLLECTION,
        username,
        collection: json
    }
}

export const FETCH_COLLECTION = 'FETCH_COLLECTION';
export function fetchCollection(username) {
    return dispatch => {
        dispatch(requestCollection(username));
        return rp(
            {
                uri: `https://bgg-json.azurewebsites.net/collection/${username}`,
                method: 'GET',
                withCredentials: false,
                headers: {
                    'Accept': 'application/json'
                }
            }
        ).then(resp => { return JSON.parse(resp); })
        .then(json => {
            dispatch(receiveCollection(username, json))
        });
    }
}



export const LOAD_COLLECTION = 'LOAD_COLLECTION';
export function loadCollection(collection) {
    return {
        type: LOAD_COLLECTION,
        collection
    };
}

export const SET_COLLECTION_FILTER = 'SET_COLLECTION_FILTER';
export function setCollectionFilter(filter) {
    return {
        type: SET_COLLECTION_FILTER,
        filter
    };
}
