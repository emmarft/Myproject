import { Injectable } from '@nestjs/common';
import { Product } from '../product.interface';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  private readonly dataFilePath = 'data/products.json';

  private getProducts(): Product[] {
    const data = fs.readFileSync(this.dataFilePath, 'utf8');
    return JSON.parse(data);
  }

//méthode qui va permettre de sauvegarder une liste de produit dans le fichier products.json
  private saveProducts(products: Product[]): void {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(products), 'utf8');
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  }

  getAllProducts(): Product[] {
    return this.getProducts();
  }

  deleteProduct(productId: string): void {
    let products = this.getProducts();
    products = products.filter((product) => product.id !== productId);
    this.saveProducts(products);
  }
}
