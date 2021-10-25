import React, { Component } from 'react'
import {isAuthenticated} from '../auth/index'
import {removeUser} from './apiUser'
import {signout} from '../auth/index'
import { Redirect } from 'react-router'


class Deleteuser extends Component {

    state = {
        redirect : false
    }

    deleteAccount = () => {
        console.log('delete account')
        const token = isAuthenticated().token
        const userId = this.props.userId
        removeUser(userId,token)
            .then(data => {
                if(data.error){
                    console.log(data.error)
                }else { 
                    signout(() => {
                        console.log("User deleted !!!")
                    })

                }
                this.setState({redirect : true})
            })
    }

    deleteConfirm = () => {
        let ans = window.confirm("Are you sure you want to delete your account?")
        if(ans){
            this.deleteAccount()
        }else {
            console.log('delete cancel')
        }
    }

    render() {
        if(this.state.redirect){
            return <Redirect to = "/"/>
        }
        return (
            <div>
                <button onClick = {this.deleteConfirm} className = "btn btn-raised btn-danger">Delete Profile</button>
            </div>
        )
    }
}
export default  Deleteuser