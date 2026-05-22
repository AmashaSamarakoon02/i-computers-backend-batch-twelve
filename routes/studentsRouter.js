import express from 'express';
import { createStudent, getAllStudents } from '../controllers/studentController.js';

const studentsRouter = express.Router();// Create a router for student-related routes

studentsRouter.get("/",getAllStudents) 

studentsRouter.post("/", createStudent)

export default studentsRouter;