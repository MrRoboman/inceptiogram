# Inceptiogram

[Inceptiogram live][heroku]

[heroku]: http://www.inceptiogram.com

Inceptiogram is a full-stack web application inspired by Instagram.  It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.  

## Features & Implementation

### Single-Page App

Inceptiogram never leaves the page you start on. It make requests to the server and updates without a single refresh. This results in a smoothe user experience.

### InceptioView (not yet implemented)

A stretch goal for Inceptiogram. This feature builds each picture on the site as a mosaic of other pictures on the site. When a single image is clicked in the mosaic we zoom into that picture and it becomes a mosaic of other pictures. We can go infitely deep! Inspired by the movie Inception.


### Pictures and Profiles

Inceptiogram uses a very simple api to fetch pictures and profiles. On the main Picture Index page, the api fetches all of the pictures of users that the current user follows. Each picture that comes back from the server comes bundled with info about the user that owns that picture, the comments and likes of the picture.

Similarly, when looking up profiles, the api will return profiles bundled with all the necessary information the app needs to glean about that profile: the pictures, comments, likes.

The api is as simple underneath as the interface on top.

### Profile Index
![profile index screenshot](https://github.com/mrroboman/inceptiogram/blob/master/docs/screenshots/profileindexscreenshot.png)

### Profile
![profile screenshot](https://github.com/mrroboman/inceptiogram/blob/master/docs/screenshots/profilescreenshot.png)
