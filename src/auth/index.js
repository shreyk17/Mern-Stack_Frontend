export const signup = (user) => {

    return fetch(`http://localhost:8080/signup`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const signin = (user) => {
    return fetch(`http://localhost:8080/signin`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const authenticate = (jwt , next) =>  {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt" , JSON.stringify(jwt))
        next()
    }
}

export const signout = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
    }
    next()
    return fetch(    `http://localhost:8080/signout` , {
        method : "GET",

    })
    .then((res) => {
        console.log(res)
        return res.json()
        window.location.reload()
    }).catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const updateUser = (user,next) => {
    if(typeof window !== undefined){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}