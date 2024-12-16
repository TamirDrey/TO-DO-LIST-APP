import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

const router = Router();

router.get('/tasks', TaskController.getAllTasks);
router.post('/tasks', TaskController.addTask);
router.put('/tasks/:id', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;