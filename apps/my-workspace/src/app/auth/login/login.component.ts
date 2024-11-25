import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.styles.css'],
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const loginData = { email: this.email, password: this.password };

    this.authService.login(loginData).subscribe({
      next: (response: { accessToken: string }) => {
        alert('Login successful!');
        this.authService.saveToken(response.accessToken); // to Save token on successful login
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}
