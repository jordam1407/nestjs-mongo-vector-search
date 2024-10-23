import { Injectable } from '@nestjs/common';
import { LoaderService } from './loaders/loader.service';
import { EmbeddingService } from './embeddings/embeddings.service';
import { VectorRepository } from './vectors/vector.repository';
import { InsertChunkData } from './vectors/types';

@Injectable()
export class AppService {
  constructor(
    private readonly loader: LoaderService,
    private readonly embed: EmbeddingService,
    private readonly vectorRepo: VectorRepository,
  ) {}

  async addText(text: string) {
    try {
      const chunks = await this.loader.rawTextLoader(text);

      const vectors = await this.embed.embedDocuments(chunks);

      const toStoreChunks = chunks.map((chunk, index) => {
        return <InsertChunkData>{
          fileId: crypto.randomUUID(),
          pageContent: chunk,
          vector: vectors[index],
        };
      });

      return this.vectorRepo.insertChunks(toStoreChunks);
    } catch (error) {}
  }

  async getText(query: string) {
    const vector = await this.embed.embedQuery(query);

    return await this.vectorRepo.similaritySearch(vector);
  }
}
