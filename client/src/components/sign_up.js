import React from 'react';
import '../css/login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const api = axios.create({
    withCredentials: true
});

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            message: "",
            loading: true,
            redirect: false
        }
    }

    componentDidMount() {
        api.get('http://localhost:8080/users/api/checkToken')
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        loading: false,
                        redirect: true
                    })
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

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        }
        api
            .post('http://localhost:8080/users/api/', data)
            .then(res => {
                this.setState({
                    message: "ADDED NEW USER",
                    redirect: true
                })
                
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    message: "COULDN'T ADD USER"
                })
            })

    }

    setCookie = () => {
        api.get('http://localhost:8080/setCookie')
            .then(res => {
                this.setState({
                    message: "Cookie Set"
                })
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        const { loading, redirect } = this.state;

        if (loading) {
            return null;
        }
        if (redirect) {
            return <Redirect to='/' />;
        }
        return (
            <header className="container-fluid login_bg" style={{ height: '100vh' }}>
                <div className="container" style={{ height: '100vh' }}>
                    <div className="row" style={{ height: '100vh' }}>
                        <div className="col-md-6 login_left" style={{ display: 'flex', alignItems: 'center', }}>
                            <div className="row" style={{ borderRight: '1px solid black', paddingTop: '100px', paddingBottom: '100px' }}>
                                <p style={{ fontSize: '40px', fontWeight: '600', width: '100%' }}>ZAPTO SIGN UP</p>
                                <p style={{ fontSize: '30px', fontWeight: '500' }}>TODO | LABELS | SEARCH | FILTER</p>
                                <p style={{ fontSize: '20px' }}>Enter your username and password in the form to Register to your website.</p>
                                <p style={{ fontSize: '20px' }}>Here you can add edit update and delete your todo list items.</p>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="row" style={{ width: '100%' }}>
                                <form onSubmit={this.onSubmit} style={{ padding: '50px 40px', width: '20rem', margin: '0 auto', border: '1px solid black' }}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input required type="text" name="username" onChange={this.onChange} className="form-control" placeholder="Enter Username" style={{ borderRadius: '0px' }} />
                                    </div>
                                    <div className="form-group" style={{ paddingTop: '15px' }}>
                                        <label>Password</label>
                                        <input required type="password" name="password" onChange={this.onChange} className="form-control" id="exampleInputPassword1" placeholder="Enter Password" style={{ borderRadius: '0px' }} />
                                    </div>
                                    <p>{this.state.message}</p>
                                    <button type="submit" className="btn btn-dark" style={{ marginTop: '15px', borderRadius: '0px' }}>SUBMIT</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}