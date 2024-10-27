import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { BsSend } from "react-icons/bs";

function useSendConversation() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        try {
            setLoading(true);

            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                body: JSON.stringify({ message }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensure CORS settings are configured correctly on the server if needed
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to send message");
            }

            const data = await res.json();
            console.log(data);

            // Update messages with the new message data
            setMessages([...messages, data]);
            toast.success("Message sent!");
        } catch (error) {
            toast.error(error.message || "An error occurred");
            console.error("Send message error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
}

export default useSendConversation;
