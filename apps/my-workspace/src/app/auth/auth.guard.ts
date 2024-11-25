import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken'); // Checking if token exists
    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if token doesn't exist
      return false;
    }

    try {
      const decoded: { exp: number } = jwtDecode(token); // Decode the token
      const isTokenExpired = decoded.exp * 1000 < Date.now(); // Check expiration
      if (isTokenExpired) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('accessToken'); // Clear expired token
        this.router.navigate(['/login']); // Redirect to login page
        return false;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('accessToken'); // Clear invalid token
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }

    return true; // Allow access if token is valid
  }
}
