import React, { Component } from 'react'
import {comment , uncomment} from './apiPost'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import defaultProfile from '../images/avatar.jpg'

class Comment extends Component {

    state = {
        text : "",
        error : ""
    }

    handleChange = event => {
        this.setState({error : ""})
        console.log(event.target.value)
        this.setState({
            text : event.target.value
        })
    }

    isValid = () => {
        const {text} = this.state
        console.log(text.length)
        if(!text.length>0 || text.length>150 ){
            this.setState({error : "Comment should not be empty and less than 150 characters"})
            return false
        }
        return true
    }

    addComment = e => {
        e.preventDefault()

        if(this.isValid()){
            const token = isAuthenticated().token
            const userId = isAuthenticated().user._id
            const postId = this.props.postId
            console.log(postId)
            // const comment = {text:this.state.text}
            comment(userId,token,postId,{text:this.state.text})
                .then(data => {
                    if(data.error){
                        //this.setState({error : data.error})
                        console.log(data.error)
                    }
                    else {
                        console.log(data.comments)
                        this.setState({text:""})
                        this.props.updateComment(data.comments);
                    }
                })
        }
    }

    deletComment = (comment) =>{
        const token = isAuthenticated().token
        const userId = isAuthenticated().user._id
        const postId = this.props.postId
        console.log(postId)
        // const comment = {text:this.state.text}
        uncomment(userId,token,postId,comment)
            .then(data => {
                if(data.error){
                    //this.setState({error : data.error})
                    console.log(data.error)
                }
                else {
                    this.props.updateComment(data.comments);
                }
            })
    }

    deleteConfirm = (comment) => {
        let ans = window.confirm("Are you sure you want to delete your post?")
        if(ans){
            this.deletComment(comment)
        }else {
            console.log('delete cancel')
        }
    }


    render() {
        const {comments} = this.props
        const {error} = this.state
        return (
            <div>
                <h2 className = "mt-5 mb-5">Leave a comment</h2>
                <form onSubmit = {this.addComment}>
                    <div className = "form-group">
                        <input
                            className = "form-control"
                            type = "text"
                            onChange = {this.handleChange}
                            placeholder = "Leave a comment here"
                            value = {this.state.text}
                        />
                        <br/>
                        <button className= "btn btn-raised btn-info btn-sm mt-2">Post Comment</button>
                        <br/>
                    </div>
                </form>

                <div className = "alert alert-danger" style = {{ display : error ? " " : "none" }} >
                        {error}
                </div>

                {/* <hr/>
                {JSON.stringify(comments)} */}
                <hr/>
                <div className = "col-md-12">
                        <h3 className = "text-primary">{comments.length} Comments</h3>
                        <hr/>
                        {comments.map((comment,index) => 
                            (
                                <div key = {index}>
                                    
                                        <div >
                                            <Link to = {`/user/${comment.postedBy._id}`}>
                                                <img 
                                                    style = {{borderRadius : "30%" , border : "1px" }}
                                                    className ="float-left mr-3"
                                                    height = "40px"
                                                    width = "40px"
                                                    src = {`http://localhost:8080/user/photo/${comment.postedBy._id}`} 
                                                    alt = {comment.postedBy.name} 
                                                    onError = {i => (i.target.src = `${defaultProfile}`)}
                                                />

                                            </Link>
                                            <div>
                                                    <p className = "lead">{comment.text}</p>
                                                    <p className = "font-italic mark">
                                                        Posted By 
                                                        <Link to = {`/user/${comment.postedBy._id}`}> {comment.postedBy.name} </Link>
                                                        on {new Date(comment.createdDate).toDateString()} 
                                                        {/* and updated at {new Date(post.update).toDateString()} */}


                                                        <span>
                                                        {isAuthenticated().user && 
                                                            isAuthenticated().user._id === comment.postedBy._id && (
                                                            <>
                                                                <span 
                                                                    onClick={() => {
                                                                        this.deleteConfirm(comment)
                                                                    }} 
                                                                    style = {{cursor:"pointer"}}
                                                                    className="text-danger float-right mr-1"
                                                                >
                                                                    Delete Comment
                                                                </span>
                                                            </>
                                                        )}
                                                        </span>
                                                    </p>
                                                </div>
                                            {/* <p style = {{clear : "both"}}>{person.about}</p> */}
                                        </div>
                                    <hr/>
                                </div>
                            )
                        )}
                    </div>
            </div>
        )
    }
}

export default  Comment