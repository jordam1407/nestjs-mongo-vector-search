import { OpenAIEmbeddings } from '@langchain/openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbeddingService {
  private model: OpenAIEmbeddings;

  constructor() {
    this.model = new OpenAIEmbeddings({
      modelName: 'text-embedding-3-small',
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    return this.model.embedDocuments(texts);
  }

  async embedQuery(text: string): Promise<number[]> {
    return this.model.embedQuery(text);
  }
}
