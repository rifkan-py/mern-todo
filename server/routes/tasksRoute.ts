import express from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/tasksController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', protect, getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
