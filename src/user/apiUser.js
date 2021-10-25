export const read  = (userId, token) => {
    return fetch(`http://localhost:8080/user/${userId}` , {
        method : "GET",
        headers : {
            Accept : 'application/json',
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const list = () =>{
    return fetch(`http://localhost:8080/users` , {
        method : "GET",
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const removeUser = (userId,token) => {
    return fetch(`http://localhost:8080/user/${userId}` , {
        method : "DELETE",
        headers : {
            Accept : 'application/json',
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))   
}

export const update = (userId,token,user) => {
    console.log("user data" , user)
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}` , {
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : user
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const updateUser = (user,next) => {
    if(typeof window !== undefined){
        if(localStorage.getItem('jwt')){
            let auth  = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem("jwt",JSON.stringify(auth))
            next()
        }
    }
}

export const follow = (userId,token,followId) => {
    //console.log("user data" , user)
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow` , {
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({userId , followId})
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const unfollow = (userId,token,unfollowId) => {
    //console.log("user data" , user)
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow` , {
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({userId , unfollowId})
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const findPeople = (userId , token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/findPeople/${userId}` , {
        method : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err)) 
}