import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '@codebrew/shared-ui';
import { RegisterService } from '../../data-access/register.service';

@Component({
  selector: 'codebrew-monorepo-register',
  standalone: true,
  imports: [
    CommonModule, 
    RegisterFormComponent
  ],
  providers: [RegisterService],
  template: `
  <h2>register works!</h2>
  <codebrew-monorepo-register-form></codebrew-monorepo-register-form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private service = inject(RegisterService)
  constructor() {
    console.log('RegisterComponent');
    this.service.get();
  }

}
