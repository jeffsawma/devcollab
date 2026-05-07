import { Component, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TaskService } from '../../services/task';

import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  tasks: any[] = [];

  title = '';
  description = '';
  projectId = '';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
    this.socketService.socket.on('milestone:created', (data: any) => {
      alert(data.message);
    });

    this.socketService.socket.on('milestone:deleted', (data: any) => {
      alert(data.message);
    });
  }

  loadTasks() {
    this.taskService.getTasks(this.projectId).subscribe({
      next: (response: any) => {
        this.tasks = [...response.data];

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.log(error);
      },
    });
  }

  createTask() {
    this.taskService
      .createTask({
        title: this.title,
        description: this.description,
        project: this.projectId,
      })
      .subscribe({
        next: (response: any) => {
          alert('Milestone created');

          this.tasks.push(response.data);

          this.tasks = [...this.tasks];

          this.cdr.detectChanges();

          this.title = '';
          this.description = '';
        },

        error: (error: any) => {
          alert(error.error.message);
        },
      });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: (_response: any) => {
        alert('Milestone deleted');

        this.tasks = this.tasks.filter((task) => task._id !== id);

        this.tasks = [...this.tasks];

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        alert(error.error.message);
      },
    });
  }
}
