ALTER TABLE users
    ADD agility INTEGER;

ALTER TABLE users
    ADD created_at TIMESTAMP WITHOUT TIME ZONE;

ALTER TABLE users
    ADD current_xp INTEGER;

ALTER TABLE users
    ADD endurance INTEGER;

ALTER TABLE users
    ADD level INTEGER;

ALTER TABLE users
    ADD strength INTEGER;

ALTER TABLE users
    ADD total_points INTEGER;

ALTER TABLE users
    ADD updated_at TIMESTAMP WITHOUT TIME ZONE;

ALTER TABLE users
    ADD xp_to_next_level INTEGER;

ALTER TABLE users
    ALTER COLUMN agility SET DEFAULT 10;

ALTER TABLE users
    ALTER COLUMN current_xp SET DEFAULT 0;

ALTER TABLE users
    ALTER COLUMN endurance SET default 10;

ALTER TABLE users
    ALTER COLUMN level SET default 1;

ALTER TABLE users
    ALTER COLUMN strength SET default 10;

ALTER TABLE users
    ALTER COLUMN total_points SET default 0;

ALTER TABLE users
    ALTER COLUMN xp_to_next_level SET default 500;
