import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDTO } from '../../dtos';
import { Observable, map } from 'rxjs';
import { Product } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:4000/product';

  constructor(private http: HttpClient) {

  }

  addProduct(data: ProductDTO) {
    return this.http.post(`${this.baseUrl}`, data);
  }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: string, data: ProductDTO) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  getTypes() {
    return this.http.get(`${this.baseUrl}/types`)
      .pipe(
        map((data: any) => data.map((type: any) => ({ label: type.nombre, value: type.id })))
      );
  }

}
