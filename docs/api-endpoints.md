# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Pictures

- `GET /api/pictures`
  - accepts `user_id`, `startIdx` query param to list notes by user and receive a certain number of pics

### Users

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`

### Comments

- `GET /api/pictures` (includes comments)
- `POST /api/pictures/:id/comments`

### Likes

- `GET /api/pictures/:id/like`
- `POST /api/pictures/:id/like`
