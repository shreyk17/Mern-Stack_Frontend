import React, { Component } from 'react'
import { Redirect  , Link} from 'react-router-dom';
import {signin , authenticate, socialLogin} from '../auth/index'
import ForgetPassword from './ForgetPassword'
import SocialLogin from './SocialLogin';

class Login extends Component {


    constructor(){
        super();
        this.state = {
            email : '',
            password:'',
            error:'',
            redirectToRefer : false,
            loading : false,
            recaptcha : false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({error : ''})
        this.setState({
            [name] : event.target.value
        })
    }


    handleRecaptcha = e => {
        this.setState({
            error : ""
        })
        let userDay = e.target.value.toLowerCase();
        let dayCount;
        if(userDay === 'sunday'){
            dayCount = 0
        }else if (userDay === 'monday'){
            dayCount = 1
        }
        else if(userDay === 'tuesday'){
            dayCount = 2
        }
        else if(userDay === 'wednesday'){
            dayCount = 3
        }
        else if(userDay === 'thursday'){
            dayCount = 4
        }
        else if(userDay === 'friday'){
            dayCount = 5
        }
        else if(userDay === 'saturday'){
            dayCount = 6
        }

        if(dayCount === new Date().getDay()){
            this.setState({
                recaptcha : true
            })
            return true
        }
        else {
            this.setState({
                recaptcha : false
            })
            return false
        }
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
        if(this.state.recaptcha){
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
        }else {
            this.setState({
                loading : false,
                error : "What day is today? Please write correct answer"
            })
        }
    }

    signinForm = (email,password,recaptcha) => (
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
            <div className = "form-group">
                <label className = "text-muted">
                    {recaptcha ? "Great you got it !" : "What day is today?"}
                </label>
                <input
                    onChange = {this.handleRecaptcha}
                    type = "text"
                    className = "form-control"
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


        const {email , password , error ,redirectToRefer,loading , recaptcha } = this.state;

        if(redirectToRefer){
            return <Redirect to = "/" />
        }

        return (
            <div className = "container">   
                <h2 className = "mb-5 mt-5">Sign In</h2>

                <hr/>
                    <SocialLogin />
                <hr/>

                {/* error message */}
                <div className = "alert alert-danger" style = {{ display : error ? "" : 'none'}}>{error}</div>

                {loading ? <div className= "jumbotron text-center"><h2>Loading...</h2></div> : ""}

                {this.signinForm(email,password , recaptcha)}
                <p>
                    <Link to = "/forget-password" className ="text-danger">
                        {" "}
                        Forgot Password
                    </Link>
                </p>
            </div>
        )
    }
}

export default Login