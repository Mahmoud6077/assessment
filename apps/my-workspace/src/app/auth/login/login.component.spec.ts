import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule], // Add FormsModule here
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onLogin() {
    console.log(`Login: ${this.email}, ${this.password}`);
  }
}





// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { FormsModule } from '@angular/forms';  // If you're using ngModel
// import { StoreModule } from '@ngrx/store';
// import { authReducer } from '../store/auth.reducer';
// import { provideStore } from '@ngrx/store';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [FormsModule, StoreModule.forRoot({ auth: authReducer })],  // Add other necessary modules here
//       declarations: [LoginComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the Login component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should bind username and password input fields', () => {
//     const emailInput = fixture.nativeElement.querySelector('#emailInput');
//     const passwordInput = fixture.nativeElement.querySelector('#password');

//     // Simulate user input
//     emailInput.value = 'testuser@gmail.com';
//     passwordInput.value = 'password';
//     emailInput.dispatchEvent(new Event('input'));
//     passwordInput.dispatchEvent(new Event('input'));

//     fixture.detectChanges();

//     expect(component.email).toBe('testuser');
//     expect(component.password).toBe('password');
//   });

//   it('should call onLogin method when form is submitted', () => {
//     spyOn(component, 'onLogin');
    
//     const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
//     submitButton.click();

//     fixture.detectChanges();

//     expect(component.onLogin).toHaveBeenCalled();
//   });
// });
