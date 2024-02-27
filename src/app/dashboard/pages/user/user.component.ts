import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { PrimengModule } from '../../../primeng/primeng.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { User } from '../../../interfaces';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-product',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [PrimengModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styles: `
  
`
})

export class UserComponent implements OnInit {

  fb = inject(FormBuilder);

  addUserForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', [Validators.required]],
  });


  updateUserForm = this.fb.group({
    id: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', [Validators.required]],
  })


  users: User[] = []
  roles = [
    { name: 'Administrador', code: 'admin' },
    { name: 'Usuario', code: 'user' },

  ]

  addUserDialogSubmitted = false
  updateUserDialogSubmitted = false

  addUserDialog = false
  updateUserDialog = false

  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => this.users = data);
  }

  @ViewChild('dt2') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openAddUserModal() {
    this.addUserDialogSubmitted = false;
    this.addUserDialog = true;
  }

  openUpdateUserModal(user: { [index: string]: any }) {
    this.updateUserDialog = true;
    this.updateUserDialogSubmitted = false;
    this.updateUserForm.patchValue(user);
  }

  hideAddUserDialog() {
    this.addUserDialog = false;
    this.addUserDialogSubmitted = false;
  }

  hideUpdateUserDialog() {
    this.updateUserDialog = false;
    this.updateUserDialogSubmitted = false;
  }

  addUser() {
    this.addUserDialogSubmitted = true;

    if (this.addUserForm.invalid) {
      return;
    }

    this.userService.addUser(this.addUserForm.value as any).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Creado', life: 3000 });
        this.addUserDialog = false;
        this.addUserForm.reset();

        const { id, username, password, role } = data.user;

        this.users.push({ id, username, password, role });
        this.users = [...this.users];
      }
    })
  }

  updateUser() {
    this.updateUserDialogSubmitted = true;

    if (this.updateUserForm.invalid) {
      return;
    }

    const { id } = this.updateUserForm.value;

    this.userService.updateUser(id as string, this.updateUserForm.value as any).subscribe({
      next: () => {
        this.updateUserDialog = false;
        this.users = this.users.map((user) => {
          if (user.id === id) {
            return this.updateUserForm.value as any;
          }
          return user;
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Actualizado', life: 3000 });
        this.updateUserForm.reset();
      }
    })
  }

}
