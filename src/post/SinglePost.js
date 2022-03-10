import React, { Component } from "react";
import { singlePost, removePost , like,unlike} from "./apiPost";
import { isAuthenticated } from "../auth";
import defaultImage from '../images/tower.jfif'
import {Link,Redirect} from 'react-router-dom'
import Comment from './Comment'

class SinglePost extends Component {

    state = {
        post : "",
        error:"",
        rediretcToHome : false,
        like : false,
        likes : 0,
        rediretcToLogin : false,
        comments : []
    }

    checkLike = (likes) => {
        const userId = isAuthenticated() && isAuthenticated().user._id
        let match = likes.indexOf(userId) !== -1
        return match
    }

    componentDidMount = () =>{
        const token = isAuthenticated().token
        const postId = this.props.match.params.postId
        //const userId = this.props.match.params.userId
        singlePost(token,postId)
            .then(data => {
                if(data.error){
                    this.setState({
                        error:data.error
                    })
                }else {
                    this.setState({
                        post:data,
                        likes : data.likes.length,
                        like : this.checkLike(data.likes),
                        comments : data.comments
                    })
                }
            })
    }

    updateComment = comments =>{
        this.setState({comments : comments})
    }

    likeToggle = () => {
        if(!isAuthenticated()){
            this.setState({rediretcToHome:true})
            return false
        }
        const token = isAuthenticated().token
        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
        //const postId = this.props.match.params.postId
        let callApi = this.state.like ? unlike : like
        callApi(userId , token , postId)    
            .then(data => {
                if(data.error){
                    console.log(data.error)
                }else {
                    this.setState({
                        like : !this.state.like,
                        likes : data.likes.length
                    })
                }
            })
    }

    deletePost = () =>{
        const token = isAuthenticated().token
        const postId = this.props.match.params.postId
        removePost(postId,token)
            .then(data => {
                if(data.error){
                    this.setState({
                        error  :data.error
                    })
                }else {
                    this.setState({
                        rediretcToHome : true
                    })
                }
            })
    }

    deleteConfirm = () => {
        let ans = window.confirm("Are you sure you want to delete your post?")
        if(ans){
            this.deletePost()
        }else {
            console.log('delete cancel')
        }
    }

    renderPost = (post) => {
        console.log(isAuthenticated().user._id)
        const posterId = post.postedBy ? `/user/${post.postedBy._id}`: ""
        const postedName = post.postedBy ? post.postedBy.name: " Unknown user"
        console.log(posterId)
        const id = posterId.split('/')
        console.log(id[2])
        const {like , likes} = this.state
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

                    {like ? (
                        <h3 onClick = {this.likeToggle}>
                            <i className = "fa fa-thumbs-up text-success bg-dark" style = {{padding : "10px" , borderRadius : "50%"}} /> 
                            {" "} {likes} Like 
                        </h3>
                    ) :(
                        <h3 onClick = {this.likeToggle}>
                            <i className = "fa fa-thumbs-up text-warning bg-dark" style = {{padding : "10px" , borderRadius : "50%"}} /> 
                            {" "} {likes} Like 
                        </h3>
                    )}
                    {/* <h3 onClick = {this.likeToggle}> {likes} Like </h3> */}

                    <p className="card-text">{post.body}</p>
                    <br/>
                    <p className = "font-italic mark">
                        Posted By 
                        <Link to = {`${posterId}`}> {postedName} </Link>
                        on {new Date(post.created).toDateString()} 
                         {/* and updated at {new Date(post.update).toDateString()} */}
                    </p>
                    <div className = "d-inline-block mt-3">
                        <Link to={`/`} className="btn btn-raised btn-secondary btn-sm mr-5">
                            Back to posts
                        </Link>
                        {/* {JSON.stringify(post.postedBy)} */}
                        {isAuthenticated().user && 
                             isAuthenticated().user._id === id[2] && (
                            <>
                                <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-info btn-sm mr-5">
                                    Update Post
                                </Link>
                                <button onClick={this.deleteConfirm} className="btn btn-raised btn-danger">
                                    Delete Post
                                </button>
                            </>
                        )}
                        

                    </div>
                </div>
            
        )
    }

    render(){
        const { post,rediretcToHome , rediretcToLogin,comments } = this.state
        console.log(post._id)
        console.log(this.props.match.params.postId)
        if (rediretcToHome) {
            return <Redirect to={`/`} />;
        }else if (rediretcToLogin){
            return <Redirect to = {`/signin`} />
        }
        return(
            <div className = "container">
                <h2 className = "display-2 mt-2 mb-2">{post.title}</h2>
                {this.renderPost(post)}
                <Comment 
                    postId = {post._id} 
                    comments = {comments.reverse()} 
                    updateComment = {this.updateComment} 
                />
            </div>
        )
    }
}
export default SinglePost