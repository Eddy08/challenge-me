-- Table: public.companies

-- DROP TABLE IF EXISTS public.companies;
SELECT 'CREATE DATABASE mydb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mydb')\gexec
CREATE TABLE IF NOT EXISTS public.companies
(
    company_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    company_id character varying(255) COLLATE pg_catalog."default",
    on_record boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT companies_pkey PRIMARY KEY (company_name)
)

TABLESPACE pg_default;