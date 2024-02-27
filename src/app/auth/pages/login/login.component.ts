import { Component, inject } from '@angular/core';


import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '../../../dtos';
import { PrimengModule } from '../../../primeng/primeng.module';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [MessageService],
  imports: [PrimengModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  fb = inject(FormBuilder);
  router = inject(Router)

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });


  constructor(private authService: AuthService, private messageService: MessageService) {

  }



  login() {
    this.authService.login(this.loginForm.value as LoginDTO).subscribe(
      {
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
        }
      }
    )
  }

}
