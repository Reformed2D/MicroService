import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/core/Task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private http: HttpClient
  ) {}

  updateTask(task: Task): void {
    const taskId = Number(this.data.id);
    const url = `http://localhost:8081/api/tasks/${taskId}`;
    this.http.put(url, { ...task, id: taskId }).subscribe(
      (response) => {
        console.log('Task updated successfully:', response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
