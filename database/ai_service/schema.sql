--
-- PostgreSQL database dump
--

\restrict aMmpgsdth4FpvBUa6VfIWTR0NerVNVFCunyouvRuvZAElD9NYVPjaxDfJt8JXOI

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

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.devices (
    device_id integer NOT NULL,
    user_id integer NOT NULL,
    device_uuid uuid DEFAULT gen_random_uuid(),
    device_name character varying(100),
    device_trusted boolean DEFAULT false,
    os character varying(50),
    browser character varying(50),
    last_login timestamp without time zone
);


ALTER TABLE public.devices OWNER TO postgres;

--
-- Name: devices_device_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.devices ALTER COLUMN device_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.devices_device_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: fraud_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fraud_logs (
    fraud_id bigint NOT NULL,
    txn_id bigint,
    reason text,
    severity character varying(20),
    model_version character varying(30),
    reviewed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.fraud_logs OWNER TO postgres;

--
-- Name: fraud_logs_fraud_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fraud_logs ALTER COLUMN fraud_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fraud_logs_fraud_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ip_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ip_history (
    ip_id integer NOT NULL,
    user_id integer NOT NULL,
    ip_address inet,
    country character varying(50),
    city character varying(50),
    ip_risk_score integer,
    location_match boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ip_history_ip_risk_score_check CHECK (((ip_risk_score >= 0) AND (ip_risk_score <= 100)))
);


ALTER TABLE public.ip_history OWNER TO postgres;

--
-- Name: ip_history_ip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ip_history ALTER COLUMN ip_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ip_history_ip_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transactions_ai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions_ai (
    txn_id bigint NOT NULL,
    user_id integer NOT NULL,
    amount numeric(15,2),
    transaction_type character varying(30),
    velocity integer,
    failed_login_count integer,
    hour integer,
    prediction character varying(20),
    fraud_probability numeric(5,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transactions_ai_hour_check CHECK (((hour >= 0) AND (hour <= 23)))
);


ALTER TABLE public.transactions_ai OWNER TO postgres;

--
-- Name: transactions_ai_txn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transactions_ai ALTER COLUMN txn_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transactions_ai_txn_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(120) NOT NULL,
    phone character varying(15),
    account_number character varying(20) NOT NULL,
    account_age_days integer NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (device_id);


--
-- Name: fraud_logs fraud_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fraud_logs
    ADD CONSTRAINT fraud_logs_pkey PRIMARY KEY (fraud_id);


--
-- Name: ip_history ip_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ip_history
    ADD CONSTRAINT ip_history_pkey PRIMARY KEY (ip_id);


--
-- Name: transactions_ai transactions_ai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions_ai
    ADD CONSTRAINT transactions_ai_pkey PRIMARY KEY (txn_id);


--
-- Name: users users_account_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_account_number_key UNIQUE (account_number);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: devices fk_device_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT fk_device_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: fraud_logs fk_fraud_transaction; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fraud_logs
    ADD CONSTRAINT fk_fraud_transaction FOREIGN KEY (txn_id) REFERENCES public.transactions_ai(txn_id);


--
-- Name: ip_history fk_ip_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ip_history
    ADD CONSTRAINT fk_ip_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: transactions_ai fk_transaction_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions_ai
    ADD CONSTRAINT fk_transaction_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

\unrestrict aMmpgsdth4FpvBUa6VfIWTR0NerVNVFCunyouvRuvZAElD9NYVPjaxDfJt8JXOI

