import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Register routes
    provideStore({ auth: authReducer }), // Provide NgRx store
    provideEffects([AuthEffects]), // Provide NgRx effects
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom(FormsModule), // Add FormsModule
  ],
};
