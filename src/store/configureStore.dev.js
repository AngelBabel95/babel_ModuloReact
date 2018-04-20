import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

export default function configureStore(initialState, browserHistory) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(browserHistory)),
        window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    ),
  )

  return store
}
