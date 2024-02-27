import { Component, OnInit, inject } from '@angular/core';
import { PrimengModule } from '../../../../primeng/primeng.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleDTO } from '../../../../dtos';
import { ProductService } from '../../../../shared/services/product.service';
import { Product } from '../../../../interfaces';

@Component({
  selector: 'app-new-sale',
  standalone: true,
  imports: [PrimengModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-sale.component.html',
  styles: ``
})
export class NewSaleComponent implements OnInit {

  barCodeControl: FormControl = new FormControl('');
  newSale: SaleDTO | null = null;
  productService = inject(ProductService)
  products: Product[] = [];
  showPayDialog: boolean = false;

  moneyReceived: number | null = null;



  constructor() { }


  get change() {
    if (this.moneyReceived === null || this.newSale === null) return 0;
    return this.moneyReceived - this.newSale!.total;

  }

  ngOnInit() {
    this.initSale();
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }


  addUnits(id_producto: string) {

    const product = this.newSale!.productos.find((p) => p.id_producto === id_producto)!;

    product.cantidad += 1;

    this.newSale!.total += product.precio;
  }
  showDialog() {
    this.showPayDialog = true;
  }

  decreaseUnits(id_producto: string) {
    const product = this.newSale!.productos.find((p) => p.id_producto === id_producto);
    if (product!.cantidad > 1) {
      product!.cantidad -= 1;
    }
    else {
      this.newSale!.productos = this.newSale!.productos.filter((p) => p.id_producto !== id_producto);
    }
    this.newSale!.total -= product!.precio;
  }

  get totalSale() {
    return this.newSale?.total;
  }

  addProductToSale() {
    const product = this.products.find((product) => product.codigo_barras === this.barCodeControl.value);
    if (!product) return;

    if (!this.newSale) {
      this.initSale();
    }

    if (this.newSale?.productos.some((p) => p.id_producto === product.codigo_barras)) {
      const productIndex = this.newSale.productos.findIndex((p) => p.id_producto === product.codigo_barras);
      this.newSale.productos[productIndex].cantidad += 1;
      this.newSale.total += product.precio;
      return;

    }

    const newProduct = {
      id_producto: product.codigo_barras,
      cantidad: 1,
      nombre: product.nombre,
      precio: product.precio
    }

    this.newSale!.productos = [...this.newSale!.productos, newProduct];

    this.newSale!.total += product.precio;

  }

  initSale() {
    this.newSale = {
      fecha: new Date(),
      total: 0,
      productos: []
    }
  }



}
