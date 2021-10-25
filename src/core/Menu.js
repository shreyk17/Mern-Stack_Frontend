import React from 'react'
import { Link  , withRouter} from 'react-router-dom'
import {signout , isAuthenticated} from '../auth/index'

const isActive = (history ,path) => {
    if(history.location.pathname === path) {
        return {color : "#ffffff"}
    }else {
        return {color : "#000000"}
    }
}



const Menu = ({history}) => {
    return (
        <div >
            <ul className = "nav nav-tabs bg-secondary">
                <li className = "nav-item">
                    <Link className = "nav-link" style = {isActive(history , "/")} to = "/">Home</Link>
                </li>
                <li className = "nav-item">
                    <Link className = "nav-link" style = {isActive(history , "/users")} to = "/users">Users</Link>
                </li>

                {!isAuthenticated() && (
                    <>
                        <li className = "nav-item">
                            <Link className = "nav-link" style = {isActive(history , "/signin")} to = "/signin">Sign In</Link>
                        </li>
                        <li className = "nav-item">
                            <Link className = "nav-link" style = {isActive(history , "/signup")} to = "/signup">Sign Up</Link>
                        </li>
                    </>
                )}

                {isAuthenticated() && (
                    <>
                        <li className = "nav-item">
                                <Link className = "nav-link" to = {`/findPeople`}  style = {isActive(history , `/findPeople`)} >
                                    Find People
                                </Link>
                        </li>
                        <li className = "nav-item">
                                <Link className = "nav-link" to = {`/post/create`}  style = {isActive(history , `/post/create`)} >
                                    Create Post
                                </Link>
                        </li>  
                        <li className = "nav-item">
                                <Link className = "nav-link" to = {`/user/${isAuthenticated().user._id}`}  style = {isActive(history , `/user/${isAuthenticated().user._id}`)} >
                                    {`${isAuthenticated().user.name}'s profile`}
                                </Link>
                        </li> 
                        <li className = "nav-item">
                            <span className = "nav-link" style = {isActive(history , "/signup") , {cursor : 'pointer'}} onClick = {() => signout(() => history.push('/'))}>Sign Out</span>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)