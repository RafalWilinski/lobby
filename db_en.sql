
CREATE TABLE application
(
    status VARCHAR(30) NOT NULL,
    description VARCHAR(250),
    login VARCHAR(30) NOT NULL,
    roleId INTEGER NOT NULL
);
ALTER TABLE application ADD CONSTRAINT applicationPk PRIMARY KEY ( login, roleId );
CREATE TABLE branch
(
    name VARCHAR(50) NOT NULL
);
ALTER TABLE branch ADD CONSTRAINT branchPk PRIMARY KEY ( name );
CREATE TABLE promoter
(
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL
);
ALTER TABLE promoter ADD CONSTRAINT promoterPk PRIMARY KEY (firstName, lastName);
CREATE TABLE promoterBranch
(
    promoterFirstName VARCHAR(30) NOT NULL,
    promoterLastName VARCHAR(30) NOT NULL,
    branchName VARCHAR(50) NOT NULL
);
ALTER TABLE promoterBranch
    ADD CONSTRAINT promoterBranchPk PRIMARY KEY ( promoterFirstName,
    promoterLastName,
    branchName );
CREATE TABLE promoterThesis
(
    promoterFirstName VARCHAR(30) NOT NULL,
    promoterLastName VARCHAR(30) NOT NULL,
    thesisId INTEGER NOT NULL
);
ALTER TABLE promoterThesis
    ADD CONSTRAINT promoterThesisPk PRIMARY KEY ( promoterFirstName,
    promoterLastName,
    thesisId );
CREATE TABLE skill
(
    name VARCHAR(50) NOT NULL
);
ALTER TABLE skill ADD CONSTRAINT skillPk PRIMARY KEY ( name );
CREATE TABLE thesis
(
    id SERIAL,
    name VARCHAR(150) NOT NULL,
    numberOfRoles INTEGER NOT NULL,
    description VARCHAR(250),
    photo VARCHAR(250)
);
ALTER TABLE thesis ADD CONSTRAINT thesisPk PRIMARY KEY ( id );
CREATE TABLE thesisBranch
(
    thesisId INTEGER NOT NULL,
    branchName VARCHAR(50) NOT NULL
);
ALTER TABLE thesisBranch ADD CONSTRAINT thesisBranchPk PRIMARY KEY ( thesisId,
branchName );
CREATE TABLE thesisSkill
(
    thesisId INTEGER NOT NULL,
    skillName VARCHAR(50) NOT NULL
);
ALTER TABLE thesisSkill ADD CONSTRAINT thesisSkillPk PRIMARY KEY ( thesisId,
skillName );
CREATE TABLE "user"
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
    "user" ( roleId ASC );
ALTER TABLE "user" ADD CONSTRAINT userPk PRIMARY KEY ( login );
CREATE TABLE userBranch
(
    userLogin VARCHAR(30) NOT NULL,
    branchName VARCHAR(50) NOT NULL
);
ALTER TABLE userBranch ADD CONSTRAINT userBranchPk PRIMARY KEY ( userLogin,
branchName );
CREATE TABLE userSkill
(
    priority INTEGER NOT NULL,
    userLogin VARCHAR(30) NOT NULL,
    skillName VARCHAR(50) NOT NULL
);
ALTER TABLE userSkill ADD CONSTRAINT userSkillPk PRIMARY KEY ( userLogin,
skillName );
CREATE TABLE role
(
    id SERIAL,
    capitan BOOLEAN NOT NULL,
    description VARCHAR(250),
    userLogin VARCHAR(30),
    thesisId INTEGER NOT NULL
);
CREATE UNIQUE INDEX roleIdx ON
    role ( userLogin ASC );
ALTER TABLE role ADD CONSTRAINT rolePk PRIMARY KEY ( id );
CREATE TABLE roleSkill
(
    skillName VARCHAR(50) NOT NULL,
    roleId INTEGER NOT NULL
);
ALTER TABLE roleSkill ADD CONSTRAINT roleSkillPk PRIMARY KEY ( skillName,
roleId );
ALTER TABLE application
    ADD CONSTRAINT applicationUserFk FOREIGN KEY ( login )
        REFERENCES "user" ( login );
ALTER TABLE application
    ADD CONSTRAINT applicationRoleFk FOREIGN KEY ( roleId )
        REFERENCES role ( id );
ALTER TABLE promoterBranch
    ADD CONSTRAINT promoterBranchBranchFk FOREIGN KEY ( branchName )
        REFERENCES branch ( name );
ALTER TABLE promoterBranch
    ADD CONSTRAINT promoterBranchPromoterFk FOREIGN KEY ( promoterFirstName,
    promoterLastName )
        REFERENCES promoter ( firstName,
        lastName );
ALTER TABLE promoterThesis
    ADD CONSTRAINT promoterThesisPromoterFk FOREIGN KEY ( promoterFirstName,
    promoterLastName )
        REFERENCES promoter ( firstName,
        lastName );
ALTER TABLE promoterThesis
    ADD CONSTRAINT promoterThesisThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesis ( id );
ALTER TABLE thesisBranch
    ADD CONSTRAINT thesisBranchBranchFk FOREIGN KEY ( branchName )
        REFERENCES branch ( name );
ALTER TABLE thesisBranch
    ADD CONSTRAINT thesisBranchThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesis ( id );
ALTER TABLE thesisSkill
    ADD CONSTRAINT thesisSkillSkillFk FOREIGN KEY ( skillName )
        REFERENCES skill ( name );
ALTER TABLE thesisSkill
    ADD CONSTRAINT thesisSkillThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesis ( id );
ALTER TABLE userBranch
    ADD CONSTRAINT userBranchBranchFk FOREIGN KEY ( branchName )
        REFERENCES branch ( name );
ALTER TABLE userBranch
    ADD CONSTRAINT userBranchUserFk FOREIGN KEY ( userLogin )
        REFERENCES "user" ( login );
ALTER TABLE userSkill
    ADD CONSTRAINT userSkillSkillFk FOREIGN KEY ( skillName )
        REFERENCES skill ( name );
ALTER TABLE userSkill
    ADD CONSTRAINT userSkillUserFk FOREIGN KEY ( userLogin )
        REFERENCES "user" ( login );
ALTER TABLE "user"
    ADD CONSTRAINT userRoleFk FOREIGN KEY ( roleId )
        REFERENCES role ( id );
ALTER TABLE roleSkill
    ADD CONSTRAINT roleSkillSkillFk FOREIGN KEY ( skillName )
        REFERENCES skill ( name );
ALTER TABLE roleSkill
    ADD CONSTRAINT roleSkillRoleFk FOREIGN KEY ( roleId )
        REFERENCES role ( id );
ALTER TABLE role
    ADD CONSTRAINT roleThesisFk FOREIGN KEY ( thesisId )
        REFERENCES thesis ( id );
ALTER TABLE role
    ADD CONSTRAINT roleUserFk FOREIGN KEY ( userLogin )
        REFERENCES "user" ( login );
