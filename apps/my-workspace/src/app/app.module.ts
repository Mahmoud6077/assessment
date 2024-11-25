import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // For ngModel
import { RouterModule } from '@angular/router'; // For routing
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // For HttpClient
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.components';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Add HttpClientModule for API calls
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, //to protect the route
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
