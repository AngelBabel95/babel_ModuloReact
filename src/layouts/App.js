import React from 'react'

import Header from '../components/Header'

const App = props => {
    return (
        <section className="main-section">
            <div className="container-fluid">
                <Header />
            </div>
            {props.children}
        </section>
    )
}

export default App