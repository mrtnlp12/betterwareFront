import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimengModule } from '../../../primeng/primeng.module';
import { Table } from 'primeng/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Product } from '../../../interfaces';
import { SaleDTO } from '../../../dtos';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-sale',
  standalone: true,
  providers: [MessageService],
  imports: [PrimengModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sale.component.html',
  styles: ``
})
export class SaleComponent implements OnInit {

  sales: any[] = [];


  products: Product[] = [];
  newSale: SaleDTO | null = null;


  constructor() {
  }
  ngOnInit(): void {
    
  }


  @ViewChild('dt2') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}