toc.dat                                                                                             0000600 0004000 0002000 00000002435 14716663526 0014463 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                       
    |         
   TampereSQL    15.2    15.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    51794 
   TampereSQL    DATABASE     �   CREATE DATABASE "TampereSQL" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Finnish_Finland.1252';
    DROP DATABASE "TampereSQL";
                postgres    false         �            1259    51795    flowers    TABLE     |   CREATE TABLE public.flowers (
    id integer,
    name character varying,
    price character varying,
    stock integer
);
    DROP TABLE public.flowers;
       public         heap    postgres    false         �          0    51795    flowers 
   TABLE DATA           9   COPY public.flowers (id, name, price, stock) FROM stdin;
    public          postgres    false    214       3314.dat                                                                                                                                                                                                                                   3314.dat                                                                                            0000600 0004000 0002000 00000000136 14716663526 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Snake plant	22e	5
3	Orchid	40e	10
4	Cactus	13e	3
6	Aloevera	23e	5
7	Spider plant	10e	9
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                  restore.sql                                                                                         0000600 0004000 0002000 00000003432 14716663526 0015406 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

DROP DATABASE "TampereSQL";
--
-- Name: TampereSQL; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "TampereSQL" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Finnish_Finland.1252';


ALTER DATABASE "TampereSQL" OWNER TO postgres;

\connect "TampereSQL"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: flowers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flowers (
    id integer,
    name character varying,
    price character varying,
    stock integer
);


ALTER TABLE public.flowers OWNER TO postgres;

--
-- Data for Name: flowers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flowers (id, name, price, stock) FROM stdin;
\.
COPY public.flowers (id, name, price, stock) FROM '$$PATH$$/3314.dat';

--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      