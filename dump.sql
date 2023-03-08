CREATE TABLE
    users (
        id serial PRIMARY KEY,
        name varchar(50) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(60) NOT NULL,
        profile_picture TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    hashtags (
        id serial PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        quantity integer NOT NULL
    );

CREATE TABLE
    posts (
        id serial PRIMARY KEY,
        description TEXT,
        url TEXT NOT NULL,
        preview_title TEXT NOT NULL,
        preview_desc TEXT NOT NULL,
        preview_img TEXT NOT NULL,
        user_id integer NOT NULL REFERENCES users (id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    posts_hashtags (
        id serial PRIMARY KEY,
        post_id integer NOT NULL REFERENCES posts (id),
        hashtag_id integer NOT NULL REFERENCES hashtags (id)
    );

CREATE TABLE
    posts_likes (
        id serial PRIMARY KEY,
        user_id integer NOT NULL REFERENCES users (id),
        post_id integer NOT NULL REFERENCES posts (id),
        UNIQUE (user_id, post_id)
    );

CREATE TABLE
    sessions (
        id serial PRIMARY KEY,
        user_id integer NOT NULL REFERENCES users (id)
    );