export const create = (userId,token,post) => {
    //console.log("user data" , user)
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}` , {
        method : "POST",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : post
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const list = (token) =>{
    return fetch(`http://localhost:8080/posts` , {
        method : "GET",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const singlePost = (token,postId) =>{
    return fetch(`http://localhost:8080/post/${postId}` , {
        method : "GET",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const lisByUser = (userId,token) =>{
    return fetch(`http://localhost:8080/posts/by/${userId}` , {
        method : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}