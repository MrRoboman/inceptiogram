# Schema Information

## users
column name     | data type  | details
----------------|------------|-----------------------
id              | integer    | not null, primary key
username        | string     | not null, indexed, unique
password_digest | string     | not null
session_token   | string     | not null, indexed, unique
profile_pic_id  | picture_id | not null, indexed

## pictures
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
url         | string    | not null
owner_id    | integer   | not null, foreign key (references users), indexed

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | string    | not null
author_id   | integer   | not null, foreign key (references users), indexed
picture_id  | integer   | not null, foreign key (references pictures), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
picture_id  | integer   | not null, foreign key (references pictures), indexed

(user_id and pictures_id combo must be unique)

## follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users), indexed
followee_id | integer   | not null, foreign key (references users), indexed

(follower_id and followee_id combo must be unique)

# Post-MVP

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
note_id     | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## pictures
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
url            | string    | not null
owner_id       | integer   | not null, foreign key (references users), indexed
dominant_color | integer   | not null, indexed (used to build mosaics)
type           | string    | not null, only("NORMAL", "THUMB", "SPRITESHEET"), indexed
