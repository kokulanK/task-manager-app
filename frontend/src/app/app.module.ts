import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core modules
import { AuthService } from './core/services/auth.service';
import { TaskService } from './core/services/task.service';
import { UserService } from './core/services/user.service';
import { AlertService } from './core/services/alert.service';
import { AuthGuard } from './core/guards/auth.guard';
import { jwtInterceptorProvider } from './core/interceptors/jwt.interceptor';
import { errorInterceptorProvider } from './core/interceptors/error.interceptor';

// Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './core/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TaskListComponent,
    TaskFormComponent,
    ProfileComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    TaskService,
    UserService,
    AlertService,
    AuthGuard,
    jwtInterceptorProvider,
    errorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }