import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure, signup, signupSuccess, signupFailure } from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(action =>
        this.authService.signup(action.username, action.password, action.email, action.phone).pipe(
          map(user => signupSuccess({ user })),
          catchError(error => of(signupFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
