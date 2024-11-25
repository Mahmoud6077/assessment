import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string): Observable<any> {
    // Mock login implementation
    if (email === 'test@example.com' && password === 'password') {
      return of({ email, token: 'mock-token' });
    } else {
      throw new Error('Invalid login credentials');
    }
  }

  signup(username: string, password: string, email: string, phone: string): Observable<any> {
    // Mock signup implementation
    return of({ username, email, phone, token: 'mock-token' });
  }
}
