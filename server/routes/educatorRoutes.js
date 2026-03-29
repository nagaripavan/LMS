import express from 'express';
import { updateRoleEducator, addCourse } from '../controllers/educatorController.js';
import { protectEducator } from '../middlewares/authMiddleware.js';
import upload from '../configs/multer.js';

const educatorRouter = express.Router();

// Add Educator Role
educatorRouter.post('/update-role', updateRoleEducator);
educatorRouter.post('/add-course', protectEducator , upload.single('image'), addCourse);

export default educatorRouter;