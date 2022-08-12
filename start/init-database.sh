#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE DATABASE company;
\c company;
CREATE TABLE IF NOT EXISTS public.companies
(
    company_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    company_id character varying(255) COLLATE pg_catalog."default",
    on_record boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT companies_pkey PRIMARY KEY (company_name)
);
EOSQL
