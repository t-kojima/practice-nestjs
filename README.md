# practice-nestjs

## Installation

CLIインストール

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

## Bookエンティティを作る

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

# Reference

- https://docs.nestjs.com
- https://qiita.com/kmatae/items/5aacc8375f71105ce0e4
- https://minase-program.hatenablog.com/entry/2019/06/07/224619
