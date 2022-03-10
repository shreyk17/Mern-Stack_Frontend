import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router'
import {singlePost,update} from './apiPost'
import defaultImage from '../images/tower.jfif'


class EditPost extends Component {

    constructor(){
        super()
        this.state = {
            id : "",
            title : "",
            body : "",
            error :"",
            redirectToProfile : false,
            fileSize : 0
        }
    }

    init = (postId) => {
        const token = isAuthenticated().token
       singlePost(token ,postId )
        .then(data => {
            if(data.error){
                console.log(data.error)
                this.setState({
                    redirectToProfile : true,
                    error : data.error
                })
            }else 
            {
                console.log(data)
                this.setState({ 
                    id : data.postedBy._id, 
                    title : data.title , 
                    body : data.body,
                    error : '',
                })
            }
        }) 
    }

    componentDidMount() {
        this.postData = new FormData()
        console.log("user id : " , this.props.match.params.postId)
        const postId = this.props.match.params.postId
        //const token = isAuthenticated().token
        //console.log(token)
        console.log(postId)
        this.init(postId)

    }

    isValid = () => {
        const {title,body,fileSize } = this.state;
        if (fileSize>100000) {
            this.setState({ error: "File should be less than 1MB" });
            return false;
          }
        if (title.length === 0) {
          this.setState({ error: "Title is required" });
          return false;
        }
        if (body.length === 0) {
            this.setState({ error: "Body is required" });
            return false;
        }
        return true;
      };

    handleChange = (name) => (event) => {
        this.setState({error : ""})
        const value = name === 'photo' ? event.target.files[0] :event.target.value  
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.postData.set(name,value)
        this.setState({
            [name] : value,
            fileSize : fileSize
        })
    }

    clickSubmit = event => {
        event.preventDefault();

        if(this.isValid()){
            const postId = this.props.match.params.postId
            const token = isAuthenticated().token
            update(postId,token,this.postData).then(data => {
                if(data.error){
                    this.setState({error : data.error})
                    console.log(data.error)
                } 
                else {
                   console.log('new post : ' , data)
                    //window.location.reload()
                    this.setState({
                        title : "",
                        body : "",
                        photo:"",
                        redirectToProfile:true
                    })
                }
            })
        }

    };

    editPostForm = (title , body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept = "image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>
            <br />
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-secondary"
            >
                Update Post
            </button>
        </form>
    );

    render() {
        const {title , body,redirectToProfile,error} = this.state
        const postId = this.props.match.params.postId
        console.log(postId)
        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }
        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">Edit Post</h2>

                <div className = "alert alert-danger" style = {{ display : error ? " " : "none" }} >
                        {error}
                </div>
                
                <img 
                    className = "img-thumbnail" 
                    style = {{height : '200px' , width : "auto" }} 
                    src = {`${process.env.REACT_APP_API_URL}/post/photo/${postId}?${new Date().getTime()}`}
                    // src = {`${
                    //     process.env.REACT_APP_API_URL
                    // }/post/photo/${id}?${new Date().getTime()}`}
                    alt = {title}  
                    onError = {i => (i.target.src = `${defaultImage}`)}
                />
                {this.editPostForm(title,body)}
            </div>
        )
    }
}

export default  EditPost