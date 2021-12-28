CREATE DATABASE jobscheduler OWNER postgres ENCODING UTF8 tablespace pg_default; 
\connect jobscheduler
CREATE TABLE IF NOT EXISTS scheduler_configurations (
    id serial PRIMARY KEY NOT NULL,
    "user" varchar(200) NOT NULL,
    "schedulerType" int NOT NULL,
    "occurs" int NOT NULL,
    "enabled" boolean NOT NULL,
    "onceDate" date,
    "limitStartDate" date NOT NULL,
    "limitEndDate" date,
    "frecuency" int,
    "occursOnceTime" time,
    "startTime" time,
    "endTime" date,
    "occursEveryNumber" int,
    "timeUnit" int,
    "weekConfig" int,
    "numberWeeks" int,
    "frecuencyType" int,
    "day" int,
    "everyMonths" int,
    "frecuencyVariableDay" int,
    "variableDayType" int
);

INSERT INTO scheduler_configurations ("user","schedulerType","occurs","enabled","onceDate","limitStartDate")
VALUES ('mario.r21@gmail.com',0,0,true,'05-04-2021','01-01-2020');