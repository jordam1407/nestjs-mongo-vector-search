import { Module } from '@nestjs/common';
import { LoaderService } from './loader.service';

@Module({
  controllers: [],
  providers: [LoaderService],
  exports: [LoaderService],
})
export class LoaderModule {}
