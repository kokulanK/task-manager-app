import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';
import { AlertService } from '../core/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.profileForm.patchValue({
          name: profile.name,
          email: profile.email
        });
      },
      error: () => {}
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    if (password || confirm) {
      return password === confirm ? null : { mismatch: true };
    }
    return null;
  }

  get f() { return this.profileForm.controls; }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const { name, password } = this.profileForm.value;
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) return;

    const profileData: any = { name, email: currentUser.email };
    if (password) {
      profileData.password = password;
    }

    this.userService.updateProfile(profileData).subscribe({
      next: () => {
        const user = this.authService.currentUserValue;
        if (user) {
          user.name = name;
          this.authService.updateCurrentUser(user); // ✅ updates the observable
        }
        this.alertService.success('Profile updated');
        this.profileForm.get('password')?.reset();
        this.profileForm.get('confirmPassword')?.reset();
      },
      error: () => {}
    });
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteAccount().subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
          this.alertService.success('Account deleted');
        },
        error: () => {}
      });
    }
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}