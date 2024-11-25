import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <h2>Welcome to the Dashboard!</h2>
      <p>You have successfully logged in.</p>

      <!-- Display the list of items -->
      <div class="data-list">
        <h3>Available Products:</h3>
        <ul>
          <li *ngFor="let product of Products">{{ product }}</li>
        </ul>
      </div>

      <button (click)="onLogout()">Logout</button>
    </div>
  `,
  styles: [`
    .dashboard-container {
      text-align: center;
      margin-top: 50px;
      font-family: Arial, sans-serif;
    }
    .dashboard-container h2 {
      font-size: 32px;
      color: #007bff;
    }
    .dashboard-container p {
      font-size: 18px;
      color: #333;
    }
    .data-list {
      margin: 20px auto;
      padding: 10px;
      max-width: 400px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .data-list h3 {
      font-size: 24px;
      color: #007bff;
      margin-bottom: 10px;
    }
    .data-list ul {
      list-style-type: none;
      padding: 0;
    }
    .data-list li {
      font-size: 18px;
      color: #333;
      padding: 5px 0;
    }
    .dashboard-container button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
    .dashboard-container button:hover {
      background-color: #0056b3;
    }
  `],
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {

  // Mock data to display on the dashboard
  Products: string[] = [
    'Laptop',
    'Smartphone',
    'Tablet',
    'Headphones',
    'Smartwatch'
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token) {
      alert('Please log in to access the dashboard.');
      this.router.navigate(['/login']); // Redirect to login if no token exists
    }
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        alert('You have been logged out.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('You have been logged out.'); // Show message even if API fails
        this.router.navigate(['/login']);
      },
    });
  }
}
