import rp from 'request-promise';
// import bgg from 'bgg';
export const CollectionFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_OWNED: 'SHOW_OWNED'
};

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION';
export function requestCollection(username) {
    return {
        type: REQUEST_COLLECTION,
        username,
        status: 'Requesting'
    }
}

export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
export function receiveCollection(username, json) {
    return {
        type: RECEIVE_COLLECTION,
        username,
        collection: json,
        status: 'Loaded'
    }
}

export const FETCH_COLLECTION = 'FETCH_COLLECTION';
export function fetchCollection(username) {
    return dispatch => {
        dispatch(requestCollection(username));
        // bgg('user', {name: 'moonty'})
        //   .then(function(results){
        //     console.log(results);
        //   });
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
        })
        .catch(()=>{
            console.log('Could not load user collection')
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

export const ADD_COLLECTION_FILTER = 'ADD_COLLECTION_FILTER';
export function addCollectionFilter(filter, value) {
    return {
        type: ADD_COLLECTION_FILTER,
        filter,
        value,
    };
}


export const REMOVE_COLLECTION_FILTER = 'REMOVE_COLLECTION_FILTER';
export function removeCollectionFilter(filter) {
    return {
        type: REMOVE_COLLECTION_FILTER,
        filter,
    };
}
