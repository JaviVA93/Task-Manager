import React, { Component, useEffect, useState } from 'react';
import firebase from 'firebase';
import { Spring } from 'react-spring/renderprops';

function Navbar(props) {
    const [user, setUser] = useState(null);
    const [firebaseInit, setFirebaseInit] = useState(false)

    //Este useEffect solo se 1 v ez 
    //cuando se monte el componente
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user_from_db) => {
            if (user_from_db !== null) {
                setUser(user_from_db);
                props.setUserCallback(user_from_db);
            }
            else {
                setUser(null);
                props.setUserCallback(null);
            }
        });
    }, [])

    function handleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log(`${result.user.email} has logged.`);
            })
            .catch((error) => {
                console.log(`Error ${error}.`);
            })
    }

    function handleLogout() {
        firebase.auth().signOut()
            .then(result => console.log(`Logout`))
            .catch(error => console.log())
    }

    function renderLoginButton() {
        if (user) {
            return (
                <div className="text-white">
                    <img width="25"
                        src={user.photoURL}
                        alt={user.displayName}
                        className="mr-2 rounded" />
                    Hola <span className="font-weight-bold">{user.displayName}</span>
                    <button
                        className="ml-2 btn btn-outline-danger"
                        onClick={() => { handleLogout() }}>
                        Salir
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    className="btn btn-light"
                    type="button"
                    onClick={() => { handleLogin() }}>
                    Log in with Google
                </button>
            );
        }
    }

    return (
        <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            config={{ delay: 250, duration: 1000 }}
        >
            {attributes =>
                <div className="navbar navbar-dark bg-dark" style={attributes}>
                    <div>
                        <span className="text-white">Number of Tasks</span>
                        <span className="badge badge-pill badge-light ml-2">{props.num_tasks}</span>
                    </div>
                    <div>
                        {renderLoginButton()}
                    </div>
                </div>
            }
        </Spring>
    )
}

export default Navbar;