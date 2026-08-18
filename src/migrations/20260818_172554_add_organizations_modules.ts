import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_modules_icon" AS ENUM('Rocket', 'Target', 'Zap', 'Users', 'BarChart', 'Brain', 'Code', 'Megaphone', 'TrendingUp', 'ShoppingCart', 'Layers', 'Compass', 'Lightbulb', 'Puzzle', 'ShieldCheck', 'Workflow');
  CREATE TABLE "modules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_modules_icon" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organizations_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "organizations_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"outcome" varchar NOT NULL
  );
  
  CREATE TABLE "organizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"sector" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"situation" varchar NOT NULL,
  	"pathway_code" varchar NOT NULL,
  	"pathway_name" varchar NOT NULL,
  	"pathway_shape" varchar NOT NULL,
  	"pathway_why" varchar NOT NULL,
  	"proof_id" integer NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organizations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"modules_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "modules_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "organizations_id" integer;
  ALTER TABLE "organizations_pillars" ADD CONSTRAINT "organizations_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_outcomes" ADD CONSTRAINT "organizations_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_proof_id_case_studies_id_fk" FOREIGN KEY ("proof_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_modules_fk" FOREIGN KEY ("modules_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "modules_updated_at_idx" ON "modules" USING btree ("updated_at");
  CREATE INDEX "modules_created_at_idx" ON "modules" USING btree ("created_at");
  CREATE INDEX "organizations_pillars_order_idx" ON "organizations_pillars" USING btree ("_order");
  CREATE INDEX "organizations_pillars_parent_id_idx" ON "organizations_pillars" USING btree ("_parent_id");
  CREATE INDEX "organizations_outcomes_order_idx" ON "organizations_outcomes" USING btree ("_order");
  CREATE INDEX "organizations_outcomes_parent_id_idx" ON "organizations_outcomes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "organizations_slug_idx" ON "organizations" USING btree ("slug");
  CREATE INDEX "organizations_proof_idx" ON "organizations" USING btree ("proof_id");
  CREATE INDEX "organizations_updated_at_idx" ON "organizations" USING btree ("updated_at");
  CREATE INDEX "organizations_created_at_idx" ON "organizations" USING btree ("created_at");
  CREATE INDEX "organizations_rels_order_idx" ON "organizations_rels" USING btree ("order");
  CREATE INDEX "organizations_rels_parent_idx" ON "organizations_rels" USING btree ("parent_id");
  CREATE INDEX "organizations_rels_path_idx" ON "organizations_rels" USING btree ("path");
  CREATE INDEX "organizations_rels_modules_id_idx" ON "organizations_rels" USING btree ("modules_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_modules_fk" FOREIGN KEY ("modules_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_modules_id_idx" ON "payload_locked_documents_rels" USING btree ("modules_id");
  CREATE INDEX "payload_locked_documents_rels_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("organizations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations_pillars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "organizations_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "modules" CASCADE;
  DROP TABLE "organizations_pillars" CASCADE;
  DROP TABLE "organizations_outcomes" CASCADE;
  DROP TABLE "organizations" CASCADE;
  DROP TABLE "organizations_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_modules_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_organizations_fk";
  
  DROP INDEX "payload_locked_documents_rels_modules_id_idx";
  DROP INDEX "payload_locked_documents_rels_organizations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "modules_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "organizations_id";
  DROP TYPE "public"."enum_modules_icon";`)
}
