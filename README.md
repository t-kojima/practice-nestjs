# practice-nestjs

## Installation

CLI インストール

```
$ npm install -g @nestjs/cli
```

プロジェクトの作成

```
nest new practice-nestjs
cd practice-nestjs
yarn install
```

```
nodenv local 10.15.3 # node v8だと動かなかった
```

とりあえず動かす

```
yarn start
# localhost:3000で立ち上がる
```

## Book エンティティを作る

### インターフェース

```sh
nest g interface Book/Book

# CREATE /src/book/book.interface.ts (25 bytes)
```

```ts
export interface Book {}
// 空のインターフェースができるので中身を詰める
// ※Bookが生成されるので、IBookに直す
```

### エンティティ

```sh
nest g class Book/Book

# CREATE /src/book/book.spec.ts (139 bytes)
# CREATE /src/book/book.ts (21 bytes)
```

### コントローラ

```sh
nest g controller Book

# CREATE /src/books/books.controller.spec.ts (486 bytes)
# CREATE /src/books/books.controller.ts (99 bytes)
# UPDATE /src/app.module.ts (463 bytes)
```

コントローラが生成されて、`app.module.ts`に参照が追加される

とりあえずアクセスすると文字だけ返すようにしとく
あと流儀？なのかわからないが、コントローラを`books`,モデルを`book`にはならないよう
でも気持ち悪いのでパスだけは`books`にしとく

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BookController {
  @Get()
  findAll(): string {
    return 'This action returns all books';
  }
}
```

ここまでで`yarn start`して、`localhost:3000/books`にアクセスすると上の文字が出る。

## TypeORM をやる

https://docs.nestjs.com/techniques/database
やるぞ

```sh
yarn add @nestjs/typeorm typeorm pg
```

`app.module.ts`の`imports`に`TypeOrmModule`をぶちこむ
後々 env で切り替えたいが、とりあえずベタ書き

```ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'posgre',
      database: 'practice-nestjs',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {}
```

`ormconfig.json`を作ってそこに書いてもよいらしい
その場合は環境切り替えはどうすべきか？ :thinking:

追記）切り替える場合
https://docs.nestjs.com/techniques/database#multiple-databases

### Book エンティティをデコレーションする

Entity,Column などでデコレーションすると TypeORM が認識してくれるっぽい
Column の引数に何をやればいいかはよくわからん

```ts
import { IBook } from './book.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book implements IBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  author: string;

  @Column({ length: 13 })
  isbn: string;

  @Column()
  publishAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

`app.module.ts`でエンティティを登録する

```ts
import { Book } from './book/book'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'posgre',
      database: 'practice-nestjs',
      entities: [Book], // ここやで
      synchronize: true,
    }),
  ],
```

何個かだけならこれでいいけど、何十個のエンティティを登録する場合は glob で指定したほうがよいかも
`ex) "entities": ["dist/**/*.entity{.ts,.js}"],`

### モジュールとサービスを作る

唐突にモジュールとサービスを求められた（チュートリアルで）
ので作る

```sh
nest g module Book
CREATE /src/book/book.module.ts (81 bytes)
UPDATE /src/app.module.ts (715 bytes)

nest g service Book
CREATE /src/book/book.service.spec.ts (446 bytes)
CREATE /src/book/book.service.ts (88 bytes)
UPDATE /src/book/book.module.ts (155 bytes)
```

そうするとコントローラも Book モジュールにあった方がいいので移動する

/src/book/book.module.ts

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
```

/src/book/book.service.ts

```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }
}
```

`Repository#find`は用意されているのだろうか？それっぽい
自分でカスタマイズもできそう
https://docs.nestjs.com/techniques/database#custom-repository

# Reference

- https://docs.nestjs.com
- https://qiita.com/kmatae/items/5aacc8375f71105ce0e4
- https://minase-program.hatenablog.com/entry/2019/06/07/224619
- https://qiita.com/yuukive/items/0655f4d88187b65a8520
