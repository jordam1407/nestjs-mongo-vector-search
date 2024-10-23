import { Module } from '@nestjs/common';
import { EmbeddingService } from './embeddings.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EmbeddingService],
  exports: [EmbeddingService],
})
export class EmbeddingModule {}
