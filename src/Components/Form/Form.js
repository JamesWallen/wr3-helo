import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './form.css';

class Form extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            title: '',
            image: '',
            content: '',
            created: false
        }
    }

    updateTitle = (val) => {
        this.setState({title: val})
    }

    updateImage = (val) => {
        this.setState({image: val})
    }

    updateContent = (val) => {
        this.setState({content: val})
    }

    createPost = () => {
        const body = {...this.state}
        axios.post(`/api/newpost`, body)
            .then(res => {
                this.setState({title: '', image: '', content: '', created: true});
                console.log('mememem');
            })
            .catch(err => console.log(err));
        
    }

    render() {
        return (
            <Switch>
                {this.state.created !== true
                ?
                    <div className='new-post-box'>
                        <h3>New Post</h3>
                        <div className='form-input'>
                            <p>Title:</p>
                            <input value={this.state.title} onChange={e => this.updateTitle(e.target.value)} />
                        </div>
                        <img className='image-preview' src={this.state.image} alt='' />
                        <div className='form-input'>
                            <p>Image URL:</p>
                            <input value={this.state.image} onChange={e => this.updateImage(e.target.value)} />
                        </div>
                        <div className='content-form'>
                            <p>Content:</p>
                            <textarea value={this.state.content} onChange={e => this.updateContent(e.target.value)} ></textarea>
                        </div>                
                        <button className='dark-btn' onClick={this.createPost} >Post</button>
                    </div>
                : <Redirect to='/dashboard'/>
                }

                
            </Switch>
        )
    }
}

export default Form;