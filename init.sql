CREATE TABLE boat_owner (
  id SERIAL PRIMARY KEY,
  owner_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE boat (
  id SERIAL PRIMARY KEY,
  boat_name VARCHAR(100),
  model_year INT
);


CREATE TABLE boat_owner_receipt (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES boat_owner(id),
  boat_id INT REFERENCES boat(id),
  purchase_date DATE DEFAULT CURRENT_DATE
);
