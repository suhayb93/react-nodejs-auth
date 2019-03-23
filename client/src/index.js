import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import App from './components/App';
import Routes from './router';
import reducers from './reducers'

const store = createStore(reducers, {
    auth: { authenticated: localStorage.getItem('token') }
} ,composeWithDevTools(applyMiddleware(ReduxThunk)))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Routes />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
