# Inceptiogram

[Heroku link][heroku]

[heroku]: http://www.inceptiogram.com

## Minimum Viable Product

Inceptiogram is a web application inspired by Instagram that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login
- [x] guest/demo login
- [x] Three separate view indexes:
  - [x] Pictures Index (Shows recently uploaded pictures by users that the current user follows)
  - [x] Users Index (Shows popular users and samples of their photos)
  - [x] Profile Index (Shows a single user's profile and their pictures)
- [x] Users can follow other users
- [x] Users can comment on pictures
- [x] Users can like pictures

## Product Goals and Priorities

Inceptiogram will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account (MVP)
- [x] Log in / Log out, including as a Guest/Demo User (MVP)
- [x] View, like, comment on pictures (MVP)
- [x] Follow users (MVP)
- [x] Upload photos (possible feature, but not MVP)
- [ ] Mosaic view mode (Most important non MVP feature!)
- [ ] Tag pictures with multiple tags and people (expected feature, but not MVP)
- [ ] Search by tag (expected feature, but not MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] setup Webpack & Flux scaffold
- [x] create `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin
- [x] start basic styling

### Phase 2: Picture Model, API, and basic APIUtil (1.5 days)

**Objective:** PictureIndex displays most recent pictures

- [x] create `Picture` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for pictures (`PictureController`)
- [x] jBuilder views for pictures
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console
- [x] basic styling

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Pictures can be viewed with infinite scroll

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each picture component, building out the flux loop as needed.
  - [x] `PictureIndex`
  - [x] `PictureIndexItem`
    - [x] `PictureIndexItemHeader`
    - [x] `PictureIndexItemPicture`
    - [x] `PictureIndexItemFooter`
- [x] basic styling

### Phase 4: Comments (0.5 days)

**Objective:** Build Comment form

- [x] create `Comment` model
- build out API, Flux loop, and components for:
  - [x] Comment CRUD
  - [x] Comment form component added to PictureIndexItemFooter
- [x] Use CSS to style new views

### Phase 5: Likes (0.5 days)

**Objective:**

- [x] create `Like` model
- [x] build out API, Flux loop, and components for:
  - [x] fetching Like for Picture
  - [x] toggling Like for Picture
- [x] add Like to Comment form  
- [x] Style new elements

### Phase 6: Profile View (1 days)

**objective:** Show Pictures by User

- [x] build ProfileIndex
- build out API, Flux loop, and components for:
  - [ ] fetching Pictures of User

### Phase 7: UsersIndex (1 days)

**objective:** Show index of popular Users

- [x] build UserIndex
- build out API, Flux loop, and components for:
  - [ ] fetching popular Users
- [x] Style

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] InceptioView
  - [ ] Build Canvas element
  - [ ] Display Picture as mosaic of other pictures
  - [ ] Zoom into single picture in mosaics
  - [ ] Picture becomes another mosaic

<!-- [phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md -->
