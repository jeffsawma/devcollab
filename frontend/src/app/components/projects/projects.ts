import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProjectService } from '../../services/project';

import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects: any[] = [];

  title = '';
  description = '';

  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();

    this.socketService.socket.on('workspace:created', (data: any) => {
      alert(data.message);
    });

    this.socketService.socket.on('workspace:deleted', (data: any) => {
      alert(data.message);
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (response: any) => {
        this.projects = [...response.data];

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.log(error);
      },
    });
  }

  createProject() {
    this.projectService
      .createProject({
        title: this.title,
        description: this.description,
      })
      .subscribe({
        next: (response: any) => {
          alert('Workspace created');

          this.projects.push(response.data);

          this.projects = [...this.projects];

          this.cdr.detectChanges();

          this.title = '';
          this.description = '';
        },

        error: (error: any) => {
          alert(error.error.message);
        },
      });
  }

  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe({
      next: (_response: any) => {
        alert('Workspace deleted');

        this.projects = this.projects.filter((project) => project._id !== id);

        this.projects = [...this.projects];

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        alert(error.error.message);
      },
    });
  }
}
