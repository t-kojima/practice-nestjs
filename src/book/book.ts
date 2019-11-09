import { IBook } from './book.interface';

export class Book implements IBook {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publishAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
