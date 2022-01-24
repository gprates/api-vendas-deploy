import { doesNotThrow } from "assert";
import { query } from "express";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate-v4()',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}

