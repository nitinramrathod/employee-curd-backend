import pool from "../config/db.js";

const createEmployeeTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(15),
      address TEXT,
      gender VARCHAR(10),
      dob DATE,
      joining_date DATE,
      designation VARCHAR(100),
      department VARCHAR(100),
      salary NUMERIC(10, 2),
      status VARCHAR(20) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Employees table created successfully");
  } catch (error) {
    console.error("Error creating employees table:", error);
  }
};

export default createEmployeeTable;
