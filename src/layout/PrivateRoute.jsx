import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import auth from "../../firebase"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute=()=>{
    const [isAuth,setAuth]=useState({})
       function getAuth(){
         onAuthStateChanged(auth,(user)=>{
            console.log(user)
            setAuth(user)
        })
       }

       useEffect(()=>{
        getAuth()
       },[auth])
        // .then((user)=>setAuth(user))
        // .catch(err=>console.log(err))
    
    return isAuth != null? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute;
