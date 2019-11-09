import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/book'
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'posgre',
      database: 'practice-nestjs',
      entities: [Book],
      synchronize: true,
    }),
    BookModule,
  ],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {}
