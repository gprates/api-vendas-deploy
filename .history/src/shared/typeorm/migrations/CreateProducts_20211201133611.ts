import { doesNotThrow } from "assert";
import { query } from "express";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [{

            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}

