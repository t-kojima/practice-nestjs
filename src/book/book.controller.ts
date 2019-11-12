import { Controller, Get } from '@nestjs/common';
import { IBook } from './book.interface'
import { BookService } from './book.service'

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<IBook[]> {
    return this.bookService.findAll();
  }
}
