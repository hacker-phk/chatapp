import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
	const { conversations, loading, error } = useGetConversations();
	// console.log(conversations, loading);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{
				loading ? (
					<span className="loading loading-spinner" aria-label="Loading conversations"> </span>
				) : (
					conversations.length > 0 ? (
						conversations.map((conversation, idx) => (
							<Conversation
								key={conversation._id}
								conversation={conversation}
								emoji={getRandomEmoji()}
								lastIndex={idx === conversations.length - 1}
							/>
						))
					) : (
						<span className="text-center" aria-label="No conversations available">No conversations available</span>
					)
				)
			}
			
			{ error && <span className="text-red-500" aria-label="Error loading conversations">Failed to load conversations</span> }
		</div>
	);
};

export default Conversations;
