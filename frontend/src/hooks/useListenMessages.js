import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext';
import useConverSations from "../zustand/useConversation"
import notifacationSound from  "../assets/sounds/notification.mp3"
const useListenMessages = () => {
  const {socket}=useSocketContext();
  const {messages,setMessages}=useConverSations();
  useEffect(()=>{
    console.log(socket)
    socket?.on("newMessage",(newMessage)=>{
      const sound=new Audio(notifacationSound);
      sound.play();
        newMessage.shouldShake=true;
        
        setMessages([...messages,newMessage
        ])
    })
    return ()=> socket?.off("newMessages")
  },[socket,setMessages,messages])

}

export default useListenMessages