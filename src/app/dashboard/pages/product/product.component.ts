import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { PrimengModule } from '../../../primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { Table } from 'primeng/table';
import { Product } from '../../../interfaces';

@Component({
  selector: 'app-product',
  standalone: true,
  providers: [MessageService],
  imports: [PrimengModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styles: `
  
`
})

export class ProductComponent implements OnInit {

  fb = inject(FormBuilder);

  productForm = this.fb.group({
    codigo_barras: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required]],
    precio_venta: [, [Validators.required]],
    cantidad: [0, [Validators.required]],
    color: [''],
    tamano: [''],
    stock_minimo: [0, [Validators.required]],
    tipoProductoId: ['', [Validators.required]]
  }, { validators: this.validateStock('cantidad', 'stock_minimo') });


  updateProductForm = this.fb.group({
    codigo_barras: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required]],
    cantidad: [0, [Validators.required]],
    precio_venta: [, [Validators.required]],
    color: [''],
    tamano: [''],
    stock_minimo: [0, [Validators.required]],
    tipoProductoId: ['', [Validators.required]]
  }, {
    validators: this.validateStock('cantidad', 'stock_minimo')
  })


  products: Product[] = []
  productTypes = []
  productDialogsubmitted = false
  editProductDialogsubmitted = false

  productDialog = false
  editProductDialog = false

  constructor(private productService: ProductService, private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.productService.getTypes().subscribe((data: any) => {
      this.productTypes = data;
    });
    this.productService.getProducts().subscribe((data) => this.products = data)
  }

  @ViewChild('dt2') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openCreateProductModal() {
    this.productDialogsubmitted = false;
    this.productDialog = true;
  }

  openEditProductModal(product: { [index: string]: any }) {
    this.editProductDialog = true;
    this.editProductDialogsubmitted = false;
    this.updateProductForm.patchValue(product);

  }

  hideProductDialog() {
    this.productDialog = false;
    this.productDialogsubmitted = false;
  }

  hideEditProductDialog() {
    this.editProductDialog = false;
    this.editProductDialogsubmitted = false;
  }

  saveProduct() {
    this.productDialogsubmitted = true;

    if (this.productForm.invalid) {
      return;
    }

    this.productService.addProduct(this.productForm.value as any).subscribe({
      next: (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Creado', life: 3000 });
        this.productDialog = false;
        this.productForm.reset();
        this.products.push(data.product);
        this.products = [...this.products];
      }
    })
  }

  editProduct() {
    this.editProductDialogsubmitted = true;

    if (this.updateProductForm.invalid) {
      return;
    }

    const { codigo_barras } = this.updateProductForm.value;

    this.productService.updateProduct(codigo_barras as string, this.updateProductForm.value as any).subscribe({
      next: () => {
        this.editProductDialog = false;
        this.products = this.products.map((product) => {
          if (product.codigo_barras === codigo_barras) {
            return this.updateProductForm.value as any;
          }
          return product;
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Actualizado', life: 3000 });
        this.updateProductForm.reset();
      }
    })
  }


  private validateStock(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const stock = formGroup.get(field1)?.value;
      const stock_minimo = formGroup.get(field2)?.value;

      if (stock_minimo >= stock) {
        formGroup.get(field2)?.setErrors({ stockBigger: true });
        return { stockBigger: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

}
