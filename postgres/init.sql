CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- create
CREATE TABLE CLIENT (
                        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                        full_name TEXT NOT NULL,
                        email TEXT NOT NULL,
                        age INTEGER,
                        sex TEXT CHECK (sex IN ('male', 'female')),
                        created_at DATE DEFAULT now(),
                        updated_at DATE DEFAULT now()
);

CREATE TABLE CAR (
                     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                     car_type TEXT NOT NULL,
                     price INTEGER NOT NULL,
                     mileage INTEGER NOT NULL,
                     condition TEXT NOT NULL CHECK (condition IN ('bad', 'ok', 'good', 'mint')),
                     image_blob BYTEA,
                     image_path TEXT,
                     image_blob_mime_type TEXT,
                     created_at DATE DEFAULT now(),
                     updated_at DATE DEFAULT now()
);

CREATE TABLE CAR_ORDER (
                           id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                           client_id UUID NOT NULL,
                           car_id UUID NOT NULL,
                           discount INTEGER DEFAULT 0,
                           FOREIGN KEY(client_id) REFERENCES CLIENT(id) ON DELETE NO ACTION,
                           FOREIGN KEY(car_id) REFERENCES CAR(id) ON DELETE NO ACTION,
                           created_at DATE DEFAULT now(),
                           updated_at DATE DEFAULT now()
);

-- insert
INSERT INTO CLIENT(full_name, email, age, sex) VALUES('John Smith', 'johnsmith68@supermail.com', 54, 'male');
INSERT INTO CLIENT(full_name, email, age, sex) VALUES('Ann Perkins', 'aaann1987@gmail.com', 32, 'female');
INSERT INTO CLIENT(full_name, email) VALUES('Test User', 'test@email.com');

INSERT INTO CAR(car_type, price, mileage, condition) VALUES('2006 Toyota corola', 9500, 420000, 'ok');
INSERT INTO CAR(car_type, price, mileage, condition) VALUES('2016 Cadilac Escalade', 65000, 52000, 'mint');

SELECT * FROM pg_catalog.pg_tables