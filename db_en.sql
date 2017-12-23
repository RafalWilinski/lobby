
CREATE TABLE applications
(
    status VARCHAR(30) NOT NULL,
    description VARCHAR(250),
    login VARCHAR(30) NOT NULL,
    roleId INTEGER NOT NULL
);
ALTER TABLE applications ADD CONSTRAINT applicationPk PRIMARY KEY ( login, roleId );
CREATE TABLE branches
(
    name VARCHAR(50) NOT NULL
);
ALTER TABLE branches ADD CONSTRAINT branchPk PRIMARY KEY ( name );
CREATE TABLE promoters
(
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL
);
ALTER TABLE promoters ADD CONSTRAINT promoterPk PRIMARY KEY (firstName, lastName);
CREATE TABLE promoterBranches
(
    promoterFirstName VARCHAR(30) NOT NULL,
    promoterLastName VARCHAR(30) NOT NULL,
    branchName VARCHAR(50) NOT NULL
);
ALTER TABLE promoterBranches
    ADD CONSTRAINT promoterBranchPk PRIMARY KEY ( promoterFirstName,
    promoterLastName,
    branchName );
CREATE TABLE promoterThesises
(
    promoterFirstName VARCHAR(30) NOT NULL,
    promoterLastName VARCHAR(30) NOT NULL,
    thesisId INTEGER NOT NULL
);
ALTER TABLE promoterThesises
    ADD CONSTRAINT promoterThesisPk PRIMARY KEY ( promoterFirstName,
    promoterLastName,
    thesisId );
CREATE TABLE skills
(
    name VARCHAR(50) NOT NULL
);
ALTER TABLE skills ADD CONSTRAINT skillPk PRIMARY KEY ( name );
CREATE TABLE thesises
(
    id SERIAL,
    name VARCHAR(150) NOT NULL,
    numberOfRoles INTEGER NOT NULL,
    description VARCHAR(250),
    photo VARCHAR(250)
);
ALTER TABLE thesises ADD CONSTRAINT thesisPk PRIMARY KEY ( id );
CREATE TABLE thesisBranches
(
    thesisId INTEGER NOT NULL,
    branchName VARCHAR(50) NOT NULL
);
ALTER TABLE thesisBranches ADD CONSTRAINT thesisBranchPk PRIMARY KEY ( thesisId,
branchName );
CREATE TABLE thesisSkills
(
    thesisId INTEGER NOT NULL,
    skillName VARCHAR(50) NOT NULL
);
ALTER TABLE thesisSkills ADD CONSTRAINT thesisSkillPk PRIMARY KEY ( thesisId,
skillName );
CREATE TABLE "users"
(
    login VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    studentId INTEGER,
    picture VARCHAR(100),
    roleId INTEGER
);
CREATE UNIQUE INDEX userIdx ON
    "users" ( roleId ASC );
ALTER TABLE "users" ADD CONSTRAINT userPk PRIMARY KEY ( login );
CREATE TABLE userBranches
(
    userLogin VARCHAR(30) NOT NULL,
    branchName VARCHAR(50) NOT NULL
);
ALTER TABLE userBranches ADD CONSTRAINT userBranchPk PRIMARY KEY ( userLogin,
branchName );
CREATE TABLE userSkills
(
    priority INTEGER NOT NULL,
    userLogin VARCHAR(30) NOT NULL,
    skillName VARCHAR(50) NOT NULL
);
ALTER TABLE userSkills ADD CONSTRAINT userSkillPk PRIMARY KEY ( userLogin,
skillName );
CREATE TABLE roles
(
    id SERIAL,
    capitan BOOLEAN NOT NULL,
    description VARCHAR(250),
    userLogin VARCHAR(30),
    thesisId INTEGER NOT NULL
);
CREATE UNIQUE INDEX roleIdx ON
    roles ( userLogin ASC );
ALTER TABLE roles ADD CONSTRAINT rolePk PRIMARY KEY ( id );
CREATE TABLE roleSkills
(
    skillName VARCHAR(50) NOT NULL,
    roleId INTEGER NOT NULL
);
ALTER TABLE roleSkills ADD CONSTRAINT roleSkillPk PRIMARY KEY ( skillName,
roleId );
ALTER TABLE applications
    ADD CONSTRAINT applicationUserFk FOREIGN KEY ( login )
        REFERENCES "users" ( login );
ALTER TABLE applications
    ADD CONSTRAINT applicationRoleFk FOREIGN KEY ( roleId )
        REFERENCES roles ( id );
ALTER TABLE promoterBranches
    ADD CONSTRAINT promoterBranchBranchFk FOREIGN KEY ( branchName )
        REFERENCES branches ( name );
ALTER TABLE promoterBranches
    ADD CONSTRAINT promoterBranchPromoterFk FOREIGN KEY ( promoterFirstName,
    promoterLastName )
        REFERENCES promoters ( firstName,
        lastName );
ALTER TABLE promoterThesises
    ADD CONSTRAINT promoterThesisPromoterFk FOREIGN KEY ( promoterFirstName,
    promoterLastName )
        REFERENCES promoters ( firstName,
        lastName );
ALTER TABLE promoterThesises
    ADD CONSTRAINT promoterThesisThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesises ( id );
ALTER TABLE thesisBranches
    ADD CONSTRAINT thesisBranchBranchFk FOREIGN KEY ( branchName )
        REFERENCES branches ( name );
ALTER TABLE thesisBranches
    ADD CONSTRAINT thesisBranchThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesises ( id );
ALTER TABLE thesisSkills
    ADD CONSTRAINT thesisSkillSkillFk FOREIGN KEY ( skillName )
        REFERENCES skills ( name );
ALTER TABLE thesisSkills
    ADD CONSTRAINT thesisSkillThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesises ( id );
ALTER TABLE userBranches
    ADD CONSTRAINT userBranchBranchFk FOREIGN KEY ( branchName )
        REFERENCES branches ( name );
ALTER TABLE userBranches
    ADD CONSTRAINT userBranchUserFk FOREIGN KEY ( userLogin )
        REFERENCES "users" ( login );
ALTER TABLE userSkills
    ADD CONSTRAINT userSkillSkillFk FOREIGN KEY ( skillName )
        REFERENCES skills ( name );
ALTER TABLE userSkills
    ADD CONSTRAINT userSkillUserFk FOREIGN KEY ( userLogin )
        REFERENCES "users" ( login );
ALTER TABLE "users"
    ADD CONSTRAINT userRoleFk FOREIGN KEY ( roleId )
        REFERENCES roles ( id );
ALTER TABLE roleSkills
    ADD CONSTRAINT roleSkillSkillFk FOREIGN KEY ( skillName )
        REFERENCES skills ( name );
ALTER TABLE roleSkills
    ADD CONSTRAINT roleSkillRoleFk FOREIGN KEY ( roleId )
        REFERENCES roles ( id );
ALTER TABLE roles
    ADD CONSTRAINT roleThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesises ( id );
ALTER TABLE roles
    ADD CONSTRAINT roleUserFk FOREIGN KEY ( userLogin )
        REFERENCES "users" ( login );
