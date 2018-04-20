import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux' 

import App from '../../layouts/App'
import Home from '../../views/Home'
import Movies from '../../views/Movies'
import MovieV from '../../views/Movie'
import NotFound from '../../views/NotFound'
import TVShows from '../../views/TVShows'

const Router = ({history}) => (
    <ConnectedRouter history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/movies/:id" component={MovieV} />
                <Route path="/shows/:id" component={MovieV} />
                <Route path="/movies" component={Movies} />
                <Route path="/shows" component={TVShows} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </ConnectedRouter>
)

export default Router