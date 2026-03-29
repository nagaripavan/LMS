import { clerkClient } from "@clerk/express";


// Middleware (Protect Educator Routes)
export const protectEducator = async(req,res,next)=>{
    try {
        const { userId } = req.auth();
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No userId",
            });
        }

        
        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata.role !== 'educator'){
            return res.json({
                success:false,
                message:'Unauthorized Access'
            })
        }
        next()

    } catch (error) {
  console.log("ADD COURSE ERROR:", error); 
  res.status(500).json({success:false,message:error.message})
    }
}