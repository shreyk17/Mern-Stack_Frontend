import React, { Component } from 'react'
import {forgotPassword} from '../auth'

class ForgetPassword extends Component {
    state = {
        email : "",
        message : "",
        error : ""
    }

    forgotPassword = e => {
        e.preventDefault()
        this.setState({
            message : "",
            error : ""
        })
        forgotPassword(this.state.email)
            .then(data => {
                if(data.error){
                    console.log(data.error)
                    this.setState({error : data.error})
                }
                else {
                    console.log(data.message)
                    this.setState({
                        message : data.message
                    })
                }
            })
    }

    render() {
        const {message,email , error} = this.state
        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">Ask for password</h2>

                {message && (
                    <h4 className = "bg-success">{message}</h4>
                )}

                {error && (
                    <h4 className = "bg-warning">{error}</h4>
                )}

                <form>
                    <div className = "form-group mt-5">
                        <input 
                            type = "email"
                            className = "form-control"
                            placeholder = "Your email address"
                            value = {email}
                            name = "email"
                            onChange = {e => 
                                this.setState({
                                    email : e.target.value,
                                    message : "",
                                    error : ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button onClick = {this.forgotPassword} className = "btn btn-sm btn-raised btn-info">
                        Send password reset link
                    </button>
                </form>

            </div>
        )
    }
}

export default  ForgetPassword