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
        const product = this.findProduct(productID)[0];

        return{...product};
    }
    updateProduct(productID: string, title: string, desc: string, price: number){
        const [product, index] = this.findProduct(productID);
        const newProduct = {...product};
        if (title){
            newProduct.title = title;
        }
        if (desc){
            newProduct.desc = desc;
        }
        if (price){
            newProduct.price = price;
        }
        this.products[index] = newProduct;


    }

        private findProduct(id: string) : [Product, number]{
            const productIndex = this.products.findIndex((prod) => prod.id === id);
            const product = this.products[productIndex];
        if (!product){
            throw new NotFoundException('Product not Found');
        }
        return [product, productIndex ];
        }

        deleteProduct(prodID: string){
            const index = this.findProduct(prodID)[1];
            this.products.splice(index, 1);
        }


    }