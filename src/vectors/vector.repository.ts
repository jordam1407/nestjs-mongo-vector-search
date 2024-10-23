import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExtractChunkData, InsertChunkData } from './types';
import { Vector } from './vector.schema';

@Injectable()
export class VectorRepository {
  constructor(
    @InjectModel(Vector.name) private readonly vectorModel: Model<Vector>,
  ) {}

  async insertChunks(chunks: InsertChunkData[]): Promise<number> {
    Logger.debug(JSON.stringify(chunks));
    const insertResult = await this.vectorModel.insertMany(
      chunks.map(({ fileId, pageContent, vector }) => ({
        fileId,
        vector,
        pageContent,
      })),
    );
    return insertResult.length;
  }

  async insertChunk({ fileId, pageContent, vector }: InsertChunkData) {
    return await this.vectorModel.create({
      fileId,
      vector,
      pageContent,
    });
  }

  async similaritySearch(query: number[]): Promise<ExtractChunkData[]> {
    const results = await this.vectorModel.aggregate([
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'vector',
          queryVector: query,
          numCandidates: 100,
          limit: 5,
        },
      },
      {
        $project: {
          _id: 1,
          pageContent: 1,
          fileName: 1,
          fileId: 1,
          score: {
            $meta: 'vectorSearchScore',
          },
        },
      },
    ]);

    return results;
  }

  async getChunkById(chunkId: string) {
    return await this.vectorModel.findById(chunkId);
  }

  async updateChunk(
    chukId: string,
    newChunk: Pick<InsertChunkData, 'pageContent' | 'vector'>,
  ) {
    return await this.vectorModel.findByIdAndUpdate(
      chukId,
      {
        vector: newChunk.vector,
        pageContent: newChunk.pageContent,
      },
      { new: true, runValidators: true },
    );
  }

  async deleteByFileId(fileId: string): Promise<boolean> {
    const result = await this.vectorModel.deleteMany({ fileId: fileId });
    return result.deletedCount > 0;
  }
}
