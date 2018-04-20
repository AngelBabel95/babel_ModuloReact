import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import Movie from '../../components/Movie'

import * as moviesActions from '../../actions/moviesActions'

class TVShows extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movies: [],
            page: 1,
            loadingMovies: false,
            nowViewing: 'upcoming',
            sortBy: 'title-asc',
            viewingThisYearOnly: false
        }
    }

    componentDidMount(){
        const { movies, nowViewing, page } = this.state
        const { moviesActions } = this.props

        moviesActions.loadShows(page, nowViewing)

        window.addEventListener("scroll", this.infiniteScroller, false);
    }

    infiniteScroller =  e => {
        const { moviesActions } = this.props
        const { page, nowViewing } = this.state
        const scrollTop = window.scrollY
        const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
        const pctScrolled = Math.floor(scrollTop/trackLength * 100)
        if(pctScrolled > 95 && !this.state.loadingMovies) {
            moviesActions.loadShows(page, nowViewing)
            this.setState({
                loadingMovies: true
            })
        }
    }

    componentWillUnmount() {
        // you need to unbind the same listener that was binded.
        window.removeEventListener('scroll', this.infiniteScroller, false);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.movies.length > this.state.movies.length) {
            this.setState({
                loadingMovies: false,
                page: this.state.page + 1,
                movies: nextProps.movies
            })
        }
        else {
            this.setState({
                movies: nextProps.movies,
                loadingMovies: false
            })
        }
    }

    onViewingChange = e => {
        const nowViewing = e.target.value
        const { moviesActions } = this.props
        moviesActions.loadShows(1, nowViewing)
        this.setState({
            page: 2,
            loadingMovies: true,
            nowViewing
        })
    }

    onSortChange = e => {
        this.setState({sortBy: e.target.value})
    }

    sortMovies = movies => {
        const { sortBy } = this.state
        const sorting = sortBy.split('-')

        return _.orderBy(movies, sorting[0], sorting[1])
    }

    onToggleViewingThisYearOnly = e => {
        this.setState({viewingThisYearOnly: !this.state.viewingThisYearOnly})
    }

    filterMovies = movies => {
        return movies.filter(movie => {
            return movie.first_air_date.includes('2018')
        })
    }

    prepareMovies = movies => {
        const { viewingThisYearOnly } = this.state
        let filteredMovies = viewingThisYearOnly ? this.filterMovies(movies) : movies
        console.log(filteredMovies.length)
        return this.sortMovies(filteredMovies)
    }

    deleteM (i) {
        const { moviesActions } = this.props
        let { movies }  = this.state
        let idMovie = i.target.name
        console.log(this.state.movies)
        moviesActions.deleteMovie(idMovie)
        console.log(this.state.movies)
    }

    render() {
        const { movies, nowViewing, sortBy, viewingThisYearOnly } = this.state

        return (
            <section className="container main movies">
                <header className="row">
                    <div className="col-12">
                        <h1>{movies.length > 0 ? 'TV Shows' : 'Loading...'}</h1>
                    </div>
                </header>
                <aside className="row">
                    <div className="form-group">
                        <label>Now viewing:</label>
                        <select className="form-control" onChange={this.onViewingChange} defaultValue={nowViewing}>
                            <option value="popular">Popular</option>
                            <option value="topRated">Top Rated</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sort by:</label>
                        <select className="form-control" onChange={this.onSortChange} defaultValue={sortBy}>
                            <option value="title-asc">Title (Asc)</option>
                            <option value="title-desc">Title (Desc)</option>
                            <option value="popularity-asc">Less Popular</option>
                            <option value="popularity-desc">More Popular</option>
                            <option value="vote_average-asc">Worst</option>
                            <option value="vote_average-desc">Best</option>
                            <option value="release_date-asc">Oldest</option>
                            <option value="release_date-desc">Newest</option>
                        </select>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" onChange={this.onToggleViewingThisYearOnly} type="checkbox" checked={viewingThisYearOnly} />
                            View this year only
                        </label>
                    </div>

                </aside>
                <div className="row movie-list-wrapper text-center">
                    {this.prepareMovies(movies).map((movie, i) => {
                        return (
                          <div class="col-3">
                                <Movie
                                    key={i}
                                    {...movie}
                                />
                                <button type="button" class="btn btn-danger" name={movie.id} onClick={this.deleteM.bind(this)}>Delete</button>

                            </div>
                                
                           
                        )
                    })}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movies: state.movies
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShows)

