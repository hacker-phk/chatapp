import Conversation from '../model/conversation.model.js'
import Message from '../model/message.model.js'
export const sendMessage=async(req,res)=>{
    try {
        
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({participants:{$all:[senderId,receiverId]}})
        if(!conversation){
            conversation=new Conversation({
                participants:[senderId,receiverId]
            })
            await conversation.save();
        }
        const newMessage=new Message({
            senderId, 
            receiverId,
            message
        })
        conversation.messages.push(newMessage._id)
        await  Promise.all([newMessage.save(),conversation.save()])
        // await newMessage.save();
        // await conversation.save();
        res.status(201).json({message:"message sent"})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({participants:{$all:[senderId,userToChatId ]}})
        if(!conversation){
            res.status(404).json([])
        }
        const messages=await Message.find({_id:{$in:conversation.messages}})
        res.status(200).json(messages)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"internal server error"})
    }
}