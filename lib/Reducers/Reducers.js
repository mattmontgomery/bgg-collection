import _ from 'lodash';
import { combineReducers } from 'redux';
import { LOAD_COLLECTION, RECEIVE_COLLECTION, REQUEST_COLLECTION, ADD_COLLECTION_FILTER, REMOVE_COLLECTION_FILTER, CollectionFilters } from '../Actions/Actions';
const { SHOW_ALL, SHOW_OWNED } = CollectionFilters;

function filterCollection(state = [], action) {
    switch (action.type) {
        case ADD_COLLECTION_FILTER:
            return [...state.filter((item)=>{
                return item.filter !== action.filter;
            }),{
                    filter: action.filter,
                    value: action.value
                }];
        case REMOVE_COLLECTION_FILTER:
            return state.filter((item)=>{
                return item.filter !== action.filter;
            });
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
function username(state = '', action) {
    switch(action.type) {
        case LOAD_COLLECTION:
            return action.username;
        case RECEIVE_COLLECTION:
            return action.username;
        default:
            return state;
    }
}

function status(state = '', action) {
    switch(action.type) {
        case REQUEST_COLLECTION:
            return action.status;
        case LOAD_COLLECTION:
            return action.status;
        case RECEIVE_COLLECTION:
            return action.status;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    rawCollection,
    collection,
    filterCollection,
    username,
    status
});

export default rootReducer;
