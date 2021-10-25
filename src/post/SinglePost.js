import React, { Component } from "react";
import { singlePost } from "./apiPost";
import { isAuthenticated } from "../auth";
import defaultImage from '../images/tower.jfif'
import {Link} from 'react-router-dom'
class SinglePost extends Component {

    state = {
        post : "",
        error:""
    }

    componentDidMount = () =>{
        const token = isAuthenticated().token
        const postId = this.props.match.params.postId
        const userId = this.props.match.params.userId
        singlePost(token,postId)
            .then(data => {
                if(data.error){
                    this.setState({
                        error:data.error
                    })
                }else {
                    this.setState({
                        post:data
                    })
                }
            })
    }

    renderPost = (post) => {
        console.log(isAuthenticated().user.name)
        const postf = this.props.posts
        //console.log(postf.postedBy._id)
        const posterId = post.postedBy ? `/user/${post.postedBy._id}`: ""
        const postedName = post.postedBy ? post.postedBy.name: " Unknown user"
        return (
                <div className="card-body">
                    <img
                        style={{ height: "300px", width: "100%" , objectFit : "cover" }}
                        className="img-thumbnail mb-3"
                        src={`${
                            process.env.REACT_APP_API_URL
                        }/post/photo/${post._id}`}
                        onError = {i => (i.target.src = `${defaultImage}`)}
                        alt={post.title}
                    /> 
                    <p className="card-text">{post.body}</p>
                    <br/>
                    <p className = "font-italic mark">
                        Posted By 
                        <Link to = {`${posterId}`}> {postedName} </Link>
                        on {new Date(post.created).toDateString()}
                         and updated at {new Date(post.update).toDateString()}
                    </p>
                    <div className = "d-inline-block mt-3">
                        <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
                            Back to posts
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user._id ===this.userId && (
                            <>
                                <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning btn-sm mr-5">
                                    Update Post
                                </Link>
                                <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                                    Delete Post
                                </button>
                            </>
                        )}
                        

                    </div>
                </div>
            
        )
    }

    render(){
        const { post } = this.state
        return(
            <div className = "container">
                <h2 className = "display-2 mt-2 mb-2">{post.title}</h2>
                {this.renderPost(post)}
            </div>
        )
    }
}
export default SinglePost