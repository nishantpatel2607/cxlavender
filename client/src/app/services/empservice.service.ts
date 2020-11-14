import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeList } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmpService {
  private serverUrl = 'http://localhost:4000/api/empl';
  constructor(private httpClient: HttpClient) {}

  getEmployeeList(page: number,location: string, size:string): Observable<EmployeeList> {
    const url = `${this.serverUrl}/list?page=${page}&location=${location}&size=${size}`;
    return this.httpClient.get<EmployeeList>(url);
  }
}