import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProductCategory } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  constructor() {}

  getCategories() {
    return this.http.get<IProductCategory[]>(
      'https://api.escuelajs.co/api/v1/categories'
    );
  }
}
