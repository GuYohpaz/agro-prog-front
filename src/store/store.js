import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { shapeReducer } from '../store/shape-reducer'
import { seedlingReducer } from '../store/seedling-reducer'




const rootReducer = combineReducers({
    shapeModule: shapeReducer,
    seedlingModule: seedlingReducer

})


// attaching to redux tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
