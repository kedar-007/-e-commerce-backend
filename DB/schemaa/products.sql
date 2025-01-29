CREATE TABLE "mytable" (
  "_id.$oid" text,
  "name" text,
  "description" text,
  "category" text,
  "startDate.$date" text,
  "expiryDate.$date" text,
  "deliveryOption" text,
  "deliveryAmount" bigint,
  "images" json,
  "oldPrice" double precision,
  "newPrice" double precision,
  "productURL" text,
  "vendor.$oid" text,
  "__v" bigint
);

INSERT INTO "mytable" ("_id.$oid","name","description","category","startDate.$date","expiryDate.$date","deliveryOption","deliveryAmount","images","oldPrice","newPrice","productURL","vendor.$oid","__v")
VALUES
('67987ffd73175fa4b77dff91','Smartphone X','Latest smartphone with 128GB storage','Electronics','2025-01-01T00:00:00.000Z','2025-01-08T00:00:00.000Z','Free Delivery',0,'["image1.jpg","image2.jpg"]',499.99,399.99,'https://example.com/products/smartphone-x','67987a3b567565f1a476808c',0),
('6798860014184840bd0c674e','TV','Latest TV with 128GB storage','Electronics','2025-01-01T00:00:00.000Z','2025-01-08T00:00:00.000Z','Free Delivery',0,'["image1.jpg","image2.jpg"]',499.99,399.99,'https://example.com/products/smartphone-xtt','67987a3b567565f1a476808c',0),
('6798aa0f89f738605ad3f249','TV','Latest TV with 128GB storage','Electronics','2025-01-01T00:00:00.000Z','2025-01-08T00:00:00.000Z','Free Delivery',0,'["image1.jpg","image2.jpg"]',499.99,399.99,'https://example.com/products/smartphone-xtt5555','67987a3b567565f1a476808c',0),
('6798ad01d440f0bcc1844f6e','iphone 16','Latest TV with 128GB storage','Electronics','2025-01-01T00:00:00.000Z','2025-01-08T00:00:00.000Z','Free Delivery',0,'["image1.jpg","image2.jpg"]',499.99,399.99,'https://example.com/products/smartphone-xtt5555s','67987a3b567565f1a476808c',0),
('6798b0f28fa2d323a1b10159','Meredes','Latest TV with 128GB storage','Electronics','2025-01-01T00:00:00.000Z','2025-01-08T00:00:00.000Z','Free Delivery',0,'["image1.jpg","image2.jpg"]',499.99,399.99,'https://example.com/products/smartphone-xtt555dsjfss5','67987a3b567565f1a476808c',0);
