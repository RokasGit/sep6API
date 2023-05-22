--DROP SCHEMA sep6 CASCADE;

create schema if not exists sep6;

 set SEARCH_PATH  to 'sep6';

 create table _user(
     user_id SERIAL UNIQUE,
     username VARCHAR(100) not null,
     password VARCHAR(255) not null,
     email VARCHAR(250) constraint PROPEREMAIL check (email ~* '^[A-Za-z0-9.%-]+@[A-Za-z0-9.-]+.[A-Za-z]+$') primary key,
    profile_pic VARCHAR(250)
);
create table review(
    review_id SERIAL primary key,
    user_id INT references _user(user_id) not null,
    imdb_movie_id VARCHAR(255) not null,
    movie_title VARCHAR(255) not null,
    ratting INT not null default 0 check (ratting >= 0 and ratting <= 5),
    comment VARCHAR(500) not null,
    date DATE not null,
    UNIQUE(imdb_movie_id,user_id)
);
create table toplist(
    user_id INT references _user(user_id) not null,
    imdb_movie_id VARCHAR(255) not null,
    PRIMARY KEY (user_id, imdb_movie_id)
);
create table watchlist(
    user_id INT references _user(user_id) not null,
    imdb_movie_id VARCHAR(255) not null,
    PRIMARY KEY (user_id, imdb_movie_id)
);
SET SCHEMA 'sep6';