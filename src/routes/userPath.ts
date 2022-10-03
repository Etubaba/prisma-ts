import express, { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController';


const router:Router = express.Router();

router.get('/users',getAllUsers)
router.get('/user/:id',getUser)
router.post('/create/user',createUser)
router.put('/update/user/:id',updateUser)
router.delete('/delete/user/:id',deleteUser)



export default router