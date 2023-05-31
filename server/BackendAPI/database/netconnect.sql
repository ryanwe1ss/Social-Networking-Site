--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: netconnect; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE netconnect WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_CA.UTF-8';


ALTER DATABASE netconnect OWNER TO postgres;

\connect netconnect

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: date_updated(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.date_updated() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	begin
		NEW.date_updated = CURRENT_TIMESTAMP;
	    RETURN NEW;
	END;
$$;


ALTER FUNCTION public.date_updated() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    username text NOT NULL,
    password text,
    name text,
    email text,
    phone_number text,
    birthdate date,
    gender text,
    status text,
    school text,
    major text,
    bio text,
    is_enabled boolean DEFAULT true NOT NULL,
    is_private boolean DEFAULT false NOT NULL,
    public_messaging boolean DEFAULT false NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: active_chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.active_chats (
    id integer NOT NULL,
    user_one bigint NOT NULL,
    user_two bigint NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.active_chats OWNER TO postgres;

--
-- Name: active_chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.active_chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.active_chats_id_seq OWNER TO postgres;

--
-- Name: active_chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.active_chats_id_seq OWNED BY public.active_chats.id;


--
-- Name: admin_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_accounts (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    monitor_posts_permission boolean DEFAULT false NOT NULL,
    modify_accounts_permission boolean DEFAULT false NOT NULL,
    monitor_reports_permission boolean DEFAULT false NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.admin_accounts OWNER TO postgres;

--
-- Name: admin_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_accounts_id_seq OWNER TO postgres;

--
-- Name: admin_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_accounts_id_seq OWNED BY public.admin_accounts.id;


--
-- Name: blocked; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blocked (
    id integer NOT NULL,
    blocker bigint NOT NULL,
    "user" bigint NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.blocked OWNER TO postgres;

--
-- Name: blocked_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blocked_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blocked_id_seq OWNER TO postgres;

--
-- Name: blocked_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blocked_id_seq OWNED BY public.blocked.id;


--
-- Name: connections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.connections (
    id integer NOT NULL,
    account bigint NOT NULL,
    follower bigint NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.connections OWNER TO postgres;

--
-- Name: connections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.connections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.connections_id_seq OWNER TO postgres;

--
-- Name: connections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.connections_id_seq OWNED BY public.connections.id;


--
-- Name: follow_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.follow_requests (
    id integer NOT NULL,
    follower_id bigint NOT NULL,
    account_id bigint NOT NULL,
    accepted boolean DEFAULT false NOT NULL,
    declined boolean DEFAULT false NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.follow_requests OWNER TO postgres;

--
-- Name: follow_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.follow_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.follow_requests_id_seq OWNER TO postgres;

--
-- Name: follow_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.follow_requests_id_seq OWNED BY public.follow_requests.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    chat_id bigint NOT NULL,
    from_user bigint NOT NULL,
    to_user bigint NOT NULL,
    message text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: post_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_comments (
    id integer NOT NULL,
    post_id bigint NOT NULL,
    commenter bigint NOT NULL,
    comment text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.post_comments OWNER TO postgres;

--
-- Name: post_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_comments_id_seq OWNER TO postgres;

--
-- Name: post_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_comments_id_seq OWNED BY public.post_comments.id;


--
-- Name: post_likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_likes (
    id integer NOT NULL,
    post_id bigint NOT NULL,
    liker bigint NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.post_likes OWNER TO postgres;

--
-- Name: post_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_likes_id_seq OWNER TO postgres;

--
-- Name: post_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_likes_id_seq OWNED BY public.post_likes.id;


--
-- Name: post_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_reports (
    id integer NOT NULL,
    reporter_id bigint NOT NULL,
    reported_id bigint NOT NULL,
    post_id bigint NOT NULL,
    reason bigint DEFAULT 1 NOT NULL,
    additional_information text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.post_reports OWNER TO postgres;

--
-- Name: post_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_reports_id_seq OWNER TO postgres;

--
-- Name: post_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_reports_id_seq OWNED BY public.post_reports.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    creator_id bigint NOT NULL,
    description text,
    comment boolean DEFAULT true NOT NULL,
    "like" boolean DEFAULT true NOT NULL,
    file_path text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: profile_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile_reports (
    id integer NOT NULL,
    reporter_id bigint NOT NULL,
    reported_id bigint NOT NULL,
    message text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.profile_reports OWNER TO postgres;

--
-- Name: report_reasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_reasons (
    id integer NOT NULL,
    reason text
);


ALTER TABLE public.report_reasons OWNER TO postgres;

--
-- Name: report_reason_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_reason_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.report_reason_id_seq OWNER TO postgres;

--
-- Name: report_reason_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_reason_id_seq OWNED BY public.report_reasons.id;


--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.profile_reports.id;


--
-- Name: saved_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_posts (
    id integer NOT NULL,
    post_id bigint NOT NULL,
    saver_id bigint NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.saved_posts OWNER TO postgres;

--
-- Name: saved_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.saved_posts_id_seq OWNER TO postgres;

--
-- Name: saved_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_posts_id_seq OWNED BY public.saved_posts.id;


--
-- Name: statistics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statistics (
    id integer NOT NULL,
    account_id bigint NOT NULL,
    total_logins bigint DEFAULT 0 NOT NULL,
    total_updates bigint DEFAULT 0 NOT NULL,
    total_messages_sent bigint DEFAULT 0 NOT NULL,
    total_posts bigint DEFAULT 0 NOT NULL,
    total_comments bigint DEFAULT 0 NOT NULL,
    total_likes bigint DEFAULT 0 NOT NULL,
    last_login timestamp with time zone,
    last_update timestamp with time zone,
    last_message_sent timestamp with time zone,
    last_post timestamp with time zone,
    last_comment timestamp with time zone,
    last_like timestamp with time zone
);


ALTER TABLE public.statistics OWNER TO postgres;

--
-- Name: statistics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.statistics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statistics_id_seq OWNER TO postgres;

--
-- Name: statistics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.statistics_id_seq OWNED BY public.statistics.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: active_chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.active_chats ALTER COLUMN id SET DEFAULT nextval('public.active_chats_id_seq'::regclass);


--
-- Name: admin_accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_accounts ALTER COLUMN id SET DEFAULT nextval('public.admin_accounts_id_seq'::regclass);


--
-- Name: blocked id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocked ALTER COLUMN id SET DEFAULT nextval('public.blocked_id_seq'::regclass);


--
-- Name: connections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connections ALTER COLUMN id SET DEFAULT nextval('public.connections_id_seq'::regclass);


--
-- Name: follow_requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follow_requests ALTER COLUMN id SET DEFAULT nextval('public.follow_requests_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: post_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments ALTER COLUMN id SET DEFAULT nextval('public.post_comments_id_seq'::regclass);


--
-- Name: post_likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes ALTER COLUMN id SET DEFAULT nextval('public.post_likes_id_seq'::regclass);


--
-- Name: post_reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reports ALTER COLUMN id SET DEFAULT nextval('public.post_reports_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: profile_reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: report_reasons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_reasons ALTER COLUMN id SET DEFAULT nextval('public.report_reason_id_seq'::regclass);


--
-- Name: saved_posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_posts ALTER COLUMN id SET DEFAULT nextval('public.saved_posts_id_seq'::regclass);


--
-- Name: statistics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statistics ALTER COLUMN id SET DEFAULT nextval('public.statistics_id_seq'::regclass);


--
-- Name: accounts accounts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pk PRIMARY KEY (id);


--
-- Name: active_chats active_chats_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.active_chats
    ADD CONSTRAINT active_chats_pk PRIMARY KEY (id);


--
-- Name: connections connections_id_uk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_id_uk UNIQUE (id);


--
-- Name: messages messages_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pk PRIMARY KEY (id);


--
-- Name: posts posts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY (id);


--
-- Name: report_reasons report_reasons_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_reasons
    ADD CONSTRAINT report_reasons_pk PRIMARY KEY (id);


--
-- Name: accounts accounts_date_updated; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER accounts_date_updated BEFORE UPDATE ON public.accounts FOR EACH ROW EXECUTE FUNCTION public.date_updated();


--
-- Name: active_chats active_chats_user_one_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.active_chats
    ADD CONSTRAINT active_chats_user_one_fk FOREIGN KEY (user_one) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: active_chats active_chats_user_two_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.active_chats
    ADD CONSTRAINT active_chats_user_two_fk FOREIGN KEY (user_two) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: blocked blocker_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocked
    ADD CONSTRAINT blocker_fk FOREIGN KEY (blocker) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: connections connections_follower_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_follower_fk FOREIGN KEY (follower) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: connections connections_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connections
    ADD CONSTRAINT connections_user_fk FOREIGN KEY (account) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: follow_requests follow_requests_account_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follow_requests
    ADD CONSTRAINT follow_requests_account_fk FOREIGN KEY (account_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: follow_requests follow_requests_follower_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.follow_requests
    ADD CONSTRAINT follow_requests_follower_fk FOREIGN KEY (follower_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: messages messages_chat_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fk FOREIGN KEY (chat_id) REFERENCES public.active_chats(id) ON DELETE CASCADE;


--
-- Name: messages messages_from_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_from_user_fk FOREIGN KEY (from_user) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: messages messages_to_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_to_user_fk FOREIGN KEY (to_user) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: post_comments post_comments_commenter_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_commenter_fk FOREIGN KEY (commenter) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: post_comments post_comments_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_comments
    ADD CONSTRAINT post_comments_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_likes post_likes_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_likes post_likes_liker_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_liker_fk FOREIGN KEY (liker) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: post_reports post_post_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_post_id_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: post_reports post_reported_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_reported_id_fk FOREIGN KEY (reported_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: post_reports post_reporter_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_reporter_id_fk FOREIGN KEY (reporter_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: post_reports post_reports_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_reports_fk FOREIGN KEY (reason) REFERENCES public.report_reasons(id) ON DELETE CASCADE;


--
-- Name: posts posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk FOREIGN KEY (creator_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: profile_reports reports_reported_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_reports
    ADD CONSTRAINT reports_reported_fk FOREIGN KEY (reported_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: profile_reports reports_reporter_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile_reports
    ADD CONSTRAINT reports_reporter_fk FOREIGN KEY (reporter_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: saved_posts saved_posts_post_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_posts
    ADD CONSTRAINT saved_posts_post_id_fk FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: saved_posts saved_posts_saver_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_posts
    ADD CONSTRAINT saved_posts_saver_id_fk FOREIGN KEY (saver_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: statistics statistics_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_fk FOREIGN KEY (account_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: blocked user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocked
    ADD CONSTRAINT user_fk FOREIGN KEY ("user") REFERENCES public.accounts(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO pg_database_owner;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

