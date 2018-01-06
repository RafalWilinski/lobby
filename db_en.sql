
CREATE TABLE "Applications"
(
    status VARCHAR(30) NOT NULL,
    description VARCHAR(250),
    login VARCHAR(30) NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "Applications" ADD CONSTRAINT applicationPk PRIMARY KEY ( login, "roleId" );
CREATE TABLE "Branches"
(
    name VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "Branches" ADD CONSTRAINT branchPk PRIMARY KEY ( name );
CREATE TABLE "Promoters"
(
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "Promoters" ADD CONSTRAINT promoterPk PRIMARY KEY ("firstName", "lastName");
CREATE TABLE "PromoterBranches"
(
    "promoterFirstName" VARCHAR(30) NOT NULL,
    "promoterLastName" VARCHAR(30) NOT NULL,
    "branchName" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "PromoterBranches"
    ADD CONSTRAINT promoterBranchPk PRIMARY KEY ( "promoterFirstName",
    "promoterLastName",
    "branchName" );
CREATE TABLE "PromoterThesises"
(
    "promoterFirstName" VARCHAR(30) NOT NULL,
    "promoterLastName" VARCHAR(30) NOT NULL,
    "thesisId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "PromoterThesises"
    ADD CONSTRAINT promoterThesisPk PRIMARY KEY ( "promoterFirstName",
    "promoterLastName",
    "thesisId" );
CREATE TABLE "Skills"
(
    name VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "Skills" ADD CONSTRAINT skillPk PRIMARY KEY ( name );
CREATE TABLE "Theses"
(
    id SERIAL,
    name VARCHAR(150) NOT NULL,
    "numberOfRoles" INTEGER NOT NULL,
    description VARCHAR(250),
    isPublic BOOLEAN NOT NULL,
    photo VARCHAR(250),
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "Theses" ADD CONSTRAINT thesisPk PRIMARY KEY ( id );
CREATE TABLE "ThesisBranches"
(
    "thesisId" INTEGER NOT NULL,
    "branchName" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "ThesisBranches" ADD CONSTRAINT thesisBranchPk PRIMARY KEY ( "thesisId",
"branchName" );
CREATE TABLE "ThesisSkills"
(
    "thesisId" INTEGER NOT NULL,
    "skillName" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "ThesisSkills" ADD CONSTRAINT thesisSkillPk PRIMARY KEY ( "thesisId",
"skillName" );
CREATE TABLE "Users"
(
    login VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(30),
    "lastName" VARCHAR(30),
    "studentId" INTEGER,
    "description" TEXT,
    picture VARCHAR(100),
    "roleId" INTEGER,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX userIdx ON
    "Users" ( "roleId" ASC );
ALTER TABLE "Users" ADD CONSTRAINT userPk PRIMARY KEY ( login );
CREATE TABLE "UserBranches"
(
    "userLogin" VARCHAR(30) NOT NULL,
    "branchName" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "UserBranches" ADD CONSTRAINT userBranchPk PRIMARY KEY ( "userLogin",
"branchName" );
CREATE TABLE "UserSkills"
(
    priority INTEGER NOT NULL,
    "userLogin" VARCHAR(30) NOT NULL,
    "skillName" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "UserSkills" ADD CONSTRAINT userSkillPk PRIMARY KEY ( "userLogin", "skillName" );
CREATE TABLE "Roles"
(
    id SERIAL,
    name VARCHAR(30),
    capitan BOOLEAN NOT NULL,
    description VARCHAR(250),
    "userLogin" VARCHAR(30),
    "thesisId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);

ALTER TABLE "Roles" ADD CONSTRAINT rolePk PRIMARY KEY ( id );
CREATE TABLE "RoleSkills"
(
    "skillName" VARCHAR(50) NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE "RoleSkills" ADD CONSTRAINT roleSkillPk PRIMARY KEY ( "skillName", "roleId" );
ALTER TABLE "Applications"
    ADD CONSTRAINT applicationUserFk FOREIGN KEY ( login )
        REFERENCES "Users" ( login );
ALTER TABLE "Applications"
    ADD CONSTRAINT applicationRoleFk FOREIGN KEY ( "roleId" )
        REFERENCES "Roles" ( id );
ALTER TABLE "PromoterBranches"
    ADD CONSTRAINT promoterBranchBranchFk FOREIGN KEY ( "branchName" )
        REFERENCES "Branches" ( name );
ALTER TABLE "PromoterBranches"
    ADD CONSTRAINT promoterBranchPromoterFk FOREIGN KEY ( "promoterFirstName",
    "promoterLastName" )
        REFERENCES "Promoters" ( "firstName", "lastName" );
ALTER TABLE "PromoterThesises"
    ADD CONSTRAINT promoterThesisPromoterFk FOREIGN KEY ( "promoterFirstName",
    "promoterLastName" )
        REFERENCES "Promoters" ( "firstName", "lastName" );
ALTER TABLE "PromoterThesises"
    ADD CONSTRAINT promoterThesisThesisFk FOREIGN KEY ( "thesisId" )
        REFERENCES "Theses" ( id );
ALTER TABLE "ThesisBranches"
    ADD CONSTRAINT thesisBranchBranchFk FOREIGN KEY ( "branchName" )
        REFERENCES "Branches" ( name );
ALTER TABLE "ThesisBranches"
    ADD CONSTRAINT thesisBranchThesisFk FOREIGN KEY ( "thesisId" )
        REFERENCES "Theses" ( id );
ALTER TABLE "ThesisSkills"
    ADD CONSTRAINT thesisSkillSkillFk FOREIGN KEY ( "skillName" )
        REFERENCES "Skills" ( name );
ALTER TABLE "ThesisSkills"
    ADD CONSTRAINT thesisSkillThesisFk FOREIGN KEY ( "thesisId" )
        REFERENCES "Theses" ( id );
ALTER TABLE "UserBranches"
    ADD CONSTRAINT userBranchBranchFk FOREIGN KEY ( "branchName" )
        REFERENCES "Branches" ( name );
ALTER TABLE "UserBranches"
    ADD CONSTRAINT userBranchUserFk FOREIGN KEY ( "userLogin" )
        REFERENCES "Users" ( login );
ALTER TABLE "UserSkills"
    ADD CONSTRAINT userSkillSkillFk FOREIGN KEY ( "skillName" )
        REFERENCES "Skills" ( name );
ALTER TABLE "UserSkills"
    ADD CONSTRAINT userSkillUserFk FOREIGN KEY ( "userLogin" )
        REFERENCES "Users" ( login );
ALTER TABLE "Users"
    ADD CONSTRAINT userRoleFk FOREIGN KEY ( "roleId" )
        REFERENCES "Roles" ( id );
ALTER TABLE "RoleSkills"
    ADD CONSTRAINT roleSkillSkillFk FOREIGN KEY ( "skillName" )
        REFERENCES "Skills" ( name );
ALTER TABLE "RoleSkills"
    ADD CONSTRAINT roleSkillRoleFk FOREIGN KEY ( "roleId" )
        REFERENCES "Roles" ( id );
ALTER TABLE "Roles"
    ADD CONSTRAINT roleThesisFk FOREIGN KEY ( "thesisId" )
        REFERENCES "Theses" ( id );
ALTER TABLE "Roles"
    ADD CONSTRAINT roleUserFk FOREIGN KEY ( "userLogin" )
        REFERENCES "Users" ( login );
