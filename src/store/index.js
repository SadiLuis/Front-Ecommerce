import {createStore ,applyMiddleware, compose} from 'redux';
import {loadState, saveState} from '../Localstorage/localstorage'
import rootReducer  from '../reducer/index';
import thunk from 'redux-thunk';

const initialData = loadState()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,initialData ,composeEnhancers(applyMiddleware(thunk)));

store.subscribe( function () {
    saveState(store.getState())
  })

export default store;