import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as moviesActions from '../../actions/moviesActions'


import logo from '../../images/logo.svg'

class Header extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            numberOfMovies: props.numberOfMovies,
            txtSearch: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            numberOfMovies: nextProps.numberOfMovies
        })
    }

    onValueChange = e => {
        let value = e.target.value
        this.setState({txtSearch: value}) /*Informa al componente de que los datos han cambiado */
    }


    searchByText() {
        const { moviesActions } = this.props
        const { txtSearch } = this.state
        let path = window.location.pathname.split('/')[1]

        if (path === 'movies') {
            moviesActions.loadSearchMovies(txtSearch,1)
        }

        else {
            moviesActions.loadSearchShows(txtSearch,1)
        }
        
    }

    render() {
        const { numberOfMovies, txtSearch } = this.state
        const { moviesActions } = this.props
        return (
            <div className="row">
            <header className="main-nav d-flex col-12" style={{flexDirection: 'column'}}>
                <div className="logo-wrapper d-flex">
                    <Link className="nav-link" to={`/`}><img src={logo} alt="TMDB"/></Link>
                    {numberOfMovies > 0 && <h1 style={{color: 'white'}}>{numberOfMovies}</h1>}
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/movies`}>Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/shows`}>TV Shows</Link>
                            </li>
                            <input type="text" id="search" onChange={this.onValueChange}></input>
                            <button type="button" class="btn btn-info" onClick={this.searchByText.bind(this)} >Buscar</button>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        numberOfMovies: state.movies.length,
        movies: state.movies
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)