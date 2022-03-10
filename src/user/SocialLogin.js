import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router'
import { authenticate, socialLogin } from '../auth'

class SocialLogin extends Component {

    constructor(){
        super()
        this.state = {
            redirectToRefer : false
        }
    }

    responseGoogle = res => {
        console.log(res)
        const { googleId , name , email , imageUrl } = res.profileObj;
        const user = {
            password : googleId,
            name : name,
            email : email,
            imageUrl : imageUrl
        };
        socialLogin(user)
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                }
                else {
                    console.log("sign in success - setting jwt : " , data);
                    authenticate(data , () => {
                        this.setState({
                            redirectToRefer : true
                        })
                    })
                }
            })
    }

    render() {
        const {redirectToRefer} = this.state
        if(redirectToRefer){
            return <Redirect to = "/" />
        }
        return (
            <div className = "container">
                <GoogleLogin
                    clientId = "315712766962-djcblugcfft9ga1ikn9uhrgphav6kvcs.apps.googleusercontent.com"
                    buttonText = "Login with Google"
                    onSuccess = {this.responseGoogle}
                    onFailure = {this.responseGoogle}
                />
            </div>
        )
    }
}

export default SocialLogin