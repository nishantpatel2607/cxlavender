export interface Employee {
  _id: string;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  company: string;
}

export interface EmployeeList {
  result: Employee[];
  totalPages: number;
  currentPage: number;
}

export interface EmployeeResult {
  result: Employee;
}
