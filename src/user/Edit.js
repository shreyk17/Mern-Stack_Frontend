import React, { Component } from 'react'
import { Redirect } from 'react-router';
import {isAuthenticated} from '../auth/index'
import {read,update, updateUser} from './apiUser'
import defaultProfile from '../images/avatar.jpg'


class Edit extends Component {

    constructor(){
        super();
        this.state = {
            id :"",
            name : "",
            password : "",
            email : "",
            redirectToProfile : false,
            error : '',
            fileSize :0,
            about : ""
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token
       read(userId , token)
        .then(data => {
            if(data.error){
                console.log(data.error)
                this.setState({redirectToProfile : true})
            }else 
            {
                console.log(data)
                this.setState({ 
                    id : data._id, 
                    name : data.name , 
                    email : data.email,
                    error : '',
                    about:data.about
                })
            }
        }) 
    }

    componentDidMount() {
        this.userData = new FormData()
        console.log("user id : " , this.props.match.params.userId)
        const userId = this.props.match.params.userId

        this.init(userId)

    }


    isValid = () => {
        const { name, email, password,fileSize } = this.state;
        if (fileSize>100000) {
            this.setState({ error: "File should be less than 1MB" });
            return false;
          }
        if (name.length === 0) {
          this.setState({ error: "Name is required" });
          return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          this.setState({
            error: "A valid Email is required"
          });
          return false;
        }
        if (password.length >= 1 && password.length <= 5) {
          this.setState({
            error: "Password must be at least 6 characters long"
          });
          return false;
        }
        return true;
      };


    handleChange = (name) => (event) => {
        this.setState({error : ""})
        const value = name === 'photo' ? event.target.files[0] :event.target.value  
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.userData.set(name,value)
        this.setState({
            [name] : value,
            fileSize : fileSize
        })
    }

    clickSubmit = event => {
        event.preventDefault();

        if(this.isValid()){
            const {name,email,password} = this.state;
            const user = {
                name :name,
                email:email,
                password:password || undefined
            };
            console.log(user)
            const userId = this.props.match.params.userId
            const token = isAuthenticated().token
            update(userId,token,this.userData).then(data => {
                if(data.error){
                    this.setState({error : data.error})
                    console.log(data.error)
                } 
                else {
                    updateUser(data ,( ) => {
                        this.setState({redirectToProfile : true})
                    })
    
                    window.location.reload()
                }
            })
        }

    };



    editForm = (name, email,password,about) => (
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
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea
                    onChange={this.handleChange("about")}
                    type="text"
                    className="form-control"
                    value={about}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <br />
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-secondary"
            >
                Update
            </button>
        </form>
    );



    render() {
        const {name,email,password,id,redirectToProfile,error,about} = this.state

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
          }

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : defaultProfile

        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">Edit Profile</h2>


                {/* error message  */}
                    <div className = "alert alert-danger" style = {{ display : error ? " " : "none" }} >
                        {error}
                    </div>

                <img 
                    className = "img-thumbnail" 
                    style = {{height : '200px' , width : "auto" }} 
                    src = {photoUrl} 
                    alt = {name}  
                    onError = {i => (i.target.src = `${defaultProfile}`)}
                />

                {this.editForm(name,email,password,about)}
            </div>
        )
    }
}

export default  Edit