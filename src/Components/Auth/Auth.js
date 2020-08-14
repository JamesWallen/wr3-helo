import React, {Component} from 'react';
import logo from '../../logo/logo.png';
import {Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {storeUserInfo} from '../../redux/reducer';
import axios from 'axios';
import './auth.css';

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
        }
    }


    updateUsername = (val) => {
        this.setState({username: val});
    }
    updatePassword = (val) => {
        this.setState({password: val});
    }

    registerUser = () => {        
        const body = {username: this.state.username, password: this.state.password}
        axios.post('/auth/register', body)
            .then(res => {
                this.setState({username: '', password: '', loggedIn: true});
            })
            .catch(err => {
                this.setState({password: ''});
                alert(err.response.request.response);
            });
    }

    loginUser = () => {
        const body = {username: this.state.username, password: this.state.password};
        axios.post('/auth/login', body)
            .then(res => {
                const {user_id, username, profile_pic} = res.data;
                this.props.storeUserInfo(user_id, username, profile_pic);
                this.setState({username: '', password: '', loggedIn: true});
            })
            .catch(err => {
                this.setState({password: ''});
                alert(err.response.request.response);
            });
    }

    render() {
        // console.log(this.state.username, this.state.password);
        return (
            <Switch>
                {this.state.loggedIn !== true
                ? (
                    <div className='auth-screen'>
                        <section className='auth-box'>
                            <img src={logo} alt='Helo Logo' />
                            <h1>Helo</h1>                    
                            <div className='auth-input'>
                                <p>Username:</p>
                                <input value={this.state.username} onChange={e => this.updateUsername(e.target.value)} />
                            </div>
                            <div className='auth-input'>
                                <p>Password:</p>
                                <input type='password' value={this.state.password} onChange={e => this.updatePassword(e.target.value)} />
                            </div>
                            <div className='auth-btns'>
                                <button className='dark-btn' onClick={this.loginUser} >Login</button>
                                <button className='dark-btn' onClick={this.registerUser} >Register</button>
                            </div>
                        </section>  
                    </div>
                )
                : (
                    <Redirect to='/dashboard'/>
                )
                }
            </Switch>
        )
    }
}

export default connect(null, {storeUserInfo})(Auth);