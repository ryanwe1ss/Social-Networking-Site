-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION postgres;

-- DROP SEQUENCE public.accounts_id_seq;

CREATE SEQUENCE public.accounts_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.accounts_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.accounts_id_seq TO postgres;

-- DROP SEQUENCE public.connections_id_seq;

CREATE SEQUENCE public.connections_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.connections_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE public.connections_id_seq TO postgres;

-- DROP SEQUENCE public.connections_id_seq1;

CREATE SEQUENCE public.connections_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.connections_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE public.connections_id_seq1 TO postgres;
-- public.accounts definition

-- Drop table

-- DROP TABLE accounts;

CREATE TABLE accounts (
	id serial4 NOT NULL,
	username varchar NULL,
	"password" varchar NULL,
	"name" varchar NULL,
	email varchar NULL,
	phone_number varchar NULL,
	birthdate date NULL,
	gender varchar NULL,
	status varchar NULL,
	school varchar NULL,
	concentration varchar NULL,
	bio varchar NULL,
	date_created timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	date_updated timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	enabled bool NOT NULL DEFAULT true,
	CONSTRAINT id UNIQUE (id),
	CONSTRAINT username UNIQUE (username)
);

-- Table Triggers

create trigger date_updated before
update
    on
    public.accounts for each row execute function date_updated();

-- Permissions

ALTER TABLE public.accounts OWNER TO postgres;
GRANT ALL ON TABLE public.accounts TO postgres;


-- public.connections definition

-- Drop table

-- DROP TABLE connections;

CREATE TABLE connections (
	id serial4 NOT NULL,
	"user" int8 NOT NULL,
	follower int8 NOT NULL,
	CONSTRAINT follower_fk FOREIGN KEY (follower) REFERENCES accounts(id),
	CONSTRAINT user_fk FOREIGN KEY ("user") REFERENCES accounts(id)
);

-- Permissions

ALTER TABLE public.connections OWNER TO postgres;
GRANT ALL ON TABLE public.connections TO postgres;



CREATE OR REPLACE FUNCTION public.date_updated()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	begin
		NEW.date_updated = CURRENT_TIMESTAMP;
	    RETURN NEW;
	END;
$function$
;

-- Permissions

ALTER FUNCTION public.date_updated() OWNER TO postgres;
GRANT ALL ON FUNCTION public.date_updated() TO public;
GRANT ALL ON FUNCTION public.date_updated() TO postgres;


-- Permissions

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
