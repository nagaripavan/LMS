import { clerkClient } from "@clerk/express";
import {Course} from "../models/Course.js";
import {v2 as cloudinary} from 'cloudinary'
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";


export const updateRoleEducator = async (req, res) => {
  try {
    const { userId } = req.auth();


    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: userId not found",
      });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    return res.json({
      success: true,
      message: "You can publish a course now",
    });
  } catch (error) {
    console.log("Clerk error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add new course
export const addCourse = async (req,res)=>{
  try {
    const {courseData} = req.body
    const imageFile = req.file
    const { userId } = req.auth();
    const educatorId = userId;

    if (!imageFile) {
      return res.json({success:false,message:'Thumbnail Not Attached'})
    }

    const parsedCourseData = await JSON.parse(courseData)
    parsedCourseData.educator = educatorId
    const newCourse = await Course.create(parsedCourseData)
    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    newCourse.courseThumbnail = imageUpload.secure_url
    await newCourse.save()

    res.json({success:true,message:'Course Added'})

  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

// Get educator Courses
export const getEducatorCourses = async(req,res)=>{

  try {

      const { userId } = req.auth();

      const courses = await Course.find({educator:userId})
      
      res.json({success:true,courses})

  } catch (error) {
    res.json({success:false,message:error.message})

  }
}

// get educator Dashboard Data
export const educatorDashboardData = async(req,res)=>{
  try {
    const { userId } = req.auth();
    const educatorId = userId;

    const courses = await Course.find({educatorId})
    const totalCourses = courses.length;

    const courseIds = courses.map(course=>course._id)

    // calculate total earnings from purchases
    const purchases =  await Purchase.find({courseId:{$in:courseIds},status:'completed'})
    const totalEarnings = purchases.reduce((total,purchase)=>total+purchase.amount,0)

    // Collect unique enrolled students IDs with their course Titles
    const enrolledStudentsData = []
    for(let course of courses){
      const students = await User.find({
        _id:{$in:course.enrolledStudents}
      },'name imageUrl')

      students.forEach(student=>{
        enrolledStudentsData.push({
          courseTitle:course.courseTitle,
          student
        })
      })
    }

    res.json({
      success:true,
      totalCourses,
      totalEarnings,
      enrolledStudentsData
    })

  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentsData =  async(req,res)=>{
  try {
    const { userId } = req.auth();
    const educatorId = userId;

    const courses = await Course.find({educatorId})
    const courseIds = courses.map(course=>course._id)

    const purchases = await Purchase.find({courseId:{$in:courseIds},status:'completed'}).populate('userId','name imageUrl').populate('courseId','courseTitle')

    const enrolledStudents = purchases.map(purchase=>({
      courseTitle:purchase.courseId.courseTitle,
      studentName:purchase.userId.name,
      studentImage:purchase.userId.imageUrl,
      purchaseDate:purchase.createdAt
    }))

    res.json({success:true,enrolledStudents})

  } catch (error) {
    res.json({success:false,message:error.message})
  }
}