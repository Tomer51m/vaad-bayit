CREATE TABLE users
(
    user_uid UUID PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text UNIQUE,
    password text,
    user_created timestamp NOT NULL,
    apartment_number integer,
    floor_number integer,
    is_owner BOOLEAN
);

CREATE TABLE buildings
(
    building_uid UUID PRIMARY KEY,
    building_created timestamp NOT NULL,
    city text NOT NULL,
    street text NOT NULL,
    num integer NOT NULL
);

CREATE TABLE buildings_users
(
    building_uid UUID NOT NULL,
    user_uid UUID NOT NULL,
    bu_created timestamp NOT NULL,
    is_admin BOOLEAN,
    PRIMARY KEY (building_uid, user_uid),
    FOREIGN KEY (building_uid) REFERENCES buildings(building_uid) ON UPDATE CASCADE,
    FOREIGN KEY (user_uid) REFERENCES users(user_uid) ON UPDATE CASCADE
);

insert into users
    (user_uid, first_name, last_name, email, password, user_created, apartment_number, floor_number, is_owner)
VALUES
    (uuid_generate_v4(), 'tomer', 'matmon', 'tomer.matmon@gmail.com', crypt('tomermatmon', gen_salt('bf', 4)), now(), 6, 3, true),
    (uuid_generate_v4(), 'sharon', 'aricha matmon', 'sharon.aricha.matmon@gmail.com', crypt('sharonarichamatmon', gen_salt('bf', 4)), now(), 6, 3, true);

insert into buildings
    (building_uid, building_created, city, street, num)
VALUES
    (uuid_generate_v4(), now(), 'haifa', 'alter', 3);
