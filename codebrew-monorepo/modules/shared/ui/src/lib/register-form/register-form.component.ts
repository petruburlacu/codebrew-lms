import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'codebrew-monorepo-register-form',
  standalone: true,
  imports: [CommonModule],
  template: `<p>register-form works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  constructor() {
    console.log('RegisterFormComponent');
  }
}
