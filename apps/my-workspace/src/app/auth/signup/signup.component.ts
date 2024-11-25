import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.styles.css'],
  imports: [FormsModule, RouterModule],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  phone: string = ''; // this property to avoid the "does not exist" error

  constructor(private authService: AuthService, private router: Router) {} // Inject the Router service

  onSignup() {
    if (this.password !== this.repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      email: this.email,
      password: this.password,
      phone: this.phone,
    };

    this.authService.signup(userData).subscribe({
      next: () => {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (err) => {
        console.error(err);
        if (err.error?.message === 'Email already exists') {
          alert('This email is already registered. Please log in instead.');
          this.router.navigate(['/login']); // Redirect to login page
        } else {
          alert('Signup failed. Please try again.');
        }
      },
    });
  }
}
