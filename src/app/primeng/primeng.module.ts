import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  exports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    TableModule,
    RippleModule,
    MenubarModule,
    PasswordModule,
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    DataViewModule
  ],
})
export class PrimengModule { }
