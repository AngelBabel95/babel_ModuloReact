import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import movies from './moviesReducer'
import movie from './movieReducer'
import moviesFilter from './moviesReducer'

const rootReducer = combineReducers({
    movies, 
    movie,
    moviesFilter,
    router: routerReducer
})

export default rootReducer
