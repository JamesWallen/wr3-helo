import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import './nav.css';
import {storeUserInfo, removeUserInfo} from '../../redux/reducer';
import home from '../../logo/home.png';
import post from '../../logo/post.png';
import logout from '../../logo/logout.png';

class Nav extends Component {

    componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = () => {
        axios.get('/api/auth/me')
            .then(res => {
                // console.log(res.data);
                const {username, profile_pic} = res.data;
                // console.log(username, profile_pic);
                this.props.storeUserInfo(username, profile_pic);
            })
            .catch(err => console.log(err));
    }

    logout = () => {
        axios.post('/auth/logout')
            .then(res => {
                this.props.removeUserInfo();
            })
            .catch(err => console.log(err))
    }

    render() {
        // console.log(this.props.profilePic);
        return (
            <div className='nav-bar'>
                <section className='profile-container'>
                    <div className='profile-pic' style={{backgroundImage: `url(${this.props.profilePic})`}} ></div>
                    <p>{this.props.username}</p>
                </section>
                <section className='nav-buttons'>
                    <Link to='/dashboard'><img src={home} alt='dashboard' /></Link>
                    <Link to='/new'><img src={post} alt='new post' /></Link>
                </section>
                <section className='logout-section'>
                    <Link to='/'><img src={logout} alt='logout' onClick={this.logout} /></Link>
                </section>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        profilePic: state.profile_pic
    };
}

export default connect(mapStateToProps, {storeUserInfo, removeUserInfo})(Nav);