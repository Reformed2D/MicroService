import { saveAs } from 'file-saver';
import { Component } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  tasks: Task[];
  filteredTasks: Task[];
  searchQuery: string = '';
  constructor(private taskService: TaskService, private router: Router, public dialog: MatDialog, private http: HttpClient) { }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchTasks();
      window.location.reload(); // Reload the page after adding a task
    });
  }

  openUpdateDialog(taskId: number): void {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      data: { taskId: taskId, ...this.tasks.find(task => task.id === taskId) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchTasks();
      window.location.reload(); // Reload the page after updating a task
    });
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
        this.applyFilter();
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  applyFilter(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.taskDescription.toLowerCase().includes(this.searchQuery.toLowerCase())
      || task.duration.toLowerCase().includes(this.searchQuery.toLowerCase())
      || task.progress.toLowerCase().includes(this.searchQuery.toLowerCase())
      || (task.supervisor? task.supervisor.name.toLowerCase().includes(this.searchQuery.toLowerCase()): false)
      || (task.supervisor? task.supervisor.name.toLowerCase().includes(this.searchQuery.toLowerCase()): false)
      || task.attachmentFileName?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  }
  onSearchChange(): void {
    this.applyFilter();
  }
  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      const url = `http://localhost:8081/api/tasks/${taskId}`; // Use the correct URL for deletion
      this.http.delete(url).subscribe( // Make a DELETE request directly
        () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          window.location.reload(); // Reload the page after deleting a task
        },
        error => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
  downloadAttachment(taskId: number, attachmentFileName?: string): void {
    if (attachmentFileName) {
      this.taskService.downloadTaskFile(taskId, attachmentFileName).subscribe(
        data => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          saveAs(blob, attachmentFileName);
        },
        error => {
          console.error('Error downloading attachment:', error);
          // Handle specific errors, if needed
          if (error.status === 404) {
            console.error('Attachment not found');
          } else {
            console.error('Unknown error occurred');
          }
        }
      );
    } else {
      console.error('Attachment file name is undefined');
    }
  }

}
