--
-- PostgreSQL database dump
--

\restrict XZDCgUu6k8CLX1Fa3B9qldpkMgrEpL0p8CTAO07MeOYi6M5LtI7Ej36S4hLyXq1

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
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Aryan', 'Mankar', 'aryan@gmail.com', '9876543210', '$2a$hash1', '2026-07-25 18:45:08.051864', 'ACTIVE');
INSERT INTO public.users VALUES (2, 'Yash', 'Baviskar', 'yash@gmail.com', '9876543211', '$2a$hash2', '2026-07-25 18:45:08.051864', 'ACTIVE');
INSERT INTO public.users VALUES (3, 'Eeshan', 'Patil', 'eeshan@gmail.com', '9876543212', '$2a$hash3', '2026-07-25 18:45:08.051864', 'ACTIVE');
INSERT INTO public.users VALUES (4, 'Vivek', 'Sharma', 'vivek@gmail.com', '9876543213', '$2a$hash4', '2026-07-25 18:45:08.051864', 'ACTIVE');
INSERT INTO public.users VALUES (5, 'Ruturaj', 'Patil', 'ruturaj@gmail.com', '9876543214', '$2a$hash5', '2026-07-25 18:45:08.051864', 'ACTIVE');


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_sessions VALUES (1, 1, 'jwt_token_1', '2026-07-25 18:46:06.474157', '2026-07-26 18:46:06.474157', 'Windows Chrome', '192.168.1.2');
INSERT INTO public.user_sessions VALUES (2, 2, 'jwt_token_2', '2026-07-25 18:46:06.474157', '2026-07-26 18:46:06.474157', 'Ubuntu Firefox', '192.168.1.3');


--
-- Name: user_sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_sessions_session_id_seq', 2, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

\unrestrict XZDCgUu6k8CLX1Fa3B9qldpkMgrEpL0p8CTAO07MeOYi6M5LtI7Ej36S4hLyXq1

