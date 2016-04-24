# Flux Cycles

<!-- Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do. -->


## Picture Cycles

### Picture API Request Actions

* `fetchRecentPictures` (most recent of followed users if no userId specified in data)
  0. invoked from `PicturesIndex` on `didMount`/`willReceiveProps`
  0. `GET /api/pictures` is called with optional userId.
  0. `receivePictures` is set as the callback.

* `fetchMorePictures` (most recent of followed users if no userId specified in data)
  0. invoked from `PicturesIndex`, `ProfileIndex` on `scrollToBottom`
  0. `GET /api/pictures` is called with options {userId, startIdx}.
  0. `receiveMorePictures` is set as the callback.

### Picture API Response Actions
* `receivePictures`
  0. invoked from an API callback.
  0. `Pictures` store updates `_pictures` and emits change.

* `receiveMorePictures`
  0. invoked from an API callback.
  0. `Pictures` store updates `_pictures` and emits change.

### Store Listeners

* `PicturesIndex` component listens to `Picture` store.
* `ProfileIndex` component listens to `Picture` store.


## Comment Cycles

### Comment API Request Actions

* `createComment`
  0. invoked CommentForm `onSubmit`
  0. `POST /api/pictures/:pictureId/comments` is called.
  0. `receiveSingleComment` is set as the callback.

### Comment API Response Actions

* `receiveSingleComment`
  0. invoked from an API callback.
  0. `Picture` store updates `_pictures[userId].comments` and emits change.

### Store Listeners

* `PicturesIndex`, `ShowPicture`, `ProfileIndex` components listen to `Picture` store
for Comment changes.

## Like Cycles

### Like API Request actions

* `toggleLike`
  0. invoked by CommentForm LikeButton `onClick`
  0. `POST /api/pictures/:pictureId/like` is called.
  0. `toggleLike` is set as the callback.

### Like API Response actions

* `toggleLike`
  0. invoked from an API callback.
  0. `Picture` store updates `_pictures[id].liked` and emits change.

### Store Listeners

* `PicturesIndex`, `ShowPicture`, `ProfileIndex` components listen to `Picture` store
for Like changes.

## User Cycles

* `fetchSingleUser`
  0. invoked from `PictureIndexItemHeader Username link` `onClick`
  0. `GET /api/users/:userId` is called.
  0. `receiveSingleUser` is set as the callback.

### User API Request actions

* `receiveSingleUser`
  0. invoked ProfileIndexHeader Username `onClick`
  0. `GET /api/users/:userId` is called.
  0. `receiveSingleUser` is set as the callback.

### User API Response actions

* `receiveSingleUser`
  0. invoked from an API callback.
  0. `User` store updates `_user` and emits change.

### Store Listeners

* `ProfileIndex` listens to `User` store

## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `SearchBar` `onChange` when there is text
  0. `GET /api/search` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `SearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
