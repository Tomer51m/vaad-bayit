CREATE TABLE residents
(
    res_id UUID NOT NULL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    apartment_number VARCHAR NOT NULL,
    floor_number VARCHAR NOT null,
    is_owner BOOLEAN NOT NULL
);

insert into residents
    (res_id, first_name, last_name, floor_number, apartment_number, is_owner)
VALUES
    (uuid_generate_v4(), 'tomer', 'matmon', 3, 6, true),
    (uuid_generate_v4(), 'sharon', 'aricha', 3, 6, true),
    (uuid_generate_v4(), 'menashe', 'zalman', 1, 1, true),
    (uuid_generate_v4(), 'tal', 'sonago', 1, 2, true),
    (uuid_generate_v4(), 'michal', 'sonago', 1, 2, true),
    (uuid_generate_v4(), 'zeev', 'horpi', 2, 3, true),
    (uuid_generate_v4(), 'hana', 'horpi', 2, 3, true),
    (uuid_generate_v4(), 'gil', 'mor', 2, 4, true),
    (uuid_generate_v4(), 'yasmin', 'mor', 2, 4, true),
    (uuid_generate_v4(), 'dafna', 'cohen', 3, 5, false);