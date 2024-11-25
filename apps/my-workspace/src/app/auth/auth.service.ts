import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'accessToken'; // Key for storing the token
  private tokenExpirationTimer: any;
  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Signup API
  signup(data: { email: string; password: string; phone: string }): Observable<any> {
    return this.http.post(`${this.baseURL}/users/signup`, data);
  }

  // Login API
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/signin`, data).pipe(
      tap((response: any) => {
        if (response && response.accessToken) {
          this.saveToken(response.accessToken); // Save the token after login
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed.'));
      })
    );
  }

  // Logout API
  logout(): Observable<any> {
  const token = this.getToken(); // Get the stored token

  if (!token) {
    // Handle case when no token exists (already logged out)
    return new Observable((observer) => {
      observer.next({ message: 'You are already logged out.' });
      observer.complete();
    });
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  // Call the backend API and handle success/failure
  return this.http.post(`${this.baseURL}/auth/signout`, {}, { headers }).pipe(
    tap(() => {
      this.clearToken(); // Clear the token on successful logout
      console.log('User successfully logged out.');
    }),
    catchError((error) => {
      console.error('Logout failed:', error);
      this.clearToken(); // Clear the token even if the logout fails
      return throwError(() => new Error('Logout failed.'));
    })
  );
}


  // Save the token and start the expiration timer
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.startTokenExpirationTimer(token);
  }

  // Retrieve the token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove the token
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    clearTimeout(this.tokenExpirationTimer);
  }

  // Start auto-logout timer based on token expiration
  private startTokenExpirationTimer(token: string): void {
    try {
      const decoded: { exp: number } = jwtDecode(token); // Decode the token
      const expirationTime = decoded.exp * 1000; // Convert expiration to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration > 0) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.clearToken();
          alert('Session expired. Please log in again.');
          window.location.href = '/login'; // Redirect to login
        }, timeUntilExpiration);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      this.clearToken();
      alert('Invalid session. Please log in again.');
      window.location.href = '/login'; // Redirect to login
    }
  }
}
