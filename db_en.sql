CREATE TABLE application (
    status        VARCHAR(30) NOT NULL,
    description   VARCHAR(250),
    user_login    VARCHAR(30) NOT NULL,
    vacancy_id    INTEGER NOT NULL
);

ALTER TABLE application ADD CONSTRAINT application_pk PRIMARY KEY ( user_login,
vacancy_id );

CREATE TABLE branch (
    name   VARCHAR(50) NOT NULL
);

ALTER TABLE branch ADD CONSTRAINT branch_pk PRIMARY KEY ( name );

CREATE TABLE promoter (
    first_name   VARCHAR(30) NOT NULL,
    last_name    VARCHAR(30) NOT NULL
);

ALTER TABLE promoter ADD CONSTRAINT promoter_pk PRIMARY KEY ( first_name,
last_name );

CREATE TABLE promoter_branch (
    promoter_first_name   VARCHAR(30) NOT NULL,
    promoter_last_name    VARCHAR(30) NOT NULL,
    branch_name           VARCHAR(50) NOT NULL
);

ALTER TABLE promoter_branch
    ADD CONSTRAINT promoter_branch_pk PRIMARY KEY ( promoter_first_name,
    promoter_last_name,
    branch_name );

CREATE TABLE promoter_thesis (
    promoter_first_name   VARCHAR(30) NOT NULL,
    promoter_last_name    VARCHAR(30) NOT NULL,
    thesis_id              INTEGER NOT NULL
);

ALTER TABLE promoter_thesis
    ADD CONSTRAINT promoter_thesis_pk PRIMARY KEY ( promoter_first_name,
    promoter_last_name,
    thesis_id );

CREATE TABLE skill (
    name   VARCHAR(50) NOT NULL
);

ALTER TABLE skill ADD CONSTRAINT skill_pk PRIMARY KEY ( name );

CREATE TABLE thesis (
    id                    INTEGER NOT NULL,
    name                  VARCHAR(150) NOT NULL,
    number_of_vacancies   INTEGER NOT NULL,
    description           VARCHAR(250),
    photo                 BYTEA
);

ALTER TABLE thesis ADD CONSTRAINT thesis_pk PRIMARY KEY ( id );

CREATE TABLE thesis_branch (
    thesis_id      INTEGER NOT NULL,
    branch_name   VARCHAR(50) NOT NULL
);

ALTER TABLE thesis_branch ADD CONSTRAINT thesis_branch_pk PRIMARY KEY ( thesis_id,
branch_name );

CREATE TABLE thesis_skill (
    thesis_id     INTEGER NOT NULL,
    skill_name   VARCHAR(50) NOT NULL
);

ALTER TABLE thesis_skill ADD CONSTRAINT thesis_skill_pk PRIMARY KEY ( thesis_id,
skill_name );

CREATE TABLE "User" (
    login        VARCHAR(30) NOT NULL,
    password     VARCHAR(30) NOT NULL,
    first_name   VARCHAR(30) NOT NULL,
    last_name    VARCHAR(30) NOT NULL,
    student_id   INTEGER NOT NULL,
    vacancy_id   INTEGER
);

CREATE UNIQUE INDEX user__idx ON
    "User" ( vacancy_id ASC );

ALTER TABLE "User" ADD CONSTRAINT user_pk PRIMARY KEY ( login );

CREATE TABLE user_branch (
    user_login    VARCHAR(30) NOT NULL,
    branch_name   VARCHAR(50) NOT NULL
);

ALTER TABLE user_branch ADD CONSTRAINT user_branch_pk PRIMARY KEY ( user_login,
branch_name );

CREATE TABLE user_skill (
    priority     INTEGER NOT NULL,
    user_login   VARCHAR(30) NOT NULL,
    skill_name   VARCHAR(50) NOT NULL
);

ALTER TABLE user_skill ADD CONSTRAINT user_skill_pk PRIMARY KEY ( user_login,
skill_name );

CREATE TABLE vacancy (
    id            INTEGER NOT NULL,
    capitan       BOOLEAN NOT NULL,
    description   VARCHAR(250),
    user_login    VARCHAR(30),
    thesis_id      INTEGER NOT NULL
);

CREATE UNIQUE INDEX vacancy__idx ON
    vacancy ( user_login ASC );

ALTER TABLE vacancy ADD CONSTRAINT vacancy_pk PRIMARY KEY ( id );

CREATE TABLE vacancy_skill (
    skill_name   VARCHAR(50) NOT NULL,
    vacancy_id   INTEGER NOT NULL
);

ALTER TABLE vacancy_skill ADD CONSTRAINT vacancy_skill_pk PRIMARY KEY ( skill_name,
vacancy_id );

ALTER TABLE application
    ADD CONSTRAINT application_user_fk FOREIGN KEY ( user_login )
        REFERENCES "User" ( login );

ALTER TABLE application
    ADD CONSTRAINT application_vacancy_fk FOREIGN KEY ( vacancy_id )
        REFERENCES vacancy ( id );

ALTER TABLE promoter_branch
    ADD CONSTRAINT promoter_branch_branch_fk FOREIGN KEY ( branch_name )
        REFERENCES branch ( name );

ALTER TABLE promoter_branch
    ADD CONSTRAINT promoter_branch_promoter_fk FOREIGN KEY ( promoter_first_name,
    promoter_last_name )
        REFERENCES promoter ( first_name,
        last_name );

ALTER TABLE promoter_thesis
    ADD CONSTRAINT promoter_thesis_promoter_fk FOREIGN KEY ( promoter_first_name,
    promoter_last_name )
        REFERENCES promoter ( first_name,
        last_name );

ALTER TABLE promoter_thesis
    ADD CONSTRAINT promoter_thesis_thesis_fk FOREIGN KEY ( thesis_id )
        REFERENCES thesis ( id );

ALTER TABLE thesis_branch
    ADD CONSTRAINT thesis_branch_branch_fk FOREIGN KEY ( branch_name )
        REFERENCES branch ( name );

ALTER TABLE thesis_branch
    ADD CONSTRAINT thesis_branch_thesis_fk FOREIGN KEY ( thesis_id )
        REFERENCES thesis ( id );

ALTER TABLE thesis_skill
    ADD CONSTRAINT thesis_skill_skill_fk FOREIGN KEY ( skill_name )
        REFERENCES skill ( name );

ALTER TABLE thesis_skill
    ADD CONSTRAINT thesis_skill_thesis_fk FOREIGN KEY ( thesis_id )
        REFERENCES thesis ( id );

ALTER TABLE user_branch
    ADD CONSTRAINT user_branch_branch_fk FOREIGN KEY ( branch_name )
        REFERENCES branch ( name );

ALTER TABLE user_branch
    ADD CONSTRAINT user_branch_user_fk FOREIGN KEY ( user_login )
        REFERENCES "User" ( login );

ALTER TABLE user_skill
    ADD CONSTRAINT user_skill_skill_fk FOREIGN KEY ( skill_name )
        REFERENCES skill ( name );

ALTER TABLE user_skill
    ADD CONSTRAINT user_skill_user_fk FOREIGN KEY ( user_login )
        REFERENCES "User" ( login );

ALTER TABLE "User"
    ADD CONSTRAINT user_vacancy_fk FOREIGN KEY ( vacancy_id )
        REFERENCES vacancy ( id );

ALTER TABLE vacancy_skill
    ADD CONSTRAINT vacancy_skill_skill_fk FOREIGN KEY ( skill_name )
        REFERENCES skill ( name );

ALTER TABLE vacancy_skill
    ADD CONSTRAINT vacancy_skill_vacancy_fk FOREIGN KEY ( vacancy_id )
        REFERENCES vacancy ( id );

ALTER TABLE vacancy
    ADD CONSTRAINT vacancy_thesis_fk FOREIGN KEY ( thesis_id )
        REFERENCES thesis ( id );

ALTER TABLE vacancy
    ADD CONSTRAINT vacancy_user_fk FOREIGN KEY ( user_login )
        REFERENCES "User" ( login );
