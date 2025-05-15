import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService{
   private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodID = Math.random().toString();
        const newProduct = new Product(prodID, title, desc, price);
        this.products.push(newProduct);
        return prodID;
    }

    getProducts(){
        return [...this.products];
    }
    getSingleProd(productID: string){
        const product = this.products.find((prod) => prod.id === productID);
        if (!product){
            throw new NotFoundException('Product not Found');
        }
        return{...product};
    }
}