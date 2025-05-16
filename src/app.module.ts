import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://HTXue:TeddyChoe@productscluster.aeogqce.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
