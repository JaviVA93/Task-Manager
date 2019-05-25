import React, { Component } from 'react';

class Navbar extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <span className="text-white">
                        Number of Tasks<span className="badge badge-pill badge-light ml-2">{this.props.num_tasks }</span>
                    </span>
                </nav>
            </div>
        );
    }
}

export default Navbar;