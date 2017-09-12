import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware,  compose } from 'redux';
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import './css/index.css';
import App from './components/App';
import reducer from './reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createHistory();

const historyMiddleware = routerMiddleware(history);

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(historyMiddleware, thunk),
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
        <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

