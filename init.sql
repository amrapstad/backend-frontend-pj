CREATE TABLE boat_owner (
  id SERIAL PRIMARY KEY,
  owner_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE boat (
  id SERIAL PRIMARY KEY,
  boat_name VARCHAR(100),
  owner_id INT REFERENCES boat_owner(id),
  purchase_date TIMESTAMP DEFAULT NOW()
);
