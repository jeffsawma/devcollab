import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userData: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, userData);
  }

  register(userData: any) {
    return this.http.post(`${environment.apiUrl}/auth/signup`, userData);
  }
}
