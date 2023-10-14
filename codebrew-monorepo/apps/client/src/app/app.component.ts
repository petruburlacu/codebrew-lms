import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'codebrew-monorepo-root',
  template: `
    <codebrew-monorepo-nx-welcome></codebrew-monorepo-nx-welcome>
    <div class="bg-blue-500 p-4">
      <h1 class="text-white">Welcome to LMS</h1>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'client';
}
