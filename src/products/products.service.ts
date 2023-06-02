import { Injectable } from '@nestjs/common';
import { Product } from '../product.interface';
import * as fs from 'node:fs';

@Injectable()
export class ProductsService {
  private readonly dataFilePath = 'data/products.json';

//méthode qui permet de récupérer l'ensemble des élement de la liste
  private getProducts(): Product[] {
    const data = fs.readFileSync(this.dataFilePath, 'utf8');
    return JSON.parse(data);
  }

//méthode qui va permettre de sauvegarder une liste de produit dans le fichier products.json
  private saveProducts(products: Product[]): void {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(products), 'utf8');
  }

//méthode qui permet d'ajouter un produit dans la liste
  addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
  }

//méthode qui prmet de récuperer l'ensemble des éléments de la liste
  getAllProducts(): Product[] {
    return this.getProducts();
  }

//méthode qui permet de supprimer un élément de la liste
  deleteProduct(productId: string): void {
    let products = this.getProducts();
    let find = products.find((product) => product.id === productId);
    if (find == undefined){
        throw new Error('Parameter is not a number!');
    }
    products = products.filter((product) => product.id !== productId);
    this.saveProducts(products);
  }
}
