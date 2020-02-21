CREATE TABLE users
(
    user_id UUID PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text UNIQUE,
    password text,
    user_created timestamp NOT NULL
);

CREATE TABLE buildings
(
    building_id UUID PRIMARY KEY,
    building_created timestamp NOT NULL,
    city text NOT NULL,
    street text NOT NULL,
    building_number integer NOT NULL
);

CREATE TABLE apartments
(
    apartment_id uuid PRIMARY KEY,
    owner_name text NOT NULL,
    renter_name text,
    apartment_number integer,
    floor_number integer,
    is_rented BOOLEAN NOT NULL,
    apartment_created timestamp NOT NULL,
    building_id UUID NOT NULL,
    FOREIGN KEY (building_id) REFERENCES buildings(building_id)
);

CREATE TABLE buildings_users
(
    building_id UUID NOT NULL,
    user_id UUID NOT NULL,
    bu_created timestamp NOT NULL,
    PRIMARY KEY (building_id, user_id),
    FOREIGN KEY (building_id) REFERENCES buildings(building_id) ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE
);

insert into users
    (user_id, first_name, last_name, email, password, user_created)
VALUES
    (uuid_generate_v4(), 'tomer', 'matmon', 'tomer.matmon@gmail.com', crypt('tomermatmon', gen_salt('bf', 4)), now()),
    (uuid_generate_v4(), 'avner', 'aricha', 'avner.aricha@gmail.com', crypt('avneraricha', gen_salt('bf', 4)), now());

insert into buildings
    (building_id, building_created, city, street, building_number)
VALUES
    (uuid_generate_v4(), now(), 'haifa', 'eliezer alter', 3),
    (uuid_generate_v4(), now(), 'haifa', 'avraham sachnin', 4);
