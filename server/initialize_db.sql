CREATE TABLE users
(
    user_uid UUID PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text UNIQUE,
    password text,
    user_created timestamp NOT NULL
);

CREATE TABLE buildings
(
    building_uid UUID PRIMARY KEY,
    building_created timestamp NOT NULL,
    city text NOT NULL,
    street text NOT NULL,
    building_num integer NOT NULL
);

CREATE TABLE apartments
(
    apartment_uid uuid PRIMARY KEY,
    owner_name text NOT NULL,
    renter_name text,
    apartment_number integer UNIQUE,
    floor_number integer,
    is_rented BOOLEAN NOT NULL,
    apartment_created timestamp NOT NULL,
    building_uid UUID NOT NULL,
    FOREIGN KEY (building_uid) REFERENCES buildings(building_uid)
);

CREATE TABLE buildings_users
(
    building_uid UUID NOT NULL,
    user_uid UUID NOT NULL,
    bu_created timestamp NOT NULL,
    PRIMARY KEY (building_uid, user_uid),
    FOREIGN KEY (building_uid) REFERENCES buildings(building_uid) ON UPDATE CASCADE,
    FOREIGN KEY (user_uid) REFERENCES users(user_uid) ON UPDATE CASCADE
);

insert into users
    (user_uid, first_name, last_name, email, password, user_created)
VALUES
    (uuid_generate_v4(), 'tomer', 'matmon', 'tomer.matmon@gmail.com', crypt('tomermatmon', gen_salt('bf', 4)), now()),
    (uuid_generate_v4(), 'avner', 'aricha', 'avner.aricha@gmail.com', crypt('avneraricha', gen_salt('bf', 4)), now());

insert into buildings
    (building_uid, building_created, city, street, building_num)
VALUES
    (uuid_generate_v4(), now(), 'haifa', 'eliezer alter', 3),
    (uuid_generate_v4(), now(), 'haifa', 'avraham sachnin', 4);
