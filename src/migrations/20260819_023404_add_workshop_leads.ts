import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "workshop_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"whatsapp" varchar NOT NULL,
  	"need" varchar,
  	"spend" varchar,
  	"consent" boolean DEFAULT false NOT NULL,
  	"emailed" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "workshop_leads_id" integer;
  CREATE INDEX "workshop_leads_updated_at_idx" ON "workshop_leads" USING btree ("updated_at");
  CREATE INDEX "workshop_leads_created_at_idx" ON "workshop_leads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_workshop_leads_fk" FOREIGN KEY ("workshop_leads_id") REFERENCES "public"."workshop_leads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_workshop_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("workshop_leads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshop_leads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "workshop_leads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_workshop_leads_fk";
  
  DROP INDEX "payload_locked_documents_rels_workshop_leads_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "workshop_leads_id";`)
}
