import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1718691122872 implements MigrationInterface {
    name = 'Init1718691122872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hawk_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "permissions" text, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" character varying, "modify_at" TIMESTAMP NOT NULL DEFAULT now(), "modifier" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "deletor_id" character varying, CONSTRAINT "UQ_c0d54fdb1e44967339001eb47bc" UNIQUE ("name"), CONSTRAINT "PK_5580e5226fdab6f69ed84e8a226" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hawk_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "security_stamp" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" character varying, "modify_at" TIMESTAMP NOT NULL DEFAULT now(), "modifier" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "deletor_id" character varying, CONSTRAINT "UQ_3a8e01f7c0e1d4520a1030afbcc" UNIQUE ("email"), CONSTRAINT "PK_8a4b49505eec82f0e3dacfe10f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hawk_user_roles" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_3082e3ce45358c9548faca4ce9e" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_95cf373a7f108bfe0bdece1b8e" ON "hawk_user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd4b4cc66088d16a3da34f29e4" ON "hawk_user_roles" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "hawk_user_roles" ADD CONSTRAINT "FK_95cf373a7f108bfe0bdece1b8eb" FOREIGN KEY ("userId") REFERENCES "hawk_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hawk_user_roles" ADD CONSTRAINT "FK_cd4b4cc66088d16a3da34f29e4c" FOREIGN KEY ("roleId") REFERENCES "hawk_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hawk_user_roles" DROP CONSTRAINT "FK_cd4b4cc66088d16a3da34f29e4c"`);
        await queryRunner.query(`ALTER TABLE "hawk_user_roles" DROP CONSTRAINT "FK_95cf373a7f108bfe0bdece1b8eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd4b4cc66088d16a3da34f29e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_95cf373a7f108bfe0bdece1b8e"`);
        await queryRunner.query(`DROP TABLE "hawk_user_roles"`);
        await queryRunner.query(`DROP TABLE "hawk_users"`);
        await queryRunner.query(`DROP TABLE "hawk_roles"`);
    }

}
