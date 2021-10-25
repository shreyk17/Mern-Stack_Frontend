import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import {isAuthenticated} from '../auth/index'
import {read} from './apiUser'
import defaultProfile from '../images/avatar.jpg'
import Deleteuser from './Deleteuser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTab from './ProfileTab';
import {lisByUser} from '../post/apiPost'
 
class Profile extends Component {

    constructor(){
        super();
        this.state = {
            user : {
                following : [],
                followers : []
            },
            redirectToSignin : false,
            following : false,
            error : "",
            posts : []
        }
    }

    checkFollow = user => {
        const jwt = isAuthenticated()
        const match = user.followers.find(follower => {
            //one id has many others ids
            return follower._id === jwt.user._id
        })
        return match
    }

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        callApi(userId , token , this.state.user._id)
            .then(data => {
                if(data.error){
                    this.setState({error : data.error})
                } else {
                    this.setState({
                        user : data , 
                        following : !this.state.following
                    })
                }
            })
    }

    init = (userId) => {
        const token = isAuthenticated().token
       read(userId , token)
        .then(data => {
            if(data.error){
                console.log(data.error)
                this.setState({redirectToSignin : true})
            }else 
            {
                console.log(data)
                let following  = this.checkFollow(data)
                this.setState({ 
                    user : data ,
                    following : following
                })
                console.log(data._id)
                this.loadPosts(data._id)
            }
        }) 
    }

    loadPosts = (userId) => {
        const token = isAuthenticated().token
        lisByUser(userId,token)
            .then(data => {
                if(data.error ){
                    this.setState({
                        error  : data.error
                    })
                }else {
                    console.log(data)
                    this.setState({
                        posts:data
                    })
                }
            })
    }

    componentDidMount() {
        console.log("user id : " , this.props.match.params.userId)
        const userId = this.props.match.params.userId

        this.init(userId)

    }

    componentWillReceiveProps(props) {
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    render() {

        const {redirectToSignin,user,posts} = this.state;
        if(redirectToSignin){
            return <Redirect to = "/signin"/>
        }

        const photoUrl =user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : defaultProfile

        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">Profile</h2>
                <div className= "row">
                    <div className = "col-md-4">
                        
                    <img   
                        className = "img-thumbnail" 
                        style = {{height : '200px' , width : "auto" }} 
                        src = {photoUrl} 
                        alt = {user.name}  
                        onError = {i => (i.target.src = `${defaultProfile}`)}
                    />

                    </div>
                    <div className = "col-md-8">
                    <div className= "lead mt-2">
                        <p>Hello {user.name}</p>
                        <p>{user.email}</p>
                        <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                    </div>
                        {isAuthenticated().user && 
                            isAuthenticated().user._id === user._id
                            ? (
                                <div className = "d-inline-block">
                                    <Link className = "btn btn-raised btn-info mr-5" to = {`/post/create`}>
                                        Create Post
                                    </Link>
                                    <Link className = "btn btn-raised btn-success" to = {`/user/edit/${user._id}`}>
                                        Edit Profile
                                    </Link>
                                    <Deleteuser className= "mt-5" userId = {user._id} />
                                </div>
                            ):
                            (
                            <FollowProfileButton 
                                following = {this.state.following} 
                                onButtonClick = {this.clickFollowButton}
                            />
                            // <p>{this.state.following ? "following" : "not following"}</p>
                            )
                        }
                    </div>
                </div>
                <div className = "row">
                    <div className = "col md-12 mt-5 mb-5">
                        <hr/>
                        <p className = "lead">{user.about}</p>
                        <hr/>
                        {/* <hr/> */}
                            <ProfileTab followers = {user.followers}following = {user.following} posts = {posts} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile