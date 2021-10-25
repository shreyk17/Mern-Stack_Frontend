import React, { Component } from 'react'
import { Redirect } from 'react-router';
import {isAuthenticated} from '../auth/index'
import defaultProfile from '../images/avatar.jpg'
import {create} from './apiPost'


class NewPost extends Component {

    constructor(){
        super();
        this.state = {
            title : "",
            body : "",
            photo :"",
            error: "",
            user:{},
            redirectToProfile : false,
            fileSize:0
        }
    }


    componentDidMount() {
        this.postData = new FormData()
        this.setState({
            user : isAuthenticated().user
        })
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
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            create(userId,token,this.postData).then(data => {
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



    newPostForm = (title , body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Profile photo</label>
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
                Create Post
            </button>
        </form>
    );



    render() {
        const {title,body,photo,user,error,redirectToProfile} = this.state

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">Create a new Post</h2>


                {/* error message  */}
                    <div className = "alert alert-danger" style = {{ display : error ? " " : "none" }} >
                        {error}
                    </div>
                {this.newPostForm(title,body)}
            </div>
        )
    }
}

export default  NewPost