import User from "../model/user.model.js"
const getUsersForSideBar = async (req, res) => {
    try {
       
        const users = await User.find({ _id: { $ne: req.user._id } })
        
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "internal server error" })
    }
}
export default getUsersForSideBar   