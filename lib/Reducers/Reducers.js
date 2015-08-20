import { combineReducers } from 'redux';
import { LOAD_COLLECTION, RECEIVE_COLLECTION, REQUEST_COLLECTION, SET_COLLECTION_FILTER, CollectionFilters } from '../Actions/Actions';
const { SHOW_ALL, SHOW_OWNED } = CollectionFilters;

function filteredCollection(state = [], action) {
    switch (action.type) {
        case SET_COLLECTION_FILTER:
            return action.filteredCollection;
        default:
            return action.collection || [];
    }
}

function collection(state = [], action) {
    switch(action.type) {
        case LOAD_COLLECTION:
            return action.collection;
        case RECEIVE_COLLECTION:
            return action.collection;
        default:
            return state;
    }
}

function rawCollection(state = [], action) {
    switch(action.type) {
        case LOAD_COLLECTION:
            return action.collection;
        case RECEIVE_COLLECTION:
            return action.collection;
        default:
            return state;
    }
}
function username(state = [], action) {
    switch(action.type) {
        case LOAD_COLLECTION:
            return action.username;
        case RECEIVE_COLLECTION:
            return action.username;
        default:
            return state;
    }
}

function status(state = [], action) {
    switch(action.type) {
        case REQUEST_COLLECTION:
            return action.status;
        case LOAD_COLLECTION:
            return action.status;
        case RECEIVE_COLLECTION:
            return action.status;
        default:
            return '';
    }
}

const rootReducer = combineReducers({
    rawCollection,
    collection,
    filteredCollection,
    username,
    status
});

export default rootReducer;
