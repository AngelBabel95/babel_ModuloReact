import React from 'react'
import { Link } from 'react-router-dom'

const Movie = ({poster_path, id, title, overview, original_name}) => (
    <article 
        className="col-md-12 my-4 movie-item"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${poster_path})`}}
    >
        <div className="overlay">
            <header className="w-100 pt-3 px-3">
                <Link className="d-block" to={title ? `/movies/${id}` : `/shows/${id}` }>{title ? title : original_name}</Link>
            </header>
            <p>{overview}</p>
        </div>
    </article>
)

export default Movie