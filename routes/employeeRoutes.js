import express from 'express';
const router = express.Router();
import controller from '../controllers/employeeController.js';

router.get('/', controller.getEmployees);
router.get('/:id', controller.getEmployee);
router.post('/', controller.createEmployee);
router.put('/:id', controller.updateEmployee);
router.put('/status/:id', controller.toggleEmployeeStatus);
router.delete('/:id', controller.deleteEmployee);

export default router;
