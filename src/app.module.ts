import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducstModule } from './products/products.module';

@Module({
  imports: [ProducstModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
