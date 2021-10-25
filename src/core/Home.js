import React from 'react'
import Post from '../post/Post'

const Home = () => {
    return (
        <div>
            <div className="jumbotron">
                <h1>Home</h1>
                <h1 className="lead">
                    Recent Posts
                </h1>
            </div>
            <div className= "container">
                <Post />
            </div>
        </div>
    )
}

export default Home
