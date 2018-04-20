import * as types from '../types/movies'
import initialState from './initialState'

export default function moviesReducer(state = initialState.movies, action){
    switch(action.type){
        case types.LOAD_MOVIES_SUCCESS:
            if(action.page === 1) {
                return action.movies
            }
            else {
                return [
                    ...state,
                    ...action.movies,
                ]
            }
        /* case types.LOAD_FILTER_SUCCESS:
            if(action.page === 1) {
                return action.moviesFilter
            }
            else {
                return [
                    ...state,
                    ...action.moviesFilter,
                ]
            } */

        case types.DELETE_MOVIES_SUCCES:
            console.log('Borra')
            console.log(state.length);
            state= state.filter((e) => e.id != action.id)
            console.log(state.length);
            return state;
            break;
        default:
        return state
  }
}
