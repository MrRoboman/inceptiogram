# Inceptiogram

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Inceptiogram is a web application inspired by Instagram that will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for an Instagram-inspired site: viewing, liking, commenting, tagging pictures;
following, searching users
- [ ] Hosting on Heroku
- [ ] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README **NB**: [sample production README](https://github.com/appacademy/sample-project-proposal/blob/master/docs/production_readme.md)

## Product Goals and Priorities

Inceptiogram will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] View, like, comment on pictures (MVP)
- [ ] Follow, search users (MVP)
- [ ] Tag pictures with multiple tags and people (expected feature, but not MVP)
- [ ] Search by tag (expected feature, but not MVP)
- [ ] Mosaic view mode (expected feature, but not MVP)
- [ ] Upload photos (possible feature, but not MVP)

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

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: Picture Model, API, and basic APIUtil (1.5 days)

**Objective:** PictureIndex displays most recent pictures

- [ ] create `Picture` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for pictures (`PictureController`)
- [ ] jBuilder views for pictures
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Pictures can be viewed with infinite scroll

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each picture component, building out the flux loop as needed.
  - [ ] `PictureIndex`
  - [ ] `PictureIndexItem`
    - [ ] `PictureIndexItemHeader`
    - [ ] `PictureIndexItemPicture`
    - [ ] `PictureIndexItemFooter`

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Comments (0.5 days)

**Objective:** Build Comment form

- [ ] create `Comment` model
- build out API, Flux loop, and components for:
  - [ ] Comment CRUD
  - [ ] Comment form component added to PictureIndexItemFooter
- Use CSS to style new views

### Phase 6: Likes (0.5 days)

**Objective:**

- [ ] create `Like` model
- build out API, Flux loop, and components for:
  - [ ] fetching Like for Picture
  - [ ] toggling Like for Picture
- [ ] add Like to Comment form  
- [ ] Style new elements

### Phase 7: Profile View (1 days)

**objective:** Show Pictures by User

- [ ] build ProfileIndex
- build out API, Flux loop, and components for:
  - [ ] fetching Pictures of User

### Phase 8: UsersIndex (1 days)

**objective:** Show index of popular Users

- [ ] build UserIndex
- build out API, Flux loop, and components for:
  - [ ] fetching popular Users
- [ ] Style

### Phase 9: Styling Cleanup and Seeding (1 day)

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
