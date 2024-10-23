import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoaderModule } from './loaders/loader.module';
import { EmbeddingModule } from './embeddings/embeddings.module';
import { MongoModule } from './config/database/mongo.module';
import { VectorModule } from './vectors/vector.module';

@Module({
  imports: [MongoModule, LoaderModule, EmbeddingModule, VectorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
