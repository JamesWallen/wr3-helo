import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import search from '../../logo/search.png';
import './dashboard.css';
import axios from 'axios';


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            checkBox: true,
            posts: [],
        }
    }
    
    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        const {checkBox, search} = this.state;
        axios.get(`/api/posts?userposts=${checkBox}&search=${search}`)
            .then(res => {
                this.setState({posts: res.data});
                // console.log(this.state.posts);
            })
            .catch(err => console.log(err));
    }

    searchInput = (val) => {
        this.setState({search: val});
    }

    resetSearch = () => {
        this.setState({search: ''});
        this.getPosts();
    }

    changeCheckBox = () => {
        this.setState({checkBox: !this.state.checkBox})
    }

    deletePost = (postId) => {
        const {postid} = postId 
        axios.delete(`/api/deletepost/${postid}`)
            .then(res => {
                this.setState({posts: res.data});
            })
            .catch(err => console.log(err));
    }

    render() {
        const mappedPosts = this.state.posts.map((post, index) => (
            <Link to={{pathname: `/post/${post.post_id}`, deletePostFn: this.deletePost}}><div className='mapped-post' key={index} >
                <h2>{post.title} </h2>
                <div className='author-box'>
                    <p>by {post.username}</p>
                    <img src={post.profile_pic} alt='author' />
                </div>
            </div></Link>
        ))
        return (
            <div className='dashboard-view'>
                <section className='search-box'>
                    <div className='search-bar'>
                        <input placeholder='Search by Title' value={this.state.search} onChange={e => this.searchInput(e.target.value)} />
                        <img src={search} onClick={this.getPosts} alt='search' />
                        <button className='dark-btn' onClick={this.resetSearch} >Reset</button>
                    </div>
                    <div className='check-box'>
                        <p>My Posts</p>
                        <input type='checkbox' defaultChecked onChange={this.changeCheckBox}/>
                    </div>
                </section>
                <section className='dashboard-posts'>
                    {mappedPosts}
                </section>
            </div>
        )
    }
}

export default Dashboard;