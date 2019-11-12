import {MigrationInterface, QueryRunner} from "typeorm";

export class testFile1573445893154 implements MigrationInterface {
    name = 'testFile1573445893154'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" text NOT NULL, "author" text NOT NULL, "isbn" character varying(13) NOT NULL, "publishAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "book"`, undefined);
    }

}
