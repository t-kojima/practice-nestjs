import {MigrationInterface, QueryRunner} from "typeorm";

export class addDescription1573447026372 implements MigrationInterface {
    name = 'addDescription1573447026372'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "book" ADD "description" text DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "description"`, undefined);
    }

}
