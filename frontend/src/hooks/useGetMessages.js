import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from 'react-hot-toast'

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  
  const {messages, setMessages,selectedConversation}=useConversation()
useEffect(()=>{
    const getMessages = async () => {
        setLoading(true);
        try {
            const res=await fetch(`/api/messages/${selectedConversation._id}`
                , {
					credentials: "include", // Change this if your API is on a different origin
				}
            )
            const data=await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            setMessages(data)
        } catch (error) {
            console.log(error, "erros dkasnf")
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    if(selectedConversation?._id)
    getMessages();
},[selectedConversation?._id,setMessages])


return {loading,messages}
}

export default useGetMessages