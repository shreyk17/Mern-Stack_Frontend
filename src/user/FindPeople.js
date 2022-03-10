import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import defaultProfile from '../images/avatar.jpg'
import { isAuthenticated } from '../auth';
import { findPeople, follow } from './apiUser'

class FindPeople extends Component {

    constructor(){
        super();
        this.state = {
            users : [],
            error:'',
            open:false,
            followMsg : ""
        }
    }

    componentDidMount(){
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        findPeople(userId , token).then(data => {
            if(data.error){
                console.log(data.error)
            }
            else {
                this.setState({users : data})
            }
        })   
    }

    clickFollow = (user ,index) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        follow(userId , token , user._id )
            .then(data => {
                if(data.error){
                    this.setState({
                        error : data.error
                    })
                }else {
                    let toFollow = this.state.users
                    toFollow.splice(index,1)
                    this.setState({
                        users : toFollow,
                        open:true ,
                        followMsg : `Following ${user.name}`
                    })
                }
            })
    }

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>
                    <img
                        style={{ height: "25vw", width: "100%" , objectFit : 'cover'}}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError = {i => (i.target.src = `${defaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to = {`user/${user._id}`} className = "btn btn-raised btn-secondary btn-sm">
                            View Profile
                        </Link>
                        <button 
                            className = "btn btn-raised btn-info float-right btn-sm"
                            onClick = {() => this.clickFollow(user,i)}
                        >
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {

        const {users,open,followMsg} = this.state

        return (
            <div className="container"> 
                <h2 className = "mt-5 mb-5">Find friends</h2>

                {
                    open && (
                        <div className ="alert alert-success">
                            {open && <p>{followMsg}</p>}
                        </div>
                    )
                }

                {this.renderUsers(users)}
            </div>
        )
    }
}
export default FindPeople