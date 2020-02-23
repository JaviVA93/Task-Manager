import React, { Component } from 'react';
import firebase from 'firebase';
import { Spring } from 'react-spring/renderprops';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        };

        this.renderLoginButton = this.renderLoginButton.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    /* componentDidMount() explicacion 
    En esta función incluimos todos los "fetch"
    que tengamos que hacer. Si se llama de inicio con el 1r
    render, no devolverá el estado así que si usamos algo de aqui
    habra que inicializarlo antes del fetch o usaremos algo sin definir
    en nuestro primer render(), generando errores.*/
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user_from_db) => {
            if (user_from_db !== null) {
                this.setState({
                    user: user_from_db
                });
            }
            else {
                this.setState({
                    user: null
                });
            }
            this.props.setUserCallback(this.state.user);
        });
    }

    handleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log(`${result.user.email} has logged.`);
            })
            .catch((error) => {
                console.log(`Error ${error}.`);
            })
    }

    handleLogout() {
        firebase.auth().signOut()
            .then(result => console.log(`Logout`))
            .catch(error => console.log())
    }

    renderLoginButton() {
        if (this.state.user) {
            return (
                <div className="text-white">
                    <img width="25"
                        src={this.state.user.photoURL}
                        alt={this.state.user.displayName}
                        className="mr-2 rounded" />
                    Hola <span className="font-weight-bold">{this.state.user.displayName}</span>
                    <button
                        className="ml-2 btn btn-outline-danger"
                        onClick={this.handleLogout}>
                        Salir
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    className="btn btn-light"
                    type="button"
                    onClick={this.handleLogin}>
                    Log in with Google
                </button>
            );
        }
    }

    render() {
        return (
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{delay: 250, duration: 1000}}
            >
                {props =>
                    <div className="navbar navbar-dark bg-dark" style={props}>
                        <div>
                            <span className="text-white">Number of Tasks</span>
                            <span className="badge badge-pill badge-light ml-2">{this.props.num_tasks}</span>
                        </div>
                        <div>
                            {this.renderLoginButton()}
                        </div>
                    </div>
                }
            </Spring>
        )
    }
}

export default Navbar;