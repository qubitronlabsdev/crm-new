// Employee management utilities

// Mock API functions
export const employeeApi = {
  // Get all employees
  getEmployees: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock response
    return {
      data: [
        {
          id: 1,
          employee_id: "EMP001",
          name: "John Doe",
          email: "john.doe@travelcrm.com",
          phone: "+1-555-0101",
          department: "sales",
          position: "manager",
          hire_date: "2023-01-15",
          salary: 75000,
          status: "active",
          manager: "jane_smith",
          address: "123 Main St, City, State",
          emergency_contact: "Jane Doe - +1-555-0201",
          notes: "Excellent team leader",
          created_at: "2023-01-15",
          updated_at: "2023-01-15",
        },
        // Add more mock employees as needed
      ],
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 1,
      },
    };
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      id: parseInt(id),
      employee_id: `EMP${id.toString().padStart(3, "0")}`,
      name: "John Doe",
      email: "john.doe@travelcrm.com",
      phone: "+1-555-0101",
      department: "sales",
      position: "manager",
      hire_date: "2023-01-15",
      salary: 75000,
      status: "active",
      manager: "jane_smith",
      address: "123 Main St, City, State",
      emergency_contact: "Jane Doe - +1-555-0201",
      notes: "Excellent team leader",
      created_at: "2023-01-15",
      updated_at: "2023-01-15",
    };
  },

  // Create new employee
  createEmployee: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Creating employee:", data);
    return {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  },

  // Update employee
  updateEmployee: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`Updating employee ${id}:`, data);
    return {
      id: parseInt(id),
      ...data,
      updated_at: new Date().toISOString(),
    };
  },

  // Delete employee
  deleteEmployee: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`Deleting employee ${id}`);
    return { success: true };
  },
};

// Transform employee data for form
export const transformEmployeeToFormData = (employee) => {
  if (!employee) return null;

  return {
    name: employee.name || "",
    email: employee.email || "",
    phone: employee.phone || "",
    employee_id: employee.employee_id || "",
    department: employee.department || "",
    position: employee.position || "",
    hire_date: employee.hire_date || "",
    salary: employee.salary || "",
    status: employee.status || "active",
    manager: employee.manager || "",
    address: employee.address || "",
    emergency_contact: employee.emergency_contact || "",
    notes: employee.notes || "",
  };
};

// Get employee by ID from localStorage (for demo)
export const getEmployeeById = (id) => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");
  return employees.find((emp) => emp.id === parseInt(id));
};

// Save employee to localStorage (for demo)
export const saveEmployee = (employee) => {
  const employees = JSON.parse(localStorage.getItem("employees") || "[]");

  if (employee.id) {
    // Update existing
    const index = employees.findIndex((emp) => emp.id === employee.id);
    if (index !== -1) {
      employees[index] = { ...employee, updated_at: new Date().toISOString() };
    }
  } else {
    // Create new
    const newEmployee = {
      ...employee,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    employees.push(newEmployee);
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  return employee;
};
