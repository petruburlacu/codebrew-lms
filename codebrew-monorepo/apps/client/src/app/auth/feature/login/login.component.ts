import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../data-access/login.service';
import { LoginFormComponent } from '@codebrew/shared-ui';
import { AuthService } from '../../../shared/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'codebrew-monorepo-login',
  standalone: true,
  providers: [LoginService, AuthService],
  template: `
    <codebrew-monorepo-login-form
      *ngIf="authService?.authUser() === null || authService?.authUser() === undefined"
      [loginStatus]="loginService.status()"
      (login)="loginService.login$.next($event)"
    />
    <div *ngIf="authService?.authUser()">
      <h1 class="bg-red-100">Loading..</h1>
    </div>
    <h1 class="bg-red-400">{{ loginService.status() }}</h1>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LoginFormComponent],
})
export class LoginComponent {
  protected loginService = inject(LoginService);
  protected authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.authUser()) {
        console.log('Redirecting to home');
        this.router.navigate(['home']);
      }
    });
  }
}
