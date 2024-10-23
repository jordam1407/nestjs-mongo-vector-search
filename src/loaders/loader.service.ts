import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

@Injectable()
export class LoaderService {
  constructor() {}
  async rawTextLoader(text: string) {
    const chunker = new RecursiveCharacterTextSplitter({
      chunkSize: 1800, // Max characters per chunk
      chunkOverlap: 200, // Overlapping characters between chunks for context
      separators: ['\n\n'], // Prefer splitting at double newlines (paragraphs)
    });

    const chunks = await chunker.splitText(text);

    return chunks.map((chunk) => this.cleanString(chunk));
  }

  private cleanString(text: string) {
    text = text.replace(/\\/g, '');
    text = text.replace(/#/g, ' ');
    text = text.replace(/\. \./g, '.');
    text = text.replace(/\s\s+/g, ' ');
    text = text.replace(/(\r\n|\n|\r)/gm, ' ');

    return text.trim();
  }
}
