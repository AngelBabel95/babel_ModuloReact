import * as types from '../types/movies'
import { moviesURL } from '../utils'
import { showsURL } from '../utils'

export function loadMoviesSuccess(movies, page) {
    return { type: types.LOAD_MOVIES_SUCCESS, movies, page }
}

export function deleteMovieSuccess(id) {
    return { type: types.DELETE_MOVIES_SUCCES, id }
}

export function searchMoviesSuccess(movies, page) {
    return { type: types.LOAD_MOVIES_SUCCESS, movies, page }
}

export function filterMoviesSuccess(moviesFilter, page) {
    return { type: types.LOAD_FILTER_SUCCESS, moviesFilter, page }
}

export function loadMoviesFailure() {
    return { type: types.LOAD_MOVIES_FAILURE }
}

export function loadMovies(page = 1, endpoint = 'upcoming') {
    return dispatch => {
        fetch(moviesURL[endpoint](page))
            .then(response => response.json())
            .then(json => json.results)
            .then(movies => dispatch(loadMoviesSuccess(movies, page)))
            .catch(error => {
                dispatch(loadMoviesFailure())
                alert('We could not load the page at this time.')
            })
    }
}

export function loadSearchMovies(text, page = 1) {
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=` + text + `&page=` + page)
            .then(response => response.json())
            .then(json => json.results)
            .then(movies => dispatch(searchMoviesSuccess(movies, page)))
            .catch(error => {
                dispatch(loadMoviesFailure())
                alert('We could not load the page at this time.')
            })
    }
}

export function loadSearchShows(text, page = 1) {
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=` + text + `&page=` + page)
            .then(response => response.json())
            .then(json => json.results)
            .then(movies => dispatch(searchMoviesSuccess(movies, page)))
            .catch(error => {
                dispatch(loadMoviesFailure())
                alert('We could not load the page at this time.')
            })
    }
}


export function loadShows(page = 1, endpoint = 'upcoming') {
    return dispatch => {
        fetch(showsURL[endpoint](page))
            .then(response => response.json())
            .then(json => json.results)
            .then(shows => dispatch(loadMoviesSuccess(shows, page)))
            .catch(error => {
                dispatch(loadMoviesFailure())
                alert('We could not load the page at this time.')
            })
    }
}

export function deleteMovie(id) {
    return dispatch => {
        dispatch(deleteMovieSuccess(id))
    }
}

export function loadSimilarMovies(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(json => json.results)
        .then(moviesFilter => dispatch(filterMoviesSuccess(moviesFilter, 1)))
        .catch(error => {
            dispatch(loadMoviesFailure())
            alert('We could not load the page at this time.')
        })
    }

}






