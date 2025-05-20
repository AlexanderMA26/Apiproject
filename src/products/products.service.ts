import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";
import{InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";

@Injectable()
export class ProductsService{

   constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, desc: string, price: number) {
        const prodID = Math.random().toString();
        const newProduct = new this.productModel({title, description: desc, price});
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getProducts(){
        const products = await this.productModel.find().exec();
        
        return products.map((prod) => ({id: prod.id, title: prod.title, description: prod.desc, price: prod.price}));
    }
    async getSingleProd(productID: string){
        const product = await this.findProduct(productID);

        return {id: product.id, title: product.title, description: product.desc, price: product.price};
    }
    async updateProduct(productID: string, title: string, desc: string, price: number){
        const updateProduct = await this.findProduct(productID);
    
        if (title){
            updateProduct.title = title;
        }
        if (desc){
            updateProduct.desc = desc;
        }
        if (price){
            updateProduct.price = price;
        }
        updateProduct.save();
    }

        private async findProduct(id: string) : Promise<Product>{
            let product;
            try{
            product = await this.productModel.findById(id).exec();
            } catch(error){
                throw new NotFoundException('Product not Found');
            }
        if (!product){
            throw new NotFoundException('Product not Found');
        }
        return product;
        }

        async deleteProduct(prodID: string){
            const result = await this.productModel.deleteOne({_id: prodID}).exec();
            console.log(result);
        }


    }