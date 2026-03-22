import express from 'express';
import { updateRoleEducator } from '../controllers/educatorController.js';

const educatorRouter = express.Router();

// Add Educator Role
educatorRouter.post('/update-role', updateRoleEducator);

export default educatorRouter;