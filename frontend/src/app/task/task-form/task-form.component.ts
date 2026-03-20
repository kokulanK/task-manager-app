import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { AlertService } from '../../core/services/alert.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private alertService: AlertService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TO_DO'],
      priority: ['MEDIUM']
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        priority: this.task.priority
      });
    } else if (changes['isOpen'] && this.isOpen && !this.task) {
      this.taskForm.reset({ status: 'TO_DO', priority: 'MEDIUM' });
    }
  }

  get f() { return this.taskForm.controls; }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const taskData: Task = this.taskForm.value;
    const request = this.task
      ? this.taskService.updateTask(this.task.id!, taskData)
      : this.taskService.createTask(taskData);

    request.subscribe({
      next: (savedTask) => {
        this.alertService.success(this.task ? 'Task updated' : 'Task created');
        this.save.emit(savedTask);
      },
      error: () => {}
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}