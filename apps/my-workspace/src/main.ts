import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './app/auth/store/auth.reducer';
import { AuthEffects } from './app/auth/store/auth.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes), // Routes
    provideHttpClient(), // HttpClient support
    importProvidersFrom(FormsModule), // Enable FormsModule for ngModel
    provideStore({ auth: authReducer }), // NgRx store
    provideEffects([AuthEffects]), // NgRx effects
    provideStoreDevtools({ maxAge: 25 }), // NgRx store devtools
  ],
}).catch(err => console.error(err));
