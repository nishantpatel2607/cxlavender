export interface Employee {
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