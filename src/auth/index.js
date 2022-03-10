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

export const forgotPassword = email => {
    console.log("email - " , email)
    return fetch(`${process.env.REACT_APP_API_URL}/forget-password/` , {
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({email})

    })
    .then(res => {
        console.log("forget password reponse ", res)
        return res.json()
    })
    .catch(err => console.log(err))
}

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/` , {
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-Type" :"application/json"
        },
        body : JSON.stringify({resetInfo})
    })
    .then(res => {
        console.log("reset info " , res)
        return res.json()

    })
    .catch(err => console.log(err))
}

export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/` , {
        method : "POST",
        headers : {
            Accept :"application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(res => {
        console.log("sigin response " , res)
        return res.json()
    })
    .catch(err => console.log(err))
}