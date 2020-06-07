import React from 'react';
import '../css/navbar.css';
import label from '../assets/label.svg';
import axios from 'axios';

const api = axios.create({
    withCredentials: true
});


export default class Navbar extends React.Component {

    logout = () => {
        api.get('http://localhost:8080/users/api/clearCookie')
            .then(res => {
                if (res.status === 200) {
                    window.location.reload();
                }
                else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ loading: false, redirect: false });
            })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="/"><span class="material-icons">description</span>ZAPTO</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/add" title="Add a Note"><span className="material-icons">note_add</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/archive" title="Archive"><span className="material-icons">archive</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" title="Labels" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={label} width="24px" /></a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/filter/Personal"><span className="material-icons">face</span>Personal</a>
                                    <a className="dropdown-item" href="/filter/Work"><span className="material-icons">business</span>Work</a>
                                    <a className="dropdown-item" href="/filter/Shopping"><span className="material-icons">store</span>Shopping</a>
                                    <a className="dropdown-item" href="/filter/Other"><span className="material-icons">notes</span>Other</a>
                                </div>
                            </li>
                            <li className="nav-item last">                                
                                <button title="Log Out" onClick={this.logout} className="btn btn-outline-dark logout"><span className="material-icons">exit_to_app</span></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}