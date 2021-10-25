import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import defaultImage from '../images/tower.jfif'
import {list} from './apiPost'
import { isAuthenticated } from '../auth';
class Post extends Component {

    constructor(){
        super();
        this.state = {
            posts : []
        }
    }

    componentDidMount(){
        const token = isAuthenticated().token
        list(token).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else {
                this.setState({posts : data})
                console.log(this.state.posts)
            }
        })   
    }

    renderPost = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy ? `/user/${post.postedBy._id}`: ""
                    const postedName = post.postedBy ? post.postedBy.name: " Unknown user"
                    return (
                        
                        <div className="card col-md-4" key={i}>
                            <br/>
                            {/* <img
                                style={{ height: "25vw", width: "100%" , objectFit : 'cover'}}
                                className="img-thumbnail"
                                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                                onError = {i => (i.target.src = `${defaultProfile}`)}
                                alt={user.name}
                            /> */}
                            <div className="card-body">
                                <img
                                    style={{ height: "200px", width: "auto" }}
                                    className="img-thumbnail mb-3"
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    onError = {i => (i.target.src = `${defaultImage}`)}
                                    alt={post.title}
                                /> 
                                <h5 className="card-title">{post.title}</h5>
                                <hr/>
                                <p className="card-text">{post.body.substring(0,100)}</p>
                                <br/>
                                <p className = "font-italic mark">
                                    Posted By 
                                    <Link to = {`${posterId}`}> {postedName} </Link>
                                    on {new Date(post.created).toDateString()}
                                     and updated at {new Date(post.updated).toDateString()}
                                </p>
                                <Link to = {`/post/${post._id}`} className = "btn btn-raised btn-secondary btn-sm">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    )

                } )}
            </div>
        )
    }

    render() {

        const {posts} = this.state

        return (
            <div className="container"> 
                {/* <h2 className = "mt-5 mb-5">Recent Posts</h2> */}
                {this.renderPost(posts)}
            </div>
        )
    }
}
export default Post