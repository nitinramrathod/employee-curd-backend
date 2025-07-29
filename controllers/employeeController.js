import employeeModel from '../models/employeeModel.js';
import { employeeSchema } from '../validations/employeeValidator.js';

export const getEmployees = async (req, res) => {
  try {
    const filters = req.query;
    const data = await employeeModel.getAllEmployees(filters);
    res.json(data);
  } catch (err) {
    console.error("Get Employees Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getEmployee = async (req, res) => {
  const employee = await employeeModel.getEmployeeById(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Not found' });
  res.json(employee);
};

export const createEmployee = async (req, res) => {
  try {

    const { error, value } = employeeSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorDetails = {};

      error.details.forEach(err => {
        const key = err.path[0]; 
        if (!errorDetails[key]) {
          errorDetails[key] = err.message;
        }
      });

      return res.status(422).json({ status: false, errors: errorDetails });
    }

    const { email } = req.body;

    if (await employeeModel.isEmailTaken(email)) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newEmp = await employeeModel.createEmployee(value);
    res.status(201).json(newEmp);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEmployee = async (req, res) => {
  const updated = await employeeModel.updateEmployee(req.params.id, req.body);
  res.json(updated);
};

const deleteEmployee = async (req, res) => {
  await employeeModel.deleteEmployee(req.params.id);
  res.status(204).send({message: 'Employee deleted successfully'});
};

const toggleEmployeeStatus = async (req, res) => {
  await employeeModel.changeEmployeeStatus(req.params.id, req?.body?.status);
  res.status(201).send({message: 'Status update successfully'});
};

export default {
    getEmployees,
    deleteEmployee,
    updateEmployee,
    createEmployee,
    getEmployee,
    toggleEmployeeStatus
}
