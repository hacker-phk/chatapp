import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import cookie from "js-cookie";

function useSignUp() {
    const [loading, setLoading] = useState(false)
    const {setAuthUser}=useAuthContext();


    const signup=async ({fullName, username, password, confirmPassword, gender}) => {
        
        const sucess=handleInputErrors(fullName, username, password, confirmPassword, gender);
        if(!sucess) return ;
        try{
            const res=await fetch("/api/auth/signup",{
               method:"POST",
               headers:{
                   "Content-Type":"application/json"
               } 
               ,body:JSON.stringify({
                   fullName,
                   userName:username,
                   password,
                   confirmPassword,
                   gender
               })
            })
            const data=await res.json();
            if(data.error) throw new Error(data.message)
                console.log(data, "response data");
            cookie.set('token', data.token); // Set the cookie appropriately

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

            if(res.status===201){
                toast.success("user created successfully")
            }
            else{
                console.log(data)
                toast.error(data.message? data.message : "something went wrong")
            }
        }
        catch(err){
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }


    }
  return {signup,loading}
}

export default useSignUp;


function handleInputErrors(fullName, username, password, confirmPassword, gender) {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        console.log(fullName, username, password, confirmPassword, gender,"hi");
        
        toast.error("please fill all fields ")
        return false
    }

    if(password !== confirmPassword) {
        toast.error("passwords do not match")
        return false
    }
    if(password.length < 6) {
        toast.error("password must be at least 6 characters")
        return false
    }
    return true


}