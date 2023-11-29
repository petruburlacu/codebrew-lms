import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { EMPTY, Subject, catchError, defer, from, map, mergeMap, switchMap, tap } from 'rxjs';
import { AuthService, AuthUser } from '../../shared/data-access/auth.service';
import { Credentials, LoginStatus } from '@codebrew/shared-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface LoginState {
  status: LoginStatus;
}

@Injectable()
export class LoginService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  // sources
  error$ = new Subject<unknown>();
  login$ = new Subject<Credentials>();

  // state
  private state = signal<LoginState>({ status: 'pending' });
  status = computed(() => this.state().status);

  userAuthenticated$ = this.login$.pipe(
    mergeMap((credentials) => this.signInWithEmailAndPassword(credentials)),
    tap((user) => this.authService.updateCurrentUser(user)),
    catchError((error) => {
      this.error$.next(error);
      return EMPTY;
    })
  );

  constructor() {
    this.userAuthenticated$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, status: 'success' })));

    this.login$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, status: 'authenticating' })));

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.state.update((state) => ({ ...state, status: 'error' })));
  }

  private signInWithEmailAndPassword(credentials: Credentials) {
    const details = {
      identifier: credentials.email,
      password: credentials.password
    };
    return this.http.post<AuthUser>(
      'http://localhost:1337/api/auth/local',
      details,
    ).pipe(
      map((response: any) => response?.user)
    )
  }
}
