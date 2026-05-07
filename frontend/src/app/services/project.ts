import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getProjects() {
    return this.http.get(`${environment.apiUrl}/projects`, this.getHeaders());
  }

  createProject(projectData: any) {
    return this.http.post(`${environment.apiUrl}/projects`, projectData, this.getHeaders());
  }

  deleteProject(id: string) {
    return this.http.delete(`${environment.apiUrl}/projects/${id}`, this.getHeaders());
  }
}
