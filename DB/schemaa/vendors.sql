CREATE TABLE "mytable" (
  "_id.$oid" text,
  "name" text,
  "user.$oid" text,
  "__v" bigint
);

INSERT INTO "mytable" ("_id.$oid","name","user.$oid","__v")
VALUES
('67987a3b567565f1a476808c','vendor233','67987a3b567565f1a476808a',0),
('67988bd39fb6f76c560f120e','vendor3','67988bd39fb6f76c560f120c',0),
('6798ae67d440f0bcc1844f79','vendortest','6798ae67d440f0bcc1844f77',0);
