import db from '../config/db.js';

export const getAllEmployees = async (filters = {}) => {
  let baseQuery = 'SELECT * FROM employees';
  const conditions = ['deleted_at IS NULL'];
  const values = [];

  Object.entries(filters).forEach(([key, value], index) => {
    conditions.push(`${key} ILIKE $${index + 1}`);
    values.push(`%${value}%`);
  });

  if (conditions.length) {
    baseQuery += ' WHERE ' + conditions.join(' AND ');
  }

  baseQuery += ' ORDER BY id ASC';

  const res = await db.query(baseQuery, values);
  return res.rows;
};

const getEmployeeById = async (id) => {
  const res = await db.query('SELECT * FROM employees WHERE id = $1', [id]);
  const employee = res.rows[0];

  if (!employee) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return {
    ...employee,
    dob: formatDate(employee.dob),
    joining_date: formatDate(employee.joining_date),
  };
};

export const isEmailTaken = async (email) => {
  const res = await db.query('SELECT 1 FROM employees WHERE email = $1', [email]);
  return res.rowCount > 0;
};

const createEmployee = async ({
  name, email, phone, address, joining_date,
  designation, salary, gender, dob, department
}) => {
  const now = new Date();
  const res = await db.query(
    `INSERT INTO employees (
      name, email, phone, address, joining_date, designation,
      salary, gender, dob, department, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10, $11, $12
    ) RETURNING *`,
    [name, email, phone, address, joining_date, designation,
     salary, gender, dob, department, now, now]
  );
  return res.rows[0];
};

const updateEmployee = async (id, { name, email, phone, address, joining_date, designation, salary, status, gender, dob, department }) => {
  const res = await db.query(
    'UPDATE employees SET name = $1, email = $2, phone = $3, address = $4, joining_date = $5, designation = $6, salary = $7, gender = $8, dob = $9, department = $10 WHERE id = $11 RETURNING *',
    [name, email, phone, address, joining_date, designation, salary, gender, dob, department, id]
  );
  return res.rows[0];
};

const changeEmployeeStatus = async (id, status) => {
  await db.query('UPDATE employees SET status = $1 WHERE id = $2', [status, id]);
};

const deleteEmployee = async (id) => {
  await db.query('UPDATE employees SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1;', [id]);
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  isEmailTaken,
  changeEmployeeStatus
};
