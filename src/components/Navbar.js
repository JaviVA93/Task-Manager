import React, { Component } from 'react';

class Navbar extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a href="/" className="text-white">
                        Nº Tareas<span className="badge badge-pill badge-light ml-2">{this.props.num_tasks }</span>
                    </a>
                </nav>
            </div>
        );
    }
}

export default Navbar;