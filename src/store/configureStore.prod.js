import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

export default function configureStore(initialState, browserHistory) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            applyMiddleware(routerMiddleware(browserHistory))
        )
    )
}
