import express from 'express'
import getUsersForSideBar from '../controllers/user.controller.js';
import protectedRoute from '../middlewares/protectedRoute.js'

// import protectedRoute from '../middlewares/protectedRoute.js';



const router = express.Router()

router.get("/",protectedRoute,getUsersForSideBar);

export default router;
