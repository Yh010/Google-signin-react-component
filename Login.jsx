import React, { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import {signInWithPopup ,onAuthStateChanged} from "firebase/auth"
import { auth,provider } from '../config/firebaseConfig'
import { useNavigate} from "react-router-dom"


const Login() => {
    const [user, setUser] = useState();

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID:results.user.uid,
                name:results.user.displayName,
                profilePhoto:results.user.photoURL,
                isAuth:true

            }
            localStorage.setItem("authInfo", JSON.stringify(authInfo || {}));
           /*  setUser(authInfo); */
            navigate("/");
        }catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        const authchange = onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
        return ()=>{
             authchange();
        }
    })

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl font-bold mb-5">Login</h1>
            <GoogleButton onClick={signInWithGoogle} />
        </div>
    )
}

expoert default Login;