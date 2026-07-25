--
-- PostgreSQL database dump
--

\restrict WbKD2kHmMTAAfzE6c2JKqPw2UEq49S0QyELBeaK6bK0L5aQ9yFmcDfXAq0U0TZa

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

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
-- Name: bank_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_accounts (
    account_id integer NOT NULL,
    user_id integer NOT NULL,
    account_number bigint DEFAULT (floor((('100000000000'::bigint)::double precision + (random() * ('900000000000'::bigint)::double precision))))::bigint NOT NULL,
    account_type character varying(20) DEFAULT 'SAVINGS'::character varying,
    balance numeric(15,2) DEFAULT 0.00 NOT NULL,
    status character varying(20) DEFAULT 'ACTIVE'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bank_accounts OWNER TO postgres;

--
-- Name: bank_accounts_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bank_accounts_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bank_accounts_account_id_seq OWNER TO postgres;

--
-- Name: bank_accounts_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bank_accounts_account_id_seq OWNED BY public.bank_accounts.account_id;


--
-- Name: beneficiaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.beneficiaries (
    beneficiary_id integer NOT NULL,
    user_id integer NOT NULL,
    beneficiary_name character varying(100) NOT NULL,
    account_number character varying(20) NOT NULL,
    ifsc_code character varying(11) NOT NULL,
    bank_name character varying(100) NOT NULL,
    nickname character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.beneficiaries OWNER TO postgres;

--
-- Name: beneficiaries_beneficiary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.beneficiaries_beneficiary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beneficiaries_beneficiary_id_seq OWNER TO postgres;

--
-- Name: beneficiaries_beneficiary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.beneficiaries_beneficiary_id_seq OWNED BY public.beneficiaries.beneficiary_id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    transaction_id integer NOT NULL,
    sender_account integer NOT NULL,
    receiver_account character varying(20) NOT NULL,
    amount numeric(12,2) NOT NULL,
    transaction_type character varying(20) NOT NULL,
    transaction_status character varying(20) DEFAULT 'SUCCESS'::character varying,
    fraud_score numeric(5,2),
    ai_prediction character varying(20),
    transaction_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_transaction_id_seq OWNER TO postgres;

--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_transaction_id_seq OWNED BY public.transactions.transaction_id;


--
-- Name: bank_accounts account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_accounts ALTER COLUMN account_id SET DEFAULT nextval('public.bank_accounts_account_id_seq'::regclass);


--
-- Name: beneficiaries beneficiary_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficiaries ALTER COLUMN beneficiary_id SET DEFAULT nextval('public.beneficiaries_beneficiary_id_seq'::regclass);


--
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.transactions_transaction_id_seq'::regclass);


--
-- Name: bank_accounts bank_accounts_account_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_accounts
    ADD CONSTRAINT bank_accounts_account_number_key UNIQUE (account_number);


--
-- Name: bank_accounts bank_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_accounts
    ADD CONSTRAINT bank_accounts_pkey PRIMARY KEY (account_id);


--
-- Name: beneficiaries beneficiaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.beneficiaries
    ADD CONSTRAINT beneficiaries_pkey PRIMARY KEY (beneficiary_id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- PostgreSQL database dump complete
--

\unrestrict WbKD2kHmMTAAfzE6c2JKqPw2UEq49S0QyELBeaK6bK0L5aQ9yFmcDfXAq0U0TZa

