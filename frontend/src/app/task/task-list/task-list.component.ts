import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { AlertService } from '../../core/services/alert.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  groupedTasks: { IN_PROGRESS: Task[], TO_DO: Task[], DONE: Task[] } = {
    IN_PROGRESS: [],
    TO_DO: [],
    DONE: []
  };
  showForm = false;
  selectedTask: Task | null = null;

  searchTerm = '';
  selectedStatus = 'ALL';
  selectedPriority = 'ALL';

  statusOrder: Array<'IN_PROGRESS' | 'TO_DO' | 'DONE'> = ['IN_PROGRESS', 'TO_DO', 'DONE'];

  constructor(
    private taskService: TaskService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilter();
      },
      error: () => {}
    });
  }

  applyFilter(): void {
    let filtered = this.tasks;

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(task => task.title.toLowerCase().includes(term));
    }

    if (this.selectedStatus !== 'ALL') {
      filtered = filtered.filter(task => task.status === this.selectedStatus);
    }

    if (this.selectedPriority !== 'ALL') {
      filtered = filtered.filter(task => task.priority === this.selectedPriority);
    }

    const priorityOrder: Record<string, number> = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
    filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    this.groupedTasks = {
      IN_PROGRESS: filtered.filter(t => t.status === 'IN_PROGRESS'),
      TO_DO: filtered.filter(t => t.status === 'TO_DO'),
      DONE: filtered.filter(t => t.status === 'DONE')
    };
  }

  clearFilters(event: Event): void {
    event.preventDefault();
    this.searchTerm = '';
    this.selectedStatus = 'ALL';
    this.selectedPriority = 'ALL';
    this.applyFilter();
  }

  getStatusTitle(status: 'IN_PROGRESS' | 'TO_DO' | 'DONE'): string {
    switch (status) {
      case 'IN_PROGRESS': return 'In Progress';
      case 'TO_DO': return 'To Do';
      case 'DONE': return 'Done';
      default: return '';
    }
  }

  getTotalFilteredCount(): number {
    return this.groupedTasks.IN_PROGRESS.length +
           this.groupedTasks.TO_DO.length +
           this.groupedTasks.DONE.length;
  }

  openTaskForm(): void {
    this.selectedTask = null;
    this.showForm = true;
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };
    this.showForm = true;
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
          this.applyFilter();
          this.alertService.success('Task deleted');
        },
        error: () => {}
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedTask = null;
  }

  onTaskSaved(task: Task): void {
    this.closeForm();
    this.loadTasks();
  }

  updateStatus(task: Task, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as 'TO_DO' | 'IN_PROGRESS' | 'DONE';
    const updatedTask: Task = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: newStatus,
      priority: task.priority
    };

    this.taskService.updateTask(task.id!, updatedTask).subscribe({
      next: () => {
        task.status = newStatus;
        this.applyFilter();
        this.alertService.success('Status updated');
      },
      error: () => {}
    });
  }

  updatePriority(task: Task, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newPriority = select.value as 'LOW' | 'MEDIUM' | 'HIGH';
    const updatedTask: Task = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: newPriority
    };

    this.taskService.updateTask(task.id!, updatedTask).subscribe({
      next: () => {
        task.priority = newPriority;
        this.applyFilter();
        this.alertService.success('Priority updated');
      },
      error: () => {}
    });
  }
}