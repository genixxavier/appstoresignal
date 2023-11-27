import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { IProduct } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export default class ProductDetailComponent {
  @Input() id?: string;
  private produtService = inject(ProductService);
  private cartService = inject(CartService);
  product = signal<IProduct | null>(null);
  cover = signal('');

  ngOnInit(): void {
    console.log('Input', this.id);
    if (this.id) {
      this.getProductDetail(this.id);
    }
  }

  getProductDetail(id: string) {
    this.produtService.getProductDetail(id).subscribe({
      next: (product) => {
        console.log(product);
        this.product.set(product);
        if (product.images.length) {
          this.cover.set(product.images[0]);
        }
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  changeCover(image: string) {
    this.cover.set(image);
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
