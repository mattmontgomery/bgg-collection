import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './Reducers/Reducers';
import App from './Containers/App';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

let store = createStoreWithMiddleware(rootReducer);

let rootElement = document.getElementById('root');

React.render(
    (
        <Provider store={store}>
            {()=><App />}
        </Provider>
    ),
    rootElement
);
