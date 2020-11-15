import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Companies, Locations, Sizes } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private serverUrl = 'http://localhost:4000/api/company';
  constructor(private httpClient: HttpClient) {}

  getLocations(): Observable<Locations> {
    const url = `${this.serverUrl}/locations`;
    return this.httpClient.get<Locations>(url);
  }

  getSizes(): Observable<Sizes> {
    const url = `${this.serverUrl}/sizes`;
    return this.httpClient.get<Sizes>(url);
  }

  getCompanies(): Observable<Companies> {
    const url = `${this.serverUrl}/list`;
    return this.httpClient.get<Companies>(url);
  }
}
