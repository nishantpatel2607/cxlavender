import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeList, EmployeeResult } from '../models/employee';
@Injectable({
  providedIn: 'root',
})
export class EmpService {
  private serverUrl = 'http://localhost:4000/api/empl';
  constructor(private httpClient: HttpClient) {}

  getEmployeeList(
    page: number,
    location: string,
    size: string
  ): Observable<EmployeeList> {
    const url = `${this.serverUrl}/list?page=${page}&location=${location}&size=${size}`;
    return this.httpClient.get<EmployeeList>(url);
  }

  deleteEmployee(id: string) {
    const url = `${this.serverUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  getEmployee(id: string): Observable<EmployeeResult> {
    const url = `${this.serverUrl}/${id}`;
    return this.httpClient.get<EmployeeResult>(url);
  }

  createEmployee(employee: Employee) {
    const url = `${this.serverUrl}`;
    const body = JSON.stringify(employee);
    return this.httpClient.post(url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateEmployee(employee: Employee) {
    const url = `${this.serverUrl}/${employee._id}`;
    const body = JSON.stringify(employee);
    return this.httpClient.put(url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  downloadEmployeeList(
    location: string,
    size: string
  ) {
    const url = `${this.serverUrl}/export?location=${location}&size=${size}`;
    this.httpClient.get<any>(url).subscribe((blob) => console.log(blob));
  }
}
