import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import defaultProfile from '../images/avatar.jpg'


class ProfileTab extends Component {
    render() {

        const {following, followers,posts} = this.props

        return (
            <div>
                <div className = "row">
                    <div className = "col-md-4">
                        <h3 className = "text-primary">Followers</h3>
                        <hr/>
                        {followers.map((person,index) => 
                            (
                                <div key = {index}>
                                   
                                        <div >
                                            <Link to = {`/user/${person._id}`}>
                                                <img 
                                                    style = {{borderRadius : "30%" , border : "1px" }}
                                                    className ="float-left mr-3"
                                                    height = "40px"
                                                    width = "40px"
                                                    src = {`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`} 
                                                    alt = {person.name} 
                                                    onError = {i => (i.target.src = `${defaultProfile}`)}
                                                />
                                                <div>
                                                    <p className = "lead">{person.name}</p>
                                                </div>
                                            </Link>
                                            <p style = {{clear : "both"}}>{person.about}</p>
                                       
                                    </div>
                                    <hr/>
                                </div>
                            )
                        )}
                    </div>

                    <div className = "col-md-4">
                        <h3 className = "text-primary">Following</h3>
                        <hr/>
                        {following.map((person,index) => 
                            (
                                <div key = {index}>
                                    
                                        <div >
                                            <Link to = {`/user/${person._id}`}>
                                                <img 
                                                    style = {{borderRadius : "30%" , border : "1px" }}
                                                    className ="float-left mr-3"
                                                    height = "40px"
                                                    width = "40px"
                                                    src = {`http://localhost:8080/user/photo/${person._id}`} 
                                                    alt = {person.name} 
                                                    onError = {i => (i.target.src = `${defaultProfile}`)}
                                                />
                                                <div>
                                                    <p className = "lead">{person.name}</p>
                                                </div>
                                            </Link>
                                            <p style = {{clear : "both"}}>{person.about}</p>
                                        </div>
                                    <hr/>
                                </div>
                            )
                        )}
                    </div>
                    <div className = "col-md-4">
                        <h3 className="text-primary">{posts.length} Posts</h3>
                        <hr />
                        {posts.map((post, i) => (
                            <div key={i}>
                                
                                <div>
                                    <Link to={`/post/${post._id}`}>
                                        <div>
                                            <p className="lead">{post.title}</p>
                                        </div>
                                    </Link>
                                </div>
                                <hr/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfileTab