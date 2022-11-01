import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUsersFilter,
} from '../controllers/userController.js';
import { protect, manager } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, manager, getUsers);
router.get('/query', protect, manager, getUsersFilter);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, manager, deleteUser)
  .get(protect, manager, getUserById)
  .put(protect, manager, updateUser);

export default router;
