--
-- PostgreSQL database dump
--

-- Dumped from database version 11.22 (Debian 11.22-0+deb10u2)
-- Dumped by pg_dump version 17.0

-- Started on 2025-07-30 14:17:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

--
-- TOC entry 197 (class 1259 OID 331842)
-- Name: enterprise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enterprise (
    id integer NOT NULL,
    address character varying(255),
    email character varying(255),
    name character varying(255),
    phonenumber character varying(255),
    active boolean DEFAULT true
);


--
-- TOC entry 196 (class 1259 OID 331840)
-- Name: enterprise_ent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.enterprise_ent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2984 (class 0 OID 0)
-- Dependencies: 196
-- Name: enterprise_ent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.enterprise_ent_id_seq OWNED BY public.enterprise.id;


--
-- TOC entry 207 (class 1259 OID 332414)
-- Name: inscriptions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inscriptions (
    id bigint NOT NULL,
    offerid integer,
    userid integer,
    inscriptiondate date DEFAULT CURRENT_DATE,
    status character varying(50) DEFAULT 'pendiente'::character varying,
    CONSTRAINT chk_status_valores CHECK (((status)::text = ANY ((ARRAY['pendiente'::character varying, 'aceptado'::character varying, 'rechazado'::character varying])::text[])))
);


--
-- TOC entry 206 (class 1259 OID 332412)
-- Name: inscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inscriptions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2985 (class 0 OID 0)
-- Dependencies: 206
-- Name: inscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inscriptions_id_seq OWNED BY public.inscriptions.id;


--
-- TOC entry 205 (class 1259 OID 331938)
-- Name: offers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.offers (
    id integer NOT NULL,
    enterpriseid integer NOT NULL,
    title character varying(255),
    description text,
    publicationdate date DEFAULT CURRENT_DATE,
    active boolean DEFAULT true,
    requirements text,
    modality text,
    linkedin text,
    conditions text
);


--
-- TOC entry 204 (class 1259 OID 331936)
-- Name: offers_off_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.offers_off_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2986 (class 0 OID 0)
-- Dependencies: 204
-- Name: offers_off_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.offers_off_id_seq OWNED BY public.offers.id;


--
-- TOC entry 199 (class 1259 OID 331853)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    roledescription character varying(255) NOT NULL,
    rolename character varying(255) NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 331851)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2987 (class 0 OID 0)
-- Dependencies: 198
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 201 (class 1259 OID 331864)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id bigint NOT NULL,
    roleid bigint,
    userid integer
);


--
-- TOC entry 200 (class 1259 OID 331862)
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2988 (class 0 OID 0)
-- Dependencies: 200
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- TOC entry 203 (class 1259 OID 331872)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255),
    name character varying(255),
    phonenumber character varying(255),
    password character varying(255),
    surname1 character varying(255),
    surname2 character varying(255),
    enterpriseid integer,
    email character varying,
    degree character varying(255),
    experience character varying(255),
    modality character varying(255),
    presentation text,
    github character varying(255),
    linkedin character varying(255),
    laboral text
);


--
-- TOC entry 202 (class 1259 OID 331870)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2989 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2809 (class 2604 OID 331845)
-- Name: enterprise id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enterprise ALTER COLUMN id SET DEFAULT nextval('public.enterprise_ent_id_seq'::regclass);


--
-- TOC entry 2817 (class 2604 OID 332417)
-- Name: inscriptions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscriptions ALTER COLUMN id SET DEFAULT nextval('public.inscriptions_id_seq'::regclass);


--
-- TOC entry 2814 (class 2604 OID 331941)
-- Name: offers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers ALTER COLUMN id SET DEFAULT nextval('public.offers_off_id_seq'::regclass);


--
-- TOC entry 2811 (class 2604 OID 331856)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 2812 (class 2604 OID 331867)
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- TOC entry 2813 (class 2604 OID 331875)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2968 (class 0 OID 331842)
-- Dependencies: 197
-- Data for Name: enterprise; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.enterprise VALUES (50, '99 Hacker Campus, NightSky District, Paldea 10465', 'hello@starware.edu', 'Starware Inc.	', '+1 (718) 555-2718', true);
INSERT INTO public.enterprise VALUES (54, '21 Rebel Street, PunkBay, Alola 90001', 'support@skulllabz.dev', 'SkullLabz', '+1 (213) 555-6669', false);
INSERT INTO public.enterprise VALUES (55, '7 Rue du Soleil, Kalos-Silicon, 75007 Paris, FR', 'elegance@flarestyle.lux', 'FlareStyle', '+33 1 55 55 9011', false);
INSERT INTO public.enterprise VALUES (96, 'Rúa do Restollal, 32 – Santiago', 'info@plexus.es', 'Plexus', '981 57 64 94', false);
INSERT INTO public.enterprise VALUES (97, 'Rúa das Hedras, 6, Parque Tecnolóxico de Galicia – San Cibrao das Viñas (Ourense)', 'info@odeene.com', 'Odeene', '988 548 898', false);
INSERT INTO public.enterprise VALUES (98, 'Avda. de Madrid, 44 – Santiago', 'contacto@imaxin.com', 'Imaxin Software', '981 57 47 86', false);
INSERT INTO public.enterprise VALUES (99, 'Rúa Nova de Abaixo, 2 – Santiago	', 'enxenio@enxenio.com', 'Enxenio', '981 55 02 12', false);
INSERT INTO public.enterprise VALUES (100, 'Polígono Costa Vella – Santiago', 'info@coremain.com', 'Coremain', '981 56 99 20', false);
INSERT INTO public.enterprise VALUES (2, 'Av. de Pedralonga, 32, 15009 A Coruña', 'info@cinfo.com', 'Cinfo SL', '881 89 69 75', true);
INSERT INTO public.enterprise VALUES (3, 'R. Copérnico, 5, 15008 A Coruña', 'info@aldaba.com', 'Aldaba', '981 90 20 60', true);
INSERT INTO public.enterprise VALUES (1, 'Rúa Severo Ochoa, 3, 15008 A Coruña', 'info@lukia.com', 'Lukia', '900 37 38 23', true);
INSERT INTO public.enterprise VALUES (101, 'Edificio CITEXVI, Vigo', 'info@optaresolutions.com', 'Optare Solutions', '986 12 12 92', false);
INSERT INTO public.enterprise VALUES (103, 'Edificio Workcenter, A Coruña', 'galicia@indra.es', 'Indra Galicia', '981 18 62 00', false);
INSERT INTO public.enterprise VALUES (104, 'Polígono de Sabón – Arteixo', 'clientes@rcable.es', 'R Cable y Telecomunic.', '981 91 00 00', false);
INSERT INTO public.enterprise VALUES (105, 'C/ Rafael Alberti, 13 - 1ºD', 'info@icarto.es', 'Icarto', '881 927 808', false);
INSERT INTO public.enterprise VALUES (106, 'Praza de Europa, 10A - 3ºB', 'info@sixtema.es', 'Sixtema', '981574724', false);
INSERT INTO public.enterprise VALUES (94, 'r/ Vulcano, 3 (Polígono ICARIA III)', 'info@altia.es', 'Altia Consulting', '981 138 847', false);
INSERT INTO public.enterprise VALUES (108, 'r/ Enrique Mariñas Romero Periodista, 34 - 8º', 'gabriel.torre@atos.net', 'Atos', '981 559 054', false);
INSERT INTO public.enterprise VALUES (52, 'r/ Galileo Galilei 64. Parque Empresarial de A Grela', 'contact@imatia.com', 'Imatia', '881 242 970', true);
INSERT INTO public.enterprise VALUES (102, 'r/ Eduardo Pondal, 31. Pontevedra', 'ola@ticgal.com', 'Ticgal', '986 101 000', false);
INSERT INTO public.enterprise VALUES (95, 'r/ Juan de la Cierva, 5', 'hola@bimbio.es', 'Bimbio', '', false);
INSERT INTO public.enterprise VALUES (107, 'Avda. de Ourense 1 - Parque tecnolóxico de Galicia', 'egatel@egatel.es', 'Egatel', '988 368 118', false);
INSERT INTO public.enterprise VALUES (116, '12 LoutHouse Ln, Galar Central, London', 'info@rocketcorps-sm.com', 'Rocket Corps SM', '981666151', false);
INSERT INTO public.enterprise VALUES (49, '882 Coral Tower, Deepwater Tech Park, Hoenn 33210', 'info@aquasystems.blue', 'AquaSystems™', '+1 (305) 555-7733', true);
INSERT INTO public.enterprise VALUES (53, '404 Orbit Plaza, Cosmos Sector, Sinnoh 10011', 'outreach@galacticx.space', 'GalacticX', '+1 (646) 555-8888', true);
INSERT INTO public.enterprise VALUES (51, '1989 Liberation Rd, Unova DC, US 20001', 'hello@plasmaworks.org', 'PlasmaWorks', '+1 (202) 555-7120', true);


--
-- TOC entry 2978 (class 0 OID 332414)
-- Dependencies: 207
-- Data for Name: inscriptions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.inscriptions VALUES (63, 18, 13, '2025-07-14', 'pendiente');
INSERT INTO public.inscriptions VALUES (94, 51, 13, '2025-07-18', 'aceptado');
INSERT INTO public.inscriptions VALUES (107, 66, 63, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (108, 65, 63, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (109, 63, 63, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (69, 16, 13, '2025-07-15', 'pendiente');
INSERT INTO public.inscriptions VALUES (110, 55, 63, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (111, 53, 63, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (112, 49, 13, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (13, 1, 21, '2025-07-01', 'rechazado');
INSERT INTO public.inscriptions VALUES (58, 28, 13, '2025-07-10', 'aceptado');
INSERT INTO public.inscriptions VALUES (41, 28, 1, '2025-07-08', 'rechazado');
INSERT INTO public.inscriptions VALUES (113, 49, 21, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (68, 22, 13, '2025-07-15', 'aceptado');
INSERT INTO public.inscriptions VALUES (114, 46, 21, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (115, 47, 21, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (116, 48, 21, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (120, 62, 1, '2025-07-24', 'pendiente');
INSERT INTO public.inscriptions VALUES (89, 46, 67, '2025-07-18', 'rechazado');
INSERT INTO public.inscriptions VALUES (60, 17, 13, '2025-07-14', 'aceptado');
INSERT INTO public.inscriptions VALUES (45, 2, 13, '2025-07-09', 'pendiente');
INSERT INTO public.inscriptions VALUES (132, 3, 134, '2025-07-30', 'pendiente');
INSERT INTO public.inscriptions VALUES (133, 33, 134, '2025-07-30', 'pendiente');
INSERT INTO public.inscriptions VALUES (134, 46, 134, '2025-07-30', 'pendiente');
INSERT INTO public.inscriptions VALUES (130, 74, 134, '2025-07-30', 'aceptado');
INSERT INTO public.inscriptions VALUES (131, 74, 63, '2025-07-30', 'aceptado');
INSERT INTO public.inscriptions VALUES (16, 9, 21, '2025-07-01', 'aceptado');
INSERT INTO public.inscriptions VALUES (135, 74, 21, '2025-07-30', 'pendiente');
INSERT INTO public.inscriptions VALUES (59, 1, 13, '2025-07-11', 'aceptado');
INSERT INTO public.inscriptions VALUES (40, 1, 1, '2025-07-08', 'rechazado');
INSERT INTO public.inscriptions VALUES (15, 22, 21, '2025-07-01', 'aceptado');
INSERT INTO public.inscriptions VALUES (70, 47, 13, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (72, 48, 13, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (73, 46, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (74, 47, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (75, 48, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (76, 49, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (77, 50, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (79, 33, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (80, 1, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (81, 28, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (82, 22, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (83, 17, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (84, 9, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (85, 3, 63, '2025-07-17', 'pendiente');
INSERT INTO public.inscriptions VALUES (71, 46, 13, '2025-07-17', 'aceptado');
INSERT INTO public.inscriptions VALUES (14, 34, 21, '2025-07-01', 'aceptado');
INSERT INTO public.inscriptions VALUES (92, 47, 68, '2025-07-18', 'pendiente');
INSERT INTO public.inscriptions VALUES (93, 48, 68, '2025-07-18', 'pendiente');
INSERT INTO public.inscriptions VALUES (91, 51, 68, '2025-07-18', 'aceptado');
INSERT INTO public.inscriptions VALUES (90, 51, 67, '2025-07-18', 'rechazado');
INSERT INTO public.inscriptions VALUES (78, 34, 63, '2025-07-17', 'rechazado');
INSERT INTO public.inscriptions VALUES (96, 62, 16, '2025-07-22', 'pendiente');
INSERT INTO public.inscriptions VALUES (97, 66, 16, '2025-07-22', 'pendiente');
INSERT INTO public.inscriptions VALUES (98, 68, 16, '2025-07-22', 'pendiente');
INSERT INTO public.inscriptions VALUES (99, 61, 16, '2025-07-22', 'pendiente');


--
-- TOC entry 2976 (class 0 OID 331938)
-- Dependencies: 205
-- Data for Name: offers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.offers VALUES (8, 2, 'Ingeniero Backend Java', 'Se requiere experiencia en Java, Spring Boot, bases de datos SQL y conocimientos en APIs REST. Trabajo híbrido con posibilidades de crecimiento.', '2025-06-12', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'remoto', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (9, 1, 'Tester QA Manual', 'Buscamos un perfil de QA para hacer pruebas manuales sobre aplicaciones web. Ideal si conoce Postman, Jira y metodologías ágiles.', '2025-06-12', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'híbrido', 'https://www.linkedin.com/company/cinfotv/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (17, 3, 'Desarrollo Web', 'Buscamos estudiantes de DAM para desarrollar la web de empleo del Cluster TIC', '2025-06-23', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'presencial', 'https://www.linkedin.com/company/aldaba/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (46, 49, 'Desarrollo para Software Submarino', 'Necesitamos perfil junior para actualización y mantenimiento de software de navegación en entornos submarinos', '2025-07-16', true, 'Conocimiento en firmwares para ROVs submarinos.
Se valorará experiencia en entornos oceánicos.
', 'Persencial', 'https://www.linkedin.com/posts/juanmitaboada_alioli-rov-submarine-drone-diary-juanmi-activity-7056252024643817472-3Lbw/', 'Salario base (25.000-30.000€).
Dietas incluidas.
Curso de buceo y PER a cargo de la empresa.');
INSERT INTO public.offers VALUES (7, 1, 'Community Manager', 'Buscamos una persona creativa con experiencia en redes sociales, redacción de contenido, diseño básico y herramientas de programación de publicaciones.', '2025-06-12', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'presencial', 'https://www.linkedin.com/company/cinfotv/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (16, 2, 'Desarrollo FullStack', 'Buscamos estudiantes de DAM para desarrollar la web de empleo del Cluster TIC', '2025-06-23', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'remoto', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (28, 2, 'Desarrollador Bootcamp', 'Se busca especialista en Angular para solucionar problemas de routing', '2025-06-27', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'remoto', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (1, 2, 'Tester Desarrollador de FullStack', 'Se busca desarrollador FullStack con experiencia en React', '2025-07-01', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'híbrido', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (4, 1, 'Diseñador UI/UX', 'Se necesita diseñador con experiencia en herramientas como Figma, Adobe XD o Sketch. Se valorará conocimiento de buenas prácticas de accesibilidad.', '2025-06-12', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'presencial', 'https://www.linkedin.com/company/cinfotv/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (6, 2, 'Soporte Técnico', 'Se busca personal para brindar soporte técnico de primer nivel tanto a clientes como a usuarios internos. Turnos rotativos y buena actitud de servicio.', '2025-06-12', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'remoto', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (5, 2, 'Administrativo Contable', 'Empresa del sector tecnológico busca administrativo con conocimientos contables para llevar la facturación mensual y gestiones administrativas.', '2025-06-12', false, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'híbrido', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (2, 2, 'Desarrollador Fullstack', 'Se necesita un desarrollador fullstack a jornada completa en turnos de 8 a 17', '2025-06-11', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'presencial', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (18, 2, 'Desarrollo de FullStack', 'Buscamos estudiantes de DAM para desarrollar la web de empleo del Cluster TIC', '2025-06-23', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'híbrido', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (34, 2, 'Dearrollador FullStack', 'Buscamos un desarrollador de software para la migración de bases de datos y creación de la nueva aplicación de apuestas', '2025-07-01', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'híbrido', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (22, 2, 'Desarrollo de FullStack', 'Se busca desarrollador FullStack con experiencia en Angular y Python', '2025-06-25', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'híbrido', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (47, 51, 'Desarrollo Software Realidad Virtual', 'Buscamos desarrolladores senior para un nuevo proyecto sobre la estimulación sensorial a través de la realidad virtual', '2025-07-16', true, 'Conocimientos de IA.
Conocimientos de Ciberseguridad.', 'Híbrida', '', 'Horario flexible.
Dietas por desplazamientos a sede.
Salario según objetivos (35.000-60.000€).');
INSERT INTO public.offers VALUES (48, 50, 'Desarrollo Plataforma Estudiantes', 'Buscamos estudiantes universitarios o de FP para el desarrollo de una aplicación para móviles o tablets, en campus universitario de A Coruña.', '2025-07-16', true, 'Disponibilidad inmediata.
Cocimientos de Java y React.
Cocimientos de entornos de programación en móviles.', 'Híbrido', '', 'Salario total 8.000€ (trabajo completo).
');
INSERT INTO public.offers VALUES (49, 53, 'Desarrollo de Software para Navegación Espacial', 'Buscamos perfiles senior FullStack para una nueva expedición a Marte en 2045.', '2025-07-16', true, 'Conocimientos de Ingeniería Aeroespacial.
Amplio conocimientos de Python.
', 'Remoto', '', 'Salario 80.000-100.000€ anuales.
');
INSERT INTO public.offers VALUES (50, 52, 'Desarrollo de aplicaciones multiplataforma', 'Buscamos ingenieros de Informática para el desarrollo de aplicaciones para clientes finales.', '2025-07-16', true, 'Comprensión profunda de la arquitectura del motor UE4.
Base sólida de programación C ++.
Experiencia en el desarrollo de proyectos de juegos a gran escala.', 'Remoto', 'https://www.linkedin.com/company/tencentglobal', 'Salario 50.000€.
Contrato indefinido.
');
INSERT INTO public.offers VALUES (3, 1, 'Desarrollador Frontend Angular', 'Buscamos un desarrollador con experiencia en Angular para integrarse en un equipo ágil y dinámico. Se valorará experiencia en diseño responsivo y Angular Material.', '2025-06-12', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'remoto', 'https://www.linkedin.com/company/cinfotv/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (33, 2, 'Experto en Bases de datos con conexiones a FrontEnd', 'Buscamos perfiles senior para migración de datos y su posterior conexión a Frontend', '2025-07-01', true, '-Ciclo Formativo Grado Superior Informatica o equivalente
-Experiencia al menos 2 años en migraciones, configuración de equipos
-Experiencia al menos 2 años en resolución de incidencias a nivel de hardware, software', 'presencial', 'https://www.linkedin.com/company/luckia/jobs/', 'Salario 20,000€/mes');
INSERT INTO public.offers VALUES (67, 102, 'Desarrollador/a Multiplataforma', 'En Ticgal, una empresa gallega líder en el desarrollo de soluciones de software a medida para el sector industrial, buscamos un/a Desarrollador/a de Aplicaciones Multiplataforma. Si te apasiona crear herramientas digitales que optimicen procesos, mejoren la eficiencia y aporten valor real en entornos industriales complejos, esta es tu oportunidad. Te unirás a un equipo innovador y altamente cualificado, trabajando en el diseño y la implementación de aplicaciones robustas y eficientes para diversos dispositivos y plataformas, desde sistemas de control de producción hasta aplicaciones de gestión logística y visualización de datos en planta.', '2025-07-21', true, 'Grado en Ingeniería Informática, Telecomunicaciones o similar.
Experiencia demostrable de al menos 3 años en desarrollo de aplicaciones multiplataforma (ej. React Native, Flutter, Xamarin, Electron, .NET MAUI o frameworks web con capacidad de empaquetado desktop/móvil).
Conocimientos sólidos de lenguajes de programación como JavaScript/TypeScript, C# o Python.
Experiencia con APIs RESTful y bases de datos relacionales (ej. SQL Server, PostgreSQL) y/o no relacionales.
Familiaridad con el desarrollo de interfaces de usuario intuitivas y funcionales (UI/UX).
Capacidad para entender los requisitos de negocio y técnicos del sector industrial y transformarlos en soluciones de software eficientes.
Proactividad, autonomía y buenas habilidades para el trabajo en equipo y la comunicación.
Valorable: Experiencia con sistemas de control industrial (PLCs, SCADA) o IoT.
Valorable: Conocimientos de metodologías ágiles (Scrum/Kanban).', 'Híbrida (Vigo/Pontevedra, con posibilidad de teletrabajo parcial y flexibilidad)', 'https://www.linkedin.com/company/ticgal/', 'Integración en una empresa en crecimiento, con proyectos desafiantes y un impacto significativo en la digitalización industrial.
Oportunidades de desarrollo profesional y formación continua en tecnologías de vanguardia y metodologías ágiles.
Ambiente de trabajo colaborativo, con un equipo joven y dinámico.
Horario flexible y medidas de conciliación.
Contrato indefinido y salario competitivo acorde a la experiencia y aptitudes.
Seguro de salud privado (opcional).');
INSERT INTO public.offers VALUES (53, 94, 'Desarrollador/a Full Stack (Java + Angular)', 'En Altia, consultora tecnológica líder con más de 25 años de experiencia, buscamos incorporar a nuestro equipo un/a Desarrollador/a Full Stack con experiencia en Java y Angular. Participarás en proyectos innovadores para clientes nacionales e internacionales en sectores clave como administración pública, banca, salud o energía.

Buscamos personas con ilusión, capacidad de aprendizaje y ganas de formar parte de un entorno colaborativo, dinámico y con enfoque en la mejora continua.', '2025-07-21', true, 'Experiencia de al menos 2 años desarrollando con Java (Spring Boot) y Angular.

Conocimientos sólidos en bases de datos relacionales (PostgreSQL, MySQL, Oracle).

Experiencia trabajando con Git y en entornos ágiles (Scrum/Kanban).

Capacidad de análisis, trabajo en equipo y orientación a resultados.

Se valorará positivamente nivel medio de inglés y conocimientos en integración continua.', 'Híbrida desde cualquiera de nuestras sedes (A Coruña, Vigo, Madrid, etc.), con posibilidad de trabajo 100 % remoto según proyecto y perfil.', '', 'Contrato indefinido con salario competitivo y revisiones anuales.

Acceso a un completo plan de formación y certificaciones oficiales (AWS, Azure, Java, etc.).

Posibilidad de desarrollo de carrera y movilidad entre proyectos.

Participación en proyectos punteros y de largo recorrido.

Ambiente cercano, humano y colaborativo, con actividades de team building y comunidad interna.');
INSERT INTO public.offers VALUES (54, 108, 'Ingeniero/a DevOps', 'En Atos, multinacional líder en servicios digitales, buscamos un/a DevOps Engineer para integrarse en proyectos clave de transformación digital. Formarás parte de un equipo multidisciplinar que da soporte al ciclo completo de desarrollo e integración continua, automatización de infraestructuras y despliegue de soluciones en la nube.

Si te apasiona la automatización, el trabajo en equipo y los entornos de alta disponibilidad, ¡esta es tu oportunidad!', '2025-07-21', true, 'Experiencia mínima de 2 años en entornos Linux.

Manejo de herramientas de CI/CD (Jenkins, GitLab CI, Bamboo, etc.).

Conocimientos en Docker, Kubernetes y Terraform o Ansible.

Experiencia con entornos cloud (preferiblemente AWS o Azure).

Conocimientos básicos de programación (Bash, Python, Groovy…).

Nivel intermedio de inglés.', '100 % remoto o híbrido desde cualquiera de nuestras oficinas en España.', '', 'Contrato indefinido con salario competitivo y plan de desarrollo profesional.

Formación continua y certificaciones oficiales a cargo de la empresa (AWS, Kubernetes, etc.).

Participación en proyectos punteros a nivel europeo.

Seguro de salud privado y plan de retribución flexible.

Buen clima laboral, con cultura colaborativa e inclusiva.');
INSERT INTO public.offers VALUES (55, 100, 'Desarrollador/a Full Stack (Java + Angular)', 'En Coremain, compañía tecnológica con más de 30 años de experiencia y sede central en Santiago de Compostela, buscamos incorporar un/a Desarrollador/a Full Stack con experiencia en Java y Angular para participar en proyectos innovadores, especialmente en el ámbito sanitario y de administración pública.

Formarás parte de un equipo comprometido con la calidad, la sostenibilidad y el desarrollo profesional, trabajando en soluciones reales que mejoran el día a día de miles de personas.', '2025-07-21', true, 'Experiencia mínima de 2 años en Java (Spring Boot) y Angular.

Conocimientos en bases de datos relacionales (PostgreSQL, Oracle).

Buen manejo de herramientas de control de versiones (Git).

Valorable experiencia previa en proyectos para el sector sanitario o público.

Persona proactiva, resolutiva y con capacidad para trabajar en equipo.

Se valorará nivel medio de inglés.', 'Presencial o híbrido', '', 'Contrato indefinido y salario acorde a experiencia.

Estabilidad laboral en una empresa consolidada y en crecimiento.

Acceso a formación continua, certificaciones y plan de carrera profesional.

Participación en proyectos con alto impacto social.

Buen ambiente laboral, equipo cercano y colaborativo.');
INSERT INTO public.offers VALUES (59, 105, 'Desarrollador/a Multiplataforma', 'En iCarto, somos líderes en el desarrollo de soluciones geoespaciales innovadoras. Buscamos un/a desarrollador/a de aplicaciones multiplataforma apasionado/a por la tecnología, con experiencia en la creación de aplicaciones robustas y eficientes para diferentes entornos (web, móvil, escritorio) con un enfoque particular en la visualización y análisis de datos geográficos. Te integrarás en un equipo dinámico y altamente especializado, trabajando en proyectos desafiantes que impactan directamente en la gestión territorial y la toma de decisiones basada en la ubicación.', '2025-07-21', true, 'Experiencia demostrable en desarrollo de aplicaciones multiplataforma (ej. React Native, Flutter, Xamarin, Electron).
Conocimientos sólidos de JavaScript/TypeScript, Python.
Familiaridad con APIs de mapas (ej. OpenLayers, Leaflet, Mapbox).
Experiencia en el consumo y manipulación de datos geográficos (GeoJSON, WFS, WMS).
Conocimiento de bases de datos espaciales (PostGIS).
Capacidad para trabajar en equipo y buenas habilidades de comunicación.
Valorable: experiencia con frameworks frontend (React, Angular, Vue.js).
Valorable: experiencia con metodologías ágiles (Scrum/Kanban).', 'Híbrida (flexible con días de oficina en Santiago de Compostela y teletrabajo)', 'https://www.linkedin.com/company/icarto/', 'Salario competitivo acorde a experiencia y valía.
Desarrollo profesional continuo con acceso a formación especializada en tecnologías GIS.
Ambiente de trabajo colaborativo y multidisciplinar.
Flexibilidad horaria y posibilidad de teletrabajo.
Proyectos innovadores con impacto social y tecnológico.
Seguro médico privado (opcional).');
INSERT INTO public.offers VALUES (56, 107, 'Ingeniero/a de Desarrollo Software', 'En Egatel, empresa tecnológica con sede en Ourense y referente internacional en el diseño y fabricación de transmisores de TV digital, buscamos incorporar un/a Ingeniero/a de Desarrollo de Software Embebido. Participarás en el desarrollo de firmware para sistemas de transmisión de alta complejidad, colaborando con los equipos de hardware y validación en un entorno altamente tecnológico e innovador.

Buscamos talento con pasión por la ingeniería, ganas de aprender y contribuir al desarrollo de productos punteros a nivel mundial.', '2025-07-21', true, 'Formación en Ingeniería Electrónica, Telecomunicaciones, Informática o similar.

Conocimientos en desarrollo de software embebido en C/C++.

Experiencia con microcontroladores, RTOS y protocolos de comunicación (SPI, UART, I2C, etc.).

Se valorará experiencia en sistemas Linux embebido y herramientas de control de versiones (Git).

Nivel de inglés técnico (mínimo B1).

Capacidad para trabajar en equipo, orientación a la calidad y aprendizaje continuo.', 'Presencial', '', 'Contrato indefinido en una empresa sólida con proyección internacional.

Formación continua y oportunidades reales de crecimiento profesional.

Participación en proyectos de alto nivel tecnológico.

Entorno de trabajo estable, colaborativo y con cultura industrial de innovación.

Posibilidad de colaborar en proyectos europeos y de I+D+i.');
INSERT INTO public.offers VALUES (57, 99, 'Desarrollador/a de Aplicaciones Web', 'En Enxenio, empresa tecnológica con sede en Santiago de Compostela, especializada en soluciones de software a medida para sectores estratégicos, buscamos incorporar un/a Desarrollador/a de Aplicaciones Web con experiencia en Java y Angular. Trabajarás en proyectos estables y de largo recorrido, colaborando con equipos multidisciplinares y participando en el desarrollo de plataformas críticas para la gestión administrativa y sanitaria.

Si te motiva crear soluciones que impacten directamente en la ciudadanía y valoras la estabilidad y el buen ambiente, te estamos esperando.', '2025-07-21', true, 'Experiencia demostrable con Java (Spring Boot) y Angular.

Conocimientos en HTML, CSS, TypeScript y buenas prácticas de desarrollo frontend.

Manejo de bases de datos relacionales (PostgreSQL, MySQL u Oracle).

Experiencia trabajando con herramientas de control de versiones (Git).

Valorable experiencia en proyectos para la administración pública gallega (Xunta, Sergas, etc.).

Capacidad para trabajar de forma autónoma y en equipo.', 'Híbrida', '', 'Contrato indefinido con proyección de crecimiento interno.

Incorporación a proyectos estables con tecnologías modernas.

Buen ambiente laboral, equipo cercano y horizontal.

Acceso a formación técnica y plan de carrera.

Conciliación laboral real y estabilidad a largo plazo.');
INSERT INTO public.offers VALUES (60, 97, 'Desarrollador/a Full Stack', 'En Odeene, empresa gallega en plena expansión especializada en soluciones de transformación digital, buscamos un/a Desarrollador/a Full Stack con experiencia en Java y Angular para unirse a nuestros equipos de trabajo en proyectos para administración pública, sanidad y empresas del sector privado.

Buscamos profesionales con iniciativa, capacidad de trabajo en equipo y motivación por formar parte de un entorno dinámico y de innovación tecnológica, desde Galicia para el mundo.', '2025-07-21', true, 'Experiencia mínima de 2 años en desarrollo con Java (Spring Boot) y Angular.

Conocimientos en bases de datos relacionales (PostgreSQL, Oracle).

Experiencia trabajando con herramientas de control de versiones (Git) y metodologías ágiles.

Se valorará experiencia previa en proyectos para la administración pública gallega (eidos, Faísa, Sergas, etc.).

Persona resolutiva, proactiva y con buena capacidad comunicativa.

Valorable nivel medio de inglés.', 'Remoto o híbrido', '', 'Contrato indefinido con salario competitivo y acorde a tu experiencia.

Plan de carrera personalizado y formación continua con certificaciones.

Posibilidad de crecer dentro de un entorno ágil y horizontal.

Proyectos innovadores con impacto real en el entorno digital gallego.

Buen ambiente de trabajo, cultura colaborativa y enfoque humano.');
INSERT INTO public.offers VALUES (64, 106, 'Ingeniero/a de Software Multiplataforma', 'Sixtema, consultora tecnológica especializada en soluciones a medida para empresas, busca un/a Ingeniero/a de Software Multiplataforma para integrarse en nuestro equipo de desarrollo. Si eres una persona proactiva, con capacidad analítica y te apasiona crear software que funcione de manera óptima en diferentes entornos (escritorio, web, móvil), esta es tu oportunidad. Participarás en todo el ciclo de vida del desarrollo de software, desde el análisis de requisitos hasta la implementación y el soporte, ofreciendo soluciones innovadoras a nuestros clientes.', '2025-07-21', true, 'Grado en Ingeniería Informática, Telecomunicaciones o similar.
Experiencia en desarrollo de aplicaciones multiplataforma, preferiblemente con tecnologías .NET (Xamarin, MAUI) o Java (Spring Boot, Kotlin Multiplatform).
Conocimientos sólidos de programación orientada a objetos.
Experiencia con bases de datos SQL Server u otras bases de datos relacionales.
Familiaridad con el consumo de servicios web (SOAP, REST).
Capacidad de análisis y diseño de soluciones de software.
Proactividad, autonomía y buenas habilidades de comunicación.
Valorable: experiencia con entornos Cloud (Azure, AWS, Google Cloud).
Valorable: inglés técnico.', 'Híbrida (A Coruña, con posibilidad de teletrabajo parcial)', 'https://www.linkedin.com/company/sixtema/', 'Estabilidad laboral y desarrollo de carrera en una empresa sólida.
Ambiente de trabajo cercano y colaborativo.
Formación continua en nuevas tecnologías.
Proyectos desafiantes y variados para diferentes sectores.
Horario flexible y conciliación familiar.
Retribución acorde a la experiencia y aptitudes.');
INSERT INTO public.offers VALUES (66, 96, 'Ingeniero/a de Datos (ETL / Big Data)', 'En colaboración con uno de nuestros clientes del sector retail, buscamos incorporar un perfil de Data Engineer que participe en procesos de integración, modelado y análisis de datos en entorno Big Data.', '2025-07-21', true, 'Experiencia con Python, SQL, Spark o Hadoop.

Manejo de herramientas ETL como Talend, Pentaho, etc.

Conocimiento en arquitectura de datos y procesamiento distribuido.

Inglés medio.', 'Híbrido o remoto', '', 'Participación en proyectos de datos a gran escala.

Formación en tecnologías cloud (GCP, AWS).

Contrato estable con evolución.');
INSERT INTO public.offers VALUES (62, 101, 'Ingeniero/a Cloud DevOps', 'Optare Solutions busca un perfil con experiencia en automatización de infraestructuras, CI/CD y entornos cloud para integrarse en proyectos de alto rendimiento con operadoras telco. Formarás parte de un equipo técnico puntero, participando en despliegues reales y escalables sobre AWS, Azure y GCP.', '2025-07-21', true, 'Terraform, Ansible, Docker, Kubernetes.

CI/CD: Jenkins, GitLab CI.

Experiencia en scripting (Bash, Python).

Inglés técnico alto.', 'Remoto o híbrido', '', 'Proyectos internacionales.

Certificaciones cloud pagadas.

Posibilidad de viajar puntualmente.');
INSERT INTO public.offers VALUES (65, 96, 'Desarrollador/a Java Backend', 'En Plexus Tech buscamos incorporar un/a Java Backend Developer para participar en el desarrollo de soluciones robustas para clientes del sector financiero. Trabajarás en un entorno ágil, colaborando con equipos multidisciplinares de alto nivel.', '2025-07-21', true, 'Experiencia sólida en Java 11+, Spring Boot y JPA.

Conocimiento de bases de datos Oracle o PostgreSQL.

Valorable experiencia en banca o fintech.

Nivel medio de inglés.', 'Remoto, híbrido o presencial', '', 'Contrato indefinido.

Formación técnica continua.

Plan de carrera interno.

Acceso a proyectos estables y con proyección.');
INSERT INTO public.offers VALUES (61, 103, 'Especialista en Desarrollo Multiplataforma', 'En Indra, una de las principales compañías globales de tecnología y consultoría, buscamos un/a Especialista en Desarrollo Multiplataforma para unirse a nuestros equipos de soluciones digitales. Si tienes una sólida experiencia en la construcción de aplicaciones escalables y de alto rendimiento que funcionen sin problemas en diversos entornos (web, iOS, Android), y te apasiona la innovación tecnológica, esta es tu oportunidad. Participarás en proyectos estratégicos para clientes de diversos sectores (administración pública, defensa, transporte, energía), contribuyendo a la transformación digital y la creación de soluciones de vanguardia.', '2025-07-21', true, 'Experiencia mínima de 3-5 años en desarrollo de aplicaciones multiplataforma con frameworks como Flutter o React Native.
Dominio de lenguajes de programación como Dart, JavaScript/TypeScript.
Experiencia con APIs RESTful y bases de datos relacionales y no relacionales.
Conocimiento de principios de diseño de UI/UX y buenas prácticas de desarrollo.
Familiaridad con herramientas de control de versiones (Git).
Capacidad para diseñar arquitecturas de software robustas y escalables.
Habilidad para resolver problemas complejos y trabajar en entornos ágiles.
Valorable: certificaciones en tecnologías relevantes.
Valorable: experiencia en metodologías DevOps.', 'Híbrida (con base en Madrid o una de nuestras sedes principales en España, con opción de teletrabajo parcial)', 'https://www.linkedin.com/company/indra/', 'Plan de carrera personalizado y oportunidades de crecimiento profesional en una empresa global.
Participación en proyectos de gran envergadura y alto impacto tecnológico.
Formación continua en las últimas tecnologías y metodologías.
Flexibilidad y conciliación.
Beneficios sociales: seguro médico, plan de pensiones, retribución flexible.
Cultura de innovación y trabajo en equipo.');
INSERT INTO public.offers VALUES (58, 52, 'Docente Full Stack Java + Angular', 'En Imatia, empresa gallega líder en soluciones tecnológicas y formación tecnológica avanzada, buscamos un/a Desarrollador/a Full Stack con experiencia en Java y Angular para incorporarse de forma inmediata como docente sustituto/a en uno de nuestros programas formativos tipo Bootcamp Full Stack Developer.

El perfil seleccionado se encargará de impartir sesiones teórico-prácticas, tutorizar a los alumnos, y dar continuidad al itinerario ya diseñado, cubriendo la ausencia temporal de uno de nuestros formadores principales. El curso está en marcha, con grupos motivados y contenidos bien definidos.', '2025-07-21', true, 'Experiencia profesional de al menos 2 años en desarrollo Full Stack con Java (Spring Boot) y Angular.

Capacidad para explicar conceptos técnicos de forma clara y adaptada a alumnos en formación.

Conocimientos sólidos de HTML, CSS, TypeScript, Git y bases de datos relacionales.

Experiencia previa como formador/a o tutor/a será muy valorada (aunque no imprescindible).

Persona responsable, comunicativa y con vocación pedagógica.

Disponibilidad inmediata para incorporación y compromiso mínimo de 1 mes (prorrogable).', 'Presencial en nuestras instalaciones en Vigo', 'https://www.linkedin.com/company/imatia-innovation/', 'Contrato por sustitución con posibilidad real de continuidad en el equipo formativo o en proyectos de desarrollo.

Remuneración competitiva y acorde a experiencia docente y técnica.

Entorno dinámico, colaborativo y con impacto social directo a través de la formación.

Material formativo y estructura del curso ya diseñada: el foco estará en impartir y motivar.

Posibilidad de compatibilizar con otros proyectos freelance o de desarrollo.');
INSERT INTO public.offers VALUES (63, 98, 'Desarrollador/a Full Stack', 'En Imaxin, agencia digital líder en Galicia, estamos en búsqueda de un/a Desarrollador/a Full Stack Multiplataforma con un enfoque creativo y técnico para unirse a nuestro equipo. Trabajarás en el diseño y desarrollo de aplicaciones web y móviles innovadoras, desde la concepción hasta la implementación, garantizando una experiencia de usuario excepcional en todas las plataformas. Si te apasiona crear soluciones digitales atractivas y funcionales para una amplia cartera de clientes, te invitamos a formar parte de nuestro crecimiento.', '2025-07-21', true, 'Experiencia demostrable en desarrollo frontend (HTML5, CSS3, JavaScript) con frameworks como React, Angular o Vue.js.
Experiencia en desarrollo backend con tecnologías como Node.js, PHP (Laravel, Symfony) o Python (Django, Flask).
Conocimiento de desarrollo de aplicaciones móviles con frameworks multiplataforma (ej. React Native, Flutter).
Dominio de bases de datos (MySQL, PostgreSQL, MongoDB).
Experiencia con APIs RESTful.
Capacidad para trabajar de forma autónoma y en equipo.
Atención al detalle y pasión por la calidad del código.
Valorable: conocimientos de UI/UX y diseño responsivo.
Valorable: experiencia con sistemas de gestión de contenido (CMS).', 'Presencial (Santiago de Compostela)', 'https://www.linkedin.com/company/imaxin-software/', 'Ambiente de trabajo joven, dinámico y colaborativo.
Oportunidades de aprendizaje y crecimiento en un entorno creativo.
Participación en proyectos variados y desafiantes.
Horario flexible.
Café y snacks en la oficina.
Equipo de trabajo de última generación.');
INSERT INTO public.offers VALUES (68, 95, 'Desarrollador/a de Aplicaciones Móviles', '¿Te entusiasma la idea de crear herramientas digitales intuitivas y divertidas que transformen la forma en que los niños y familias aprenden? En Bimbio, somos una startup innovadora dedicada al desarrollo de aplicaciones educativas y lúdicas para dispositivos móviles. Buscamos un/a Desarrollador/a de Aplicaciones Móviles Multiplataforma para unirse a nuestro equipo en constante crecimiento. Tu misión será dar vida a nuestras ideas, construyendo experiencias interactivas y atractivas que funcionen a la perfección en diferentes sistemas operativos, contribuyendo al desarrollo de una nueva generación de contenidos educativos digitales.', '2025-07-21', true, 'Experiencia sólida en el desarrollo de aplicaciones móviles multiplataforma utilizando frameworks como Flutter o React Native.
Dominio de Dart o JavaScript/TypeScript y familiaridad con patrones de diseño de software móvil (MVVM, BLoC, etc.).
Capacidad para diseñar y construir interfaces de usuario (UI) atractivas y amigables para niños y adultos.
Experiencia en la integración de APIs y servicios backend (ej. Firebase, GraphQL).
Conocimientos de gestión de estado en aplicaciones móviles y persistencia de datos local.
Comprensión de los procesos de publicación en App Store (iOS) y Google Play Store (Android).
Proactividad, autonomía y excelentes habilidades de comunicación y trabajo en equipo.
Valorable: Experiencia con animaciones, gráficos y gamificación en aplicaciones.
Valorable: Conocimientos de desarrollo de software para iPad o tablets Android.', 'Remoto (con flexibilidad para reuniones presenciales ocasionales en Galicia si es necesario)', '', 'Ser parte de un proyecto con un propósito social y educativo significativo.
Flexibilidad total para trabajar desde donde quieras, priorizando la conciliación.
Ambiente de trabajo creativo, cercano y ágil.
Oportunidades para proponer ideas y ver tu impacto directamente en el producto.
Acceso a formación especializada en tecnologías móviles y tendencias educativas.
Salario competitivo acorde a tu experiencia y contribución.');
INSERT INTO public.offers VALUES (51, 2, 'Junior Developer – Control Digital', 'Buscamos desarrolladores/as junior recién titulados en Formación Profesional para incorporarse a nuestro equipo de desarrollo. Trabajarás en proyectos reales desde el primer día, contribuyendo a la creación de sistemas inteligentes de control de animales, automatización y control en tiempo real. Tendrás la oportunidad de aprender junto a profesionales senior, en un entorno donde el código tiene impacto… y estilo.', '2025-07-18', false, 'Haber finalizado recientemente un CFGS en Desarrollo de Aplicaciones Web (DAW), Multiplataforma (DAM) o similar.
Conocimientos básicos en:
Java, JavaScript, HTML/CSS
Frameworks como Spring Boot o Angular/React
Sistemas de control de versiones (Git)
Capacidad para trabajar en equipo, aprender rápido y adaptarse a retos técnicos.
Se valorará:
Proyectos propios (personales o de clase)
Interés por automatización, IA o ciberseguridad
Familiaridad con herramientas como VS Code, Postman, GitHub', 'Presencial con opción a híbrido', '', 'Tutor técnico personalizado y plan de formación continua.
Participación en proyectos reales desde el primer mes.
Posibilidad de crecimiento profesional dentro de la empresa.
Ambiente joven, creativo y ligeramente rebelde (pero con buenas prácticas).
Acceso a laboratorio Rocket Labs y a la cafetería “Mewbrew”.
PET Friendly, se permite que lleves a tu mascota al trabajo.');
INSERT INTO public.offers VALUES (74, 116, 'Junior Developer – Control Digital', 'En Rocket Corp S.M., buscamos desarrolladores/as junior recién titulados en Formación Profesional para incorporarse a nuestro equipo de desarrollo. Trabajarás en proyectos reales desde el primer día, contribuyendo a la creación de sistemas inteligentes de control de animales, automatización y control en tiempo real. Tendrás la oportunidad de aprender junto a profesionales senior, en un entorno donde el código tiene impacto… y estilo.', '2025-07-30', true, 'Java, JavaScript, HTML/CSS
Frameworks como Spring Boot o Angular/React
Sistemas de control de versiones (Git)
Capacidad para trabajar en equipo, aprender rápido y adaptarse a retos técnicos.
Se valorará:
Proyectos propios (personales o de clase)
Interés por automatización, IA o ciberseguridad', 'Híbrida', 'http://www.linkedin.com/company/rocket-companies1/', 'Tutor técnico personalizado y plan de formación continua.
Participación en proyectos reales desde el primer mes.
Posibilidad de crecimiento profesional dentro de la empresa.
Ambiente joven, creativo y ligeramente rebelde (pero con buenas prácticas).
Acceso a laboratorio Rocket Labs y a la cafetería “Mewbrew”.
PET Friendly, se permite que lleves a tu mascota al trabajo.
Familiaridad con herramientas como VS Code, Postman, GitHub');


--
-- TOC entry 2970 (class 0 OID 331853)
-- Dependencies: 199
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles VALUES (0, 'ROLE_ADMIN', 'admin');
INSERT INTO public.roles VALUES (1, 'ROLE_USER', 'user');
INSERT INTO public.roles VALUES (2, 'ROLE_ENTERPRISE', 'enterprise');


--
-- TOC entry 2972 (class 0 OID 331864)
-- Dependencies: 201
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_roles VALUES (1, 1, 1);
INSERT INTO public.user_roles VALUES (97, 2, 133);
INSERT INTO public.user_roles VALUES (98, 1, 134);
INSERT INTO public.user_roles VALUES (13, 1, 13);
INSERT INTO public.user_roles VALUES (0, 0, 0);
INSERT INTO public.user_roles VALUES (15, 1, 16);
INSERT INTO public.user_roles VALUES (17, 2, 14);
INSERT INTO public.user_roles VALUES (18, 2, 18);
INSERT INTO public.user_roles VALUES (55, 2, 58);
INSERT INTO public.user_roles VALUES (56, 2, 59);
INSERT INTO public.user_roles VALUES (57, 2, 60);
INSERT INTO public.user_roles VALUES (58, 2, 61);
INSERT INTO public.user_roles VALUES (59, 2, 62);
INSERT INTO public.user_roles VALUES (60, 1, 63);
INSERT INTO public.user_roles VALUES (16, 2, 17);
INSERT INTO public.user_roles VALUES (61, 2, 64);
INSERT INTO public.user_roles VALUES (62, 2, 65);
INSERT INTO public.user_roles VALUES (20, 1, 21);
INSERT INTO public.user_roles VALUES (64, 1, 67);
INSERT INTO public.user_roles VALUES (65, 1, 68);
INSERT INTO public.user_roles VALUES (70, 2, 106);
INSERT INTO public.user_roles VALUES (71, 2, 107);
INSERT INTO public.user_roles VALUES (72, 2, 108);
INSERT INTO public.user_roles VALUES (73, 2, 109);
INSERT INTO public.user_roles VALUES (74, 2, 110);
INSERT INTO public.user_roles VALUES (75, 2, 111);
INSERT INTO public.user_roles VALUES (76, 2, 112);
INSERT INTO public.user_roles VALUES (77, 2, 113);
INSERT INTO public.user_roles VALUES (78, 2, 114);
INSERT INTO public.user_roles VALUES (79, 2, 115);
INSERT INTO public.user_roles VALUES (80, 2, 116);
INSERT INTO public.user_roles VALUES (81, 2, 117);
INSERT INTO public.user_roles VALUES (82, 2, 118);
INSERT INTO public.user_roles VALUES (83, 2, 119);
INSERT INTO public.user_roles VALUES (84, 2, 120);


--
-- TOC entry 2974 (class 0 OID 331872)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (18, 'aldaba', 'Aldaba', '981 90 20 60', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', 'Develop', NULL, 3, 'info@aldaba.com', NULL, NULL, NULL, NULL, NULL, 'https://www.linkedin.com/company/aldaba/posts/?feedView=all', NULL);
INSERT INTO public.users VALUES (13, 'javimix5', 'Javier', '669332626', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', 'González', 'Prados', NULL, 'javinano@gmail.com', 'FullStack Developer', '1', 'hibrido', 'Estudiante de Desarrollo de Aplicaciones Multiplataforma, busco formar parte de un gran equipo de trabajo y seguir creciendo como desarrollador aplicando mis conocimientos en proyectos reales.', 'https://github.com/Javimix5', 'https://www.linkedin.com/in/javiergonzalezprados/', NULL);
INSERT INTO public.users VALUES (14, 'cinfo', 'Cinfo SL', '881 89 69 75', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 2, 'info@cinfo.com', NULL, NULL, NULL, NULL, NULL, 'https://www.linkedin.com/company/cinfotv/posts/?feedView=all', NULL);
INSERT INTO public.users VALUES (17, 'lukia', 'Lukia', '900 37 38 23', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 1, 'info@lukia.com', NULL, NULL, NULL, NULL, NULL, 'https://www.linkedin.com/company/luckia/', NULL);
INSERT INTO public.users VALUES (106, 'altia', 'Altia Consulting', '981 138 847', '$2a$10$7JqU98j9.KW3uioZhkS6d.sYAAuNSds4hVVOadIuD1E0U8WTYyZyO', NULL, NULL, 94, 'info@altia.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (120, 'atos', 'Atos', '981 559 054', '$2a$10$2jX8p3wDpirslKhsrdW6YuMfVHQf.igqLbmsq0Cy8bS9Ls1eSIKfe', NULL, NULL, 108, 'gabriel.torre@atos.net', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (61, 'imatia', 'Imatia', '881 242 970', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 52, 'contact@imatia.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (68, 'Ana', 'Ana', '654789015', '$2a$10$4nANut4B3wvGcDOYx3l/B.dvSWQUESgfMljjJBodrSo.FNteGimyC', 'García', 'Añón', NULL, 'ana@email.com', 'QA Tester', '100', 'hibrido', 'Estudiante de Desarrollo de Aplicaciones Multiplataforma, busco empresa para realizar prácticas y seguir creciendo como desarrollador aplicando mis conocimientos en proyectos reales.', 'https://github.com/Anabgar3105', '', NULL);
INSERT INTO public.users VALUES (16, 'demo', 'Laura', '999 111 222', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', 'Sevilla', 'García', NULL, 'laura@laura.com', 'Diseñadora Gráfica', '7', 'hibrido', 'Me llamo Laura y tengo 7 años de experiencia en diseño de Front con tecnologías como Angular o React', NULL, NULL, NULL);
INSERT INTO public.users VALUES (64, 'skull', 'SkullLabz', '+1 (213) 555-6669', '$2a$10$XtkSCn3cZFW.snvQZ7KnlOhiPJVKqcMAxgg9HTm05B3/ltVFyjqHm', NULL, NULL, 54, 'support@skulllabz.dev', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (21, 'NuriaC', 'Nuria', '606251191', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', 'Calo', 'Mosquera', NULL, 'nuriaC@nuria.com', 'FullStack Developer', '1', 'hibrido', 'Estudiante de Desarrollo de Aplicaciones Multiplataforma, busco empresa para realizar prácticas y seguir creciendo como desarrolladora aplicando mis conocimientos en proyectos reales.', 'https://github.com/nuriacalo', 'https://www.linkedin.com/in/nuria-c-396780163/', NULL);
INSERT INTO public.users VALUES (0, 'admin', 'Admin', '000000000', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', 'Boss', 'CEO', NULL, 'admin@admin.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (133, 'rocket', 'Rocket Corps SM', '981666151', '$2a$10$6Sa7MGM.5MxwyGhsTJtOQeC5g2vEhT3/GZSNdSKnGICNF/7/C5rue', NULL, NULL, 116, 'info@rocketcorps-sm.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (134, 'nando', 'Fernando', '666555444', '$2a$10$rUtETCwVHLpnt.yxLhP6QeNwAbh1E2Kl3gtYPflIPnM3Thp3BmXHG', 'Parga', 'Fernandez', NULL, '50nando05@gmail.com', 'FullStack Developer', '0', 'hibrido', 'Estudiando la FP desarrollo multiplataforma y busco empresa para realizar practicas', 'https://github.com/Nando5P', 'https://www.linkedin.com/in/fernando-parga-fernandez-1a67a5240/', NULL);
INSERT INTO public.users VALUES (65, 'flare', 'FlareStyle', '+33 1 55 55 9011', '$2a$10$HUYZlb28yZfJTd0M/exSJ.baFjfmTEXJWBGW8BpG03KcLL9R..RDO', NULL, NULL, 55, 'elegance@flarestyle.lux', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (67, 'alexbd', 'Alex', '999888777', '$2a$10$A4YQomwV04Oomc0CG0Vum.kmzre2416B2qEtchTS10ZdEtiNxPSku', 'Barbeito', 'Domínguez', NULL, 'alex@gmail.com', NULL, NULL, 'hibrido', NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (1, 'felice', 'Felice', '+34 612 345 678', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', 'Bolsteridge', 'Corran', NULL, 'felice@bolsteridge.com', 'Grado en Ingeniería Informática', '6', 'hibrido', 'Desarrolladora Fullstack con experiencia en la creación de aplicaciones web completas utilizando tecnologías modernas como React y Node.js. Apasionada por el desarrollo ágil y la mejora continua.', '', NULL, NULL);
INSERT INTO public.users VALUES (63, 'Aldair', 'Alejandro', '666666666', '$2a$10$T84bTPT275MztuctnBhAeOmCZ8kj8uhLVDYEeFStnQIyW0L1h7K0a', 'Azpeitia', 'Blanco', NULL, 'alejandro555azpeitia@gmail.com', 'FullStack', '1', 'presencial', 'Estudiante de FP Dual de Desarrollo de Aplicaciones Multiplataforma | Graduado en Diseño y Desarrollo de Videojuegos //Unity-Blender// | Creador de Contenido Audiovisual', 'https://github.com/Aldair-GL', 'https://www.linkedin.com/in/alejandro-azpeitia-53879b361/', NULL);
INSERT INTO public.users VALUES (58, 'aqua', 'AquaSystems™', '+1 (305) 555-7733', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 49, 'info@aquasystems.blue', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (62, 'galaxy', 'GalacticX', '+1 (646) 555-8888', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 53, 'outreach@galacticx.space', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (60, 'plasma', 'PlasmaWorks', '+1 (202) 555-7120', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 51, 'hello@plasmaworks.org', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (59, 'star', 'Starware Inc.	', '+1 (718) 555-2718', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 50, 'hello@starware.edu', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (107, 'bimbio', 'Bimbio', '', '$2a$10$JMc5n6baQXtAuTxReroPG.XZMSOUCbHoQD9LgOA8.Ooa0ueQoklU.', NULL, NULL, 95, 'hola@bimbio.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (108, 'plexus', 'Plexus', '981 57 64 94', '$2a$10$H2b0mwgub7jFgTkemhtmxOhm59cg7keMrVRzffOXALfZehgYVpPDe', NULL, NULL, 96, 'info@plexus.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (109, 'odeene', 'Odeene', '988 548 898', '$2a$10$DG2ukx/bktmAwtotWuZpWeAz7VnKj.VLsV4rWtt2x66HSX4ed4VJy', NULL, NULL, 97, 'info@odeene.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (111, 'enxenio', 'Enxenio', '981 55 02 12', '$2a$10$.wh3DbjamcxkCNEBEpji0eVC2In3VIhZaYNj8YWPyqHmdt/R7DbnK', NULL, NULL, 99, 'enxenio@enxenio.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (112, 'coremain', 'Coremain', '981 56 99 20', '$2a$10$DGM0bu9dIXoTjCpssN4mHupwKs9HpsYm2cCu4yJWtGUDn1D2JT8cC', NULL, NULL, 100, 'info@coremain.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (113, 'optareSolutions', 'Optare Solutions', '986 12 12 92', '$2a$10$oQ/YjmxT8saK3.gJd7OlRO0wgGYm5vwNzshQLHXH4INzw6k643TiK', NULL, NULL, 101, 'info@optaresolutions.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (115, 'indra', 'Indra Galicia', '981 18 62 00', '$2a$10$gXzz1i8if5OpmM8Frfb3U.LFTb2Knj6/tj6UC05sR7XT0xQfonDsa', NULL, NULL, 103, 'galicia@indra.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (116, 'rCable', 'R Cable y Telecomunic.', '981 91 00 00', '$2a$10$7HRSqvaJbCLC3MtPxwgueOP/SCGHv2BWTtFM1UOhkpn.nH5gPpUMG', NULL, NULL, 104, 'clientes@rcable.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (117, 'icarto', 'Icarto', '881 927 808', '$2a$10$PCqSpovw3.05yNdKZifyYuuaEU.rXdEtx8pB0EEWskPBbwSauL.qy', NULL, NULL, 105, 'info@icarto.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (118, 'sixtema', 'Sixtema', '981574724', '$2a$10$4FvuGJrImN8j68v8lMbS.O4cGz74vLGA.2qqbwe9FRaiUmTBwclkK', NULL, NULL, 106, 'info@sixtema.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (110, 'imaxin', 'Imaxin Software', '981 57 47 86', '$2a$10$ceXgzi4QR4T.HcrsiOtHwu/VPNqAoH.Kkgd/ENEjyaChoQ2yG3MhS', NULL, NULL, 98, 'contacto@imaxin.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (114, 'ticgal', 'Ticgal', '986 101 000', '$2a$10$hNOl.QJ8pBM5L0wl7Ibjau92eLoNX4C.WkNBlYMHWpADQyPzz9shy', NULL, NULL, 102, 'ola@ticgal.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (119, 'egatel', 'Egatel', '988 368 118', '$2a$10$MfVWFHP9jSSfvzTJAjfsI.t7Qm2GMcfFJtsU4kfGEAODP24menZDO', NULL, NULL, 107, 'egatel@egatel.es', NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 2990 (class 0 OID 0)
-- Dependencies: 196
-- Name: enterprise_ent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.enterprise_ent_id_seq', 116, true);


--
-- TOC entry 2991 (class 0 OID 0)
-- Dependencies: 206
-- Name: inscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inscriptions_id_seq', 135, true);


--
-- TOC entry 2992 (class 0 OID 0)
-- Dependencies: 204
-- Name: offers_off_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.offers_off_id_seq', 74, true);


--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 198
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 200
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 98, true);


--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 134, true);


--
-- TOC entry 2822 (class 2606 OID 331850)
-- Name: enterprise enterprise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enterprise
    ADD CONSTRAINT enterprise_pkey PRIMARY KEY (id);


--
-- TOC entry 2836 (class 2606 OID 332419)
-- Name: inscriptions inscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscriptions
    ADD CONSTRAINT inscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 2834 (class 2606 OID 331946)
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- TOC entry 2824 (class 2606 OID 331861)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2826 (class 2606 OID 331882)
-- Name: roles uk_hu987p8v0h1h21sd4n3bv3lp2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT uk_hu987p8v0h1h21sd4n3bv3lp2 UNIQUE (rolename);


--
-- TOC entry 2830 (class 2606 OID 332494)
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (login);


--
-- TOC entry 2828 (class 2606 OID 331869)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2832 (class 2606 OID 331880)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2837 (class 2606 OID 331883)
-- Name: user_roles fk61x3nvxbu49xad90tp9f8kmo1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk61x3nvxbu49xad90tp9f8kmo1 FOREIGN KEY (roleid) REFERENCES public.roles(id);


--
-- TOC entry 2838 (class 2606 OID 332583)
-- Name: user_roles fk_user_roles_role; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_user_roles_role FOREIGN KEY (roleid) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 2839 (class 2606 OID 332613)
-- Name: user_roles fk_user_roles_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_user_roles_user FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 2841 (class 2606 OID 332608)
-- Name: users fk_users_enterprise; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_enterprise FOREIGN KEY (enterpriseid) REFERENCES public.enterprise(id) ON DELETE CASCADE;


--
-- TOC entry 2840 (class 2606 OID 331888)
-- Name: user_roles fkk3qtke64s9k5pv5hoq6yyq7py; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkk3qtke64s9k5pv5hoq6yyq7py FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 2844 (class 2606 OID 332420)
-- Name: inscriptions inscriptions_offerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscriptions
    ADD CONSTRAINT inscriptions_offerid_fkey FOREIGN KEY (offerid) REFERENCES public.offers(id);


--
-- TOC entry 2845 (class 2606 OID 332425)
-- Name: inscriptions inscriptions_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inscriptions
    ADD CONSTRAINT inscriptions_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 2843 (class 2606 OID 332658)
-- Name: offers offers_enterprise_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_enterprise_fk FOREIGN KEY (enterpriseid) REFERENCES public.enterprise(id);


--
-- TOC entry 2842 (class 2606 OID 332132)
-- Name: users users_enterprise_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_enterprise_fk FOREIGN KEY (enterpriseid) REFERENCES public.enterprise(id);


-- Completed on 2025-07-30 14:17:14

--
-- PostgreSQL database dump complete
--

