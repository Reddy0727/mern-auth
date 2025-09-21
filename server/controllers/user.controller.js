import User from '../models/user.model.js'

export const getUserData = async (req,res)=>{
    try {
        const {userId} = req.user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success:true,
            userData:{
                id:user._id,
                name:user.name,
                email:user.email,
                isAccountVerified:user.isAccountVerified
            }
        })
        
    } catch (error) {
        return res.status(401).json({
      success: false,
      message: error.message || "Token verification failed",
    });
    }
}