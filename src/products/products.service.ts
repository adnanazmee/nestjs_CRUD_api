import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  fetchAllProducts() {
    return [...this.products]; // this returns a new array, not the pointer
  }

  fetchSingleProduct(productId: string) {
    const product = this.productFinder(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.productFinder(productId); // destructuring
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(productId: string) {
    const index = this.productFinder(productId)[1];
    this.products.splice(index, 1);
  }

  private productFinder(id: string): [Product, number] {
    // returns a tuple with 2 elements
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('No product found for the provided id');
    }
    return [product, productIndex];
  }
}
