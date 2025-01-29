CREATE TABLE "mytable" (
  "_id.$oid" text,
  "username" text,
  "password" text,
  "role" text,
  "__v" bigint
);

INSERT INTO "mytable" ("_id.$oid","username","password","role","__v")
VALUES
('67986bd351da2127314acb56','admin','$2a$08$6fgB0NcQL879KlybbKFNU.CgRPWYHr3UXdIwcTOZZumuKZ9diBORW','admin',0),
('67986c969000999ae2d5a706','aman','$2a$08$vpBVc0AeMxCPiKUFma0jneT2u3NrfO/avviMaahIb7j5GL63j6jki','user',0),
('67986d4581194900bf3c78ea','kedar','$2a$08$mEe2hoWprJAi9aLm.56MYuq7ObZ3hiDDHiOz9Sdx/AXMGZX7oMu0S','staff',0),
('6798716e350f6d170717b495','rohan','$2a$08$uUeK.zYSFr.vNE4ffoD3s.NI22S8DSx46mX7YNcoYeFJCaMp4IXu2','staff',0),
('6798747b2d5fdcd9ff5e958d','vendor','$2a$08$AP9u92zsTL3HXKHXPxeknuu31o195aAObaQXqS5BiOrMMlacCafdy','vendor',0),
('67987a073fd28d2023c03b42','vendor2','$2a$08$p8ltTZsl.pMcYDRkc6uYHuC85VdSmWsqYr1cyRTXtHlHx3VHPEiBC','vendor',0),
('67987a3b567565f1a476808a','vendor233','$2a$08$ByGqvqOBz.XBBtRhYJWuXugG2SlPQx1jeYNh7Th4xycRrpXIFwH1m','vendor',0),
('67988bd39fb6f76c560f120c','vendor3','$2a$08$Q4oOW.34z/HRabj7VwMgyukupYNo6/KtKop9xemmAZ7vhSmpCwP9m','vendor',0),
('6798ae67d440f0bcc1844f77','vendortest','$2a$08$NacnAXAgArpAE6xfASCYQODpNHX/UGcE7mGVStrH3yZUy36yiXxla','vendor',0),
('6798b6af81207d679a3ef299','aman2','$2a$08$ElZ.5zSNXCcjXgdtiVhpW.TyoI6rxgVaqobkKj8n.fpLKJGaLjx0O','user',0),
('6798c668e29ad99c60c973c6','kedar2','$2a$08$7.BRiC.SE2agshKCkSSDkunZDduKI99U3BIf49izaGirp68PLkmkC','user',0);
