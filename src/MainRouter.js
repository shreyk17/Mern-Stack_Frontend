import React from 'react';
import { Route ,Switch } from 'react-router-dom';
import Home from './core/Home';
import Login from './user/Login';
import Signup from './user/Signup';
import Menu from './core/Menu';
import Profile from './user/Profile';
import Users from './user/Users';
import Edit from './user/Edit';
import PrivateRoute from './auth/PrivateRoute'; 
import FindPeople from './user/FindPeople';
import NewPost from './post/NewPost';
import Post from './post/Post';
import SinglePost from './post/SinglePost'

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path = "/" component = {Home}></Route>
            <PrivateRoute exact path = "/post/create" component = {NewPost}></PrivateRoute>
            <Route exact path="/post/:postId" component = {SinglePost}></Route>
            <Route exact path = "/users" component = {Users}></Route>
            <Route exact path="/signup" component = {Signup}></Route>
            <Route exact path="/signin" component = {Login}></Route>
            <PrivateRoute exact path = "/user/:userId" component = {Profile}></PrivateRoute>
            <PrivateRoute exact path = "/user/edit/:userId" component = {Edit}></PrivateRoute>
            <PrivateRoute exact path = "/findPeople" component = {FindPeople}></PrivateRoute>
            
        </Switch>
    </div>
)

export default MainRouter;