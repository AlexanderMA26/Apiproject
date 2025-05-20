import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}
    @Post()
    async addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number) {
        
        const generatedID = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedID};
    }

    @Get()
    async getAllProducts(){
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.productsService.getSingleProd(prodID);
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodID: string, @Body ('title') prodTitle: string, @Body ('description') prodDesc: string, @Body ('price') prodPrice: number){
       await this.productsService.updateProduct(prodID, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodID: string,){
        await this.productsService.deleteProduct(prodID);
        return null;
    }
}