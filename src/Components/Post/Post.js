import React, {Component} from 'react';
import axios from 'axios';
import {Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './post.css';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            image: '',
            content: '',
            username: '',
            profilePic: '',
            redirect: false
        }
    }

    componentDidMount() {
        this.setState({redirect: false});
        this.getPostInfo();
    }

    getPostInfo = () => {
        const {postid} = this.props.match.params;
        axios.get(`/api/post/${postid}`)
            .then(res => {
                const {username, profile_pic, title, image, content, user_id} = res.data[0];
                // console.log(res.data);
                this.setState({title: title, image: image, content: content, username: username, profilePic: profile_pic, user_id: user_id});
            })
            .catch(err => console.log(err));
    }

    deleteMyPost = () => {
        this.props.location.deletePostFn(this.props.match.params);
        this.setState({redirect: true});
    }

    render() {
        // console.log(this.props.location.deletePostFn);
        return (
            <Switch>
                {this.state.redirect !== true
                ?
                    <div className='single-post'>
                        <section className='title-author'>
                            <h3>{this.state.title}</h3>
                            <div className='post-author'>
                                <p>by {this.state.username}</p>
                                <img src={this.state.profilePic} alt='author' />
                            </div>
                        </section>
                        <section className='post-content'>
                            <img src={this.state.image} alt='content' />
                            <p>{this.state.content}</p>
                        </section>
                        {this.state.username === this.props.username
                        ? <button className='dark-btn' onClick={this.deleteMyPost} >Delete Post</button>
                        : null
                        }
                    
                    </div>
                : <Redirect to='/dashboard'/>
                }
                
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.username
    };
}

export default connect(mapStateToProps)(Post);