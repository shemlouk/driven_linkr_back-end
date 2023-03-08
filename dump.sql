--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2 (Ubuntu 15.2-1.pgdg22.04+1)

-- Started on 2023-03-08 20:29:03 -03

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: linkr_m5ei_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO linkr_m5ei_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16465)
-- Name: hashtags; Type: TABLE; Schema: public; Owner: linkr_m5ei_user
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name text NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT '2023-03-08 23:05:58.140409'::timestamp without time zone NOT NULL
);


ALTER TABLE public.hashtags OWNER TO linkr_m5ei_user;

--
-- TOC entry 216 (class 1259 OID 16464)
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: linkr_m5ei_user
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hashtags_id_seq OWNER TO linkr_m5ei_user;

--
-- TOC entry 3196 (class 0 OID 0)
-- Dependencies: 216
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linkr_m5ei_user
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- TOC entry 225 (class 1259 OID 16510)
-- Name: posts; Type: TABLE; Schema: public; Owner: linkr_m5ei_user
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    description text,
    url text NOT NULL,
    preview_title text NOT NULL,
    preview_desc text NOT NULL,
    preview_img text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT '2023-03-08 23:06:54.746058'::timestamp without time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO linkr_m5ei_user;

--
-- TOC entry 221 (class 1259 OID 16494)
-- Name: posts_hashtags; Type: TABLE; Schema: public; Owner: linkr_m5ei_user
--

CREATE TABLE public.posts_hashtags (
    id integer NOT NULL,
    post_id integer NOT NULL,
    hashtag_id integer NOT NULL
);


ALTER TABLE public.posts_hashtags OWNER TO linkr_m5ei_user;

--
-- TOC entry 220 (class 1259 OID 16493)
-- Name: posts_hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: linkr_m5ei_user
--

CREATE SEQUENCE public.posts_hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_hashtags_id_seq OWNER TO linkr_m5ei_user;

--
-- TOC entry 3197 (class 0 OID 0)
-- Dependencies: 220
-- Name: posts_hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linkr_m5ei_user
--

ALTER SEQUENCE public.posts_hashtags_id_seq OWNED BY public.posts_hashtags.id;


--
-- TOC entry 224 (class 1259 OID 16509)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: linkr_m5ei_user
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO linkr_m5ei_user;

--
-- TOC entry 3198 (class 0 OID 0)
-- Dependencies: 224
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linkr_m5ei_user
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- TOC entry 219 (class 1259 OID 16487)
-- Name: posts_likes; Type: TABLE; Schema: public; Owner: linkr_m5ei_user
--

CREATE TABLE public.posts_likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE public.posts_likes OWNER TO linkr_m5ei_user;

--
-- TOC entry 218 (class 1259 OID 16486)
-- Name: posts_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: linkr_m5ei_user
--

CREATE SEQUENCE public.posts_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_likes_id_seq OWNER TO linkr_m5ei_user;

--
-- TOC entry 3199 (class 0 OID 0)
-- Dependencies: 218
-- Name: posts_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linkr_m5ei_user
--

ALTER SEQUENCE public.posts_likes_id_seq OWNED BY public.posts_likes.id;


--
-- TOC entry 223 (class 1259 OID 16501)
-- Name: sessions; Type: TABLE; Schema: public; Owner: linkr_m5ei_user
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    updated_at timestamp without time zone DEFAULT '2023-03-08 23:06:14.05963'::timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO linkr_m5ei_user;

--
-- TOC entry 222 (class 1259 OID 16500)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: linkr_m5ei_user
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO linkr_m5ei_user;

--
-- TOC entry 3200 (class 0 OID 0)
-- Dependencies: 222
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linkr_m5ei_user
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 215 (class 1259 OID 16453)
-- Name: users; Type: TABLE; Schema: public; Owner: linkr_m5ei_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(60) NOT NULL,
    profile_picture text NOT NULL,
    created_at timestamp without time zone DEFAULT '2023-03-08 23:05:54.471273'::timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO linkr_m5ei_user;

--
-- TOC entry 214 (class 1259 OID 16452)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: linkr_m5ei_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO linkr_m5ei_user;

--
-- TOC entry 3201 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: linkr_m5ei_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3019 (class 2604 OID 16468)
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- TOC entry 3025 (class 2604 OID 16513)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- TOC entry 3022 (class 2604 OID 16497)
-- Name: posts_hashtags id; Type: DEFAULT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_hashtags ALTER COLUMN id SET DEFAULT nextval('public.posts_hashtags_id_seq'::regclass);


--
-- TOC entry 3021 (class 2604 OID 16490)
-- Name: posts_likes id; Type: DEFAULT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_likes ALTER COLUMN id SET DEFAULT nextval('public.posts_likes_id_seq'::regclass);


--
-- TOC entry 3023 (class 2604 OID 16504)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 3017 (class 2604 OID 16456)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3032 (class 2606 OID 16475)
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- TOC entry 3034 (class 2606 OID 16473)
-- Name: hashtags hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pk PRIMARY KEY (id);


--
-- TOC entry 3038 (class 2606 OID 16499)
-- Name: posts_hashtags posts_hashtags_pk; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_hashtags
    ADD CONSTRAINT posts_hashtags_pk PRIMARY KEY (id);


--
-- TOC entry 3036 (class 2606 OID 16492)
-- Name: posts_likes posts_likes_pk; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_likes
    ADD CONSTRAINT posts_likes_pk PRIMARY KEY (id);


--
-- TOC entry 3042 (class 2606 OID 16518)
-- Name: posts posts_pk; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY (id);


--
-- TOC entry 3040 (class 2606 OID 16507)
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- TOC entry 3028 (class 2606 OID 16463)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3030 (class 2606 OID 16461)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 3048 (class 2606 OID 16519)
-- Name: posts posts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3045 (class 2606 OID 16534)
-- Name: posts_hashtags posts_hashtags_fk0; Type: FK CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_hashtags
    ADD CONSTRAINT posts_hashtags_fk0 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 3046 (class 2606 OID 16539)
-- Name: posts_hashtags posts_hashtags_fk1; Type: FK CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_hashtags
    ADD CONSTRAINT posts_hashtags_fk1 FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);


--
-- TOC entry 3043 (class 2606 OID 16524)
-- Name: posts_likes posts_likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_likes
    ADD CONSTRAINT posts_likes_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3044 (class 2606 OID 16529)
-- Name: posts_likes posts_likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.posts_likes
    ADD CONSTRAINT posts_likes_fk1 FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- TOC entry 3047 (class 2606 OID 16544)
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: linkr_m5ei_user
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2061 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO linkr_m5ei_user;


--
-- TOC entry 2063 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO linkr_m5ei_user;


--
-- TOC entry 2062 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO linkr_m5ei_user;


--
-- TOC entry 2060 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO linkr_m5ei_user;


-- Completed on 2023-03-08 20:29:19 -03

--
-- PostgreSQL database dump complete
--

