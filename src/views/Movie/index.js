import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Movie from '../../components/Movie'

import axios from 'axios';
import * as movieActions from '../../actions/movieActions'
import * as moviesActions from '../../actions/moviesActions'

class Moviev extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: {},
            moviesFilter: {}, /*Estado para similares, recomend  */
            art_similar: 'none',
            art_commetns: 'none',
            art_recomend: 'none',
            similarContent: [],
            recomendContent: [],
            comments: [],
        }
    }

    componentDidMount() {
        const { movieActions, match, location } = this.props
        const { movie, moviesFilter } = this.props
        let path = location.pathname.split('/')[1]
        let id = match.params.id

        this.getComments(id)

        if (path === 'movies') {
            movieActions.loadMovie(id)
            this.getSimilarMovies(id)
            this.getRecomendMovies(id)
        }

        else {
            movieActions.loadShow(id)
            this.getSimilarShows(id)
            this.getRecomendShows(id)
        }


    }

    componentWillReceiveProps({ movie }) {
        this.setState({ movie })
    }

    showSimilar() {
        const { art_similar, art_commetns, art_recomend } = this.state
        this.setState({
            art_similar: 'inline',
            art_commetns: 'none',
            art_recomend: 'none'
        })
        document.getElementById("art_similares").style.display = art_similar
        document.getElementById("comentarios").style.display = art_commetns
        document.getElementById("art_recomend").style.display = art_recomend

    }

    showRecomend() {
        const { art_similar, art_commetns, art_recomend } = this.state
        this.setState({
            art_similar: 'none',
            art_commetns: 'none',
            art_recomend: 'inline'
        })
        document.getElementById("art_similares").style.display = art_similar
        document.getElementById("comentarios").style.display = art_commetns
        document.getElementById("art_recomend").style.display = art_recomend
    }

    showComments() {
        const { art_commetns, art_similar, art_recomend } = this.state
        this.setState({
            art_commetns: 'inline',
            art_similar: 'none',
            art_recomend: 'none'
        })
        document.getElementById("art_similares").style.display = art_similar
        document.getElementById("comentarios").style.display = art_commetns
        document.getElementById("art_recomend").style.display = art_recomend

    }

    getSimilarMovies(id) {
        const { moviesActions, match } = this.props
        /*moviesActions.loadSimilarMovies(id) */
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(response => response.json())
            .then(json =>
                this.setState({ similarContent: json.results }))
            .catch(error => {
                alert('No se han cargado los recomendados')
            })
    }

    getRecomendMovies(id) {
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(response => response.json())
            .then(json =>
                this.setState({ recomendContent: json.results }))
            .catch(error => {
                alert('No se han cargado los recomendados')
            })
    }

    getSimilarShows(id) {
        fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(response => response.json())
            .then(json =>
                this.setState({ similarContent: json.results }))
            .catch(error => {
                alert('No se han cargado los recomendados')
            })
    }

    getRecomendShows(id) {
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(response => response.json())
            .then(json =>
                this.setState({ recomendContent: json.results }))
            .catch(error => {
                alert('No se han cargado los recomendados')
            })
    }

    getComments(id) {
        fetch('http://localhost:3001/comments')
            .then(response => response.json())
            .then(json => {
                return json.filter((mov) => mov.movieId == id)
            })
            .then(res => this.setState({ comments: res }))
            .catch(error => {
                alert('No se han cargado los comentarios')
            })
    }

    setComment() {
        const { match } = this.props
        const {comments} = this.state
        let id = match.params.id
        fetch(`http://localhost:3001/comments`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                body: document.getElementById("contenido").value,
                movieId: match.params.id
            })
        }).then(console.log(this.getComments(id)))
            
    }


    render() {
        const { movie, moviesFilter, art_similar, art_commetns, art_recomend, similarContent, recomendContent, comments } = this.state
        const { moviesActions } = this.props

        return (
            <section className="container main movie" style={{ backgroundImage: movie.id ? `url(https://image.tmdb.org/t/p/w342/${movie.backdrop_path})` : '' }}>
                <div className="overlay"></div>
                <header className="row">
                    <div className="row col-12">
                        <h1 className="col-7" style={{ color: 'white' }} >
                            {
                                movie.id ? movie.title : 'Loading...'
                            }
                            {
                                movie.title ? movie.title : movie.original_name
                            }
                        </h1>
                        <div className="col-5" style={{ Top: 20 }}>
                            <button type="button" class="btn btn-info"
                                onClick={this.showSimilar.bind(this)}>Similares</button>
                            <button type="button" class="btn btn-info"
                                onClick={this.showRecomend.bind(this)}>Recomendados</button>
                            <button type="button" class="btn btn-info" /* name={movie.id} */
                                onClick={this.showComments.bind(this)} >Comentarios</button>
                        </div>

                    </div>
                </header>
                <article className="row movie-item" style={{ marginBottom: 300 }}>
                    <footer className="col-md-4 offset-md-1 my-4 movie-poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})` }}>

                    </footer>
                    <div className="col-md-6 my-4">
                        <header className="w-100">
                            <h1>{movie.title}</h1>
                        </header>
                        <p className="d-block">{movie.overview}</p>
                    </div>
                </article>

                <div id="art_similares" style={{ display: art_similar }}>
                    <h1>Contenido Similar</h1>

                    <div className="row movie-list-wrapper text-center">

                        {similarContent.map((movie, i) => {
                            return (
                                <div class="col-3"
                                    key={i}>
                                    <Movie
                                        key={i}
                                        {...movie}
                                    />
                                </div>
                            )
                        })}
                    </div>

                </div>


                <div id="art_recomend" style={{ display: art_recomend }}>
                    <h1>Contenido Recomendado</h1>

                    <div className="row movie-list-wrapper text-center">

                        {recomendContent.map((movie, i) => {
                            return (
                                <div class="col-3"
                                    key={i}>
                                    <Movie
                                        key={i}
                                        {...movie}
                                    />
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div id="comentarios" style={{ display: art_commetns }}>
                    <h1>Comentarios</h1>
                    <div className="row movie-list-wrapper" style={{ marginBottom: 30 }}>
                        <ul>
                            {comments.map((com, i) => {
                                return (
                                    <div class="col-12">
                                        <li><h4><strong>{com.username}:</strong> {com.body}</h4></li>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                    <h1>Deja tu comentario</h1>
                    <form>
                        <div class="form-group col-sm-12">
                            <label for="username">Name:</label>
                            <input type="text" class="form-control" id="username" ></input>
                        </div>
                        <div class="form-group col-sm-12">
                            <label for="contenido">Contenido:</label>
                            <textarea class="form-control" rows="5" id="contenido"></textarea>
                        </div>
                        <div class="form-group col-sm-12">
                            <button type="button" class="btn btn-danger " onClick={this.setComment.bind(this)}>Enviar</button>
                        </div>
                    </form>


                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        movie: state.movie,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        movieActions: bindActionCreators(movieActions, dispatch),
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Moviev)

