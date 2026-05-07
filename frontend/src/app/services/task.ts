import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getTasks(projectId: string) {
    return this.http.get(`${environment.apiUrl}/tasks?projectId=${projectId}`, this.getHeaders());
  }

  createTask(taskData: any) {
    return this.http.post(`${environment.apiUrl}/tasks`, taskData, this.getHeaders());
  }

  deleteTask(id: string) {
    return this.http.delete(`${environment.apiUrl}/tasks/${id}`, this.getHeaders());
  }
}
