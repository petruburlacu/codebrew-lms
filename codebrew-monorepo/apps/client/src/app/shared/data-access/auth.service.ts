import { ChangeDetectorRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import { User } from '@codebrew/shared-ui';
import {
  BehaviorSubject,
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  mergeMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export type AuthUser = User | null | undefined;

export const AUTH_URL = Constants.API_URL + '/auth';

@Injectable()
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private redirectUrl = '/';
  private redirectParams = null;

   private currentUser$: Subject<AuthUser> = new BehaviorSubject<AuthUser>(null);

  authUser = signal<AuthUser>(undefined);

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.currentUser$
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged(),
        // mergeMap(() => this.checkCookie()), //TODO: add with angular universal back-end
      ).subscribe((user) => this.authUser.set(user));
  }

  private checkCookie(): Observable<any> {
    return this.http
      .get<User>(`${AUTH_URL}/isAuthenticated`, { withCredentials: true })
      .pipe(tap((user) => this.updateCurrentUser(user)));
  }

  updateCurrentUser(user: AuthUser) {
    this.currentUser$.next(user);
    // this.checkAuthRedirect();
  }

  checkAuthRedirect() {
    if (this.redirectParams) {
      this.router.navigate([this.redirectUrl, this.redirectParams]);
    } else {
      this.router.navigate([this.redirectUrl]);
    }
    this.redirectParams = null;
    this.redirectUrl = '/';
  }

  logout() {
    console.log('logout'); // clear cookie
  }
}
