import React, { Component } from 'react'
import { Redirect } from 'react-router';
import {signin , authenticate} from '../auth/index'

class Login extends Component {


    constructor(){
        super();
        this.state = {
            email : '',
            password:'',
            error:'',
            redirectToRefer : false,
            loading : false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({error : ''})
        this.setState({
            [name] : event.target.value
        })
    }



    clickSubmit = (event) => {
        event.preventDefault();
        this.setState({loading : true})
        const {email , password} = this.state
        const user = {
            email  :email,
            password  : password
        }
        //console.log(user)
        signin(user).then(data => {
            if(data.error) {
                //console.log(data.error)
                this.setState({error : data.error , loading : false });
            }
            else {
                //authenticate
                authenticate(data , () =>{
                    this.setState({redirectToRefer : true })
                })
            }
            console.log(data.error)
        });
    }

    signinForm = (email,password) => (
        <form>
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
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <br/>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-secondary"
            >
                Submit
            </button>
        </form>
    )

    render() {


        const {email , password , error ,redirectToRefer,loading } = this.state;

        if(redirectToRefer){
            return <Redirect to = "/" />
        }

        return (
            <div className = "container">   
                <h2 className = "mb-5 mt-5">Sign In</h2>

                {/* error message */}
                <div className = "alert alert-danger" style = {{ display : error ? "" : 'none'}}>{error}</div>

                {loading ? <div className= "jumbotron text-center"><h2>Loading...</h2></div> : ""}

                {this.signinForm(email,password)}
            </div>
        )
    }
}

export default Login