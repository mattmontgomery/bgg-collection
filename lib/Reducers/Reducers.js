import { combineReducers } from 'redux';
import { LOAD_COLLECTION, RECEIVE_COLLECTION, SET_COLLECTION_FILTER, CollectionFilters } from '../Actions/Actions';
const { SHOW_ALL, SHOW_OWNED } = CollectionFilters;

function collectionFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_COLLECTION_FILTER:
            return action.filter;
        default:
            return state;
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

const rootReducer = combineReducers({
    collection,
    collectionFilter,
    username
});

export default rootReducer;
