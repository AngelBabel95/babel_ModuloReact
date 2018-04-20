import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Router from './components/Router'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'
import createHistory from 'history/createBrowserHistory'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.css'

const history = createHistory()
const store = configureStore(window.__INITIAL__STATE__, history)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} />
    </Provider>,
    document.getElementById('root'))

registerServiceWorker()
