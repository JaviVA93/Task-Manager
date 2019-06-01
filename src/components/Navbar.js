import React, { Component } from 'react';
import firebase from 'firebase'

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
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                user: user
            });
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
            <div className="row bg-dark pt-2 pb-2 justify-content-between">
                <div className="col-4 align-middle">
                    <span className="text-white">
                        Number of Tasks<span className="badge badge-pill badge-light ml-2">{this.props.num_tasks}</span>
                    </span>
                </div>
                <div className="col-4">
                    {this.renderLoginButton()}
                </div>
            </div>
        );
    }
}

export default Navbar;