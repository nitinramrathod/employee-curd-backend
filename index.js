import express from 'express';
import  cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes.js';
import createEmployeeTable from './data/createEmployeeTable.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create Tables 
createEmployeeTable();

app.use('/api/v1/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
