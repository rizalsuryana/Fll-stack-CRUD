import express from 'express';
import {
    getUser,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

//membuat endpoint baru

router.get('/user', getUser);
router.get('/user/:id', getUserByID);
router.post('/user', createUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;