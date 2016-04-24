## Component Hierarchy

* `App`
  * `PicturesIndex`
    * `PictureIndexItem`
      * `PictureIndexItemHeader`
      * `PictureIndexItemPicture`
      * `PictureIndexItemFooter`
      * `PictureIndexItemCommentForm`
  * `UsersIndex`
    * `UsersIndexItem`
    * `UsersIndexItemHeader`
    * `UsersIndexItemSamplePics`
  * `ProfileIndex`
    * `ProfileIndexHeader`
      * `ProfileIndexHeaderImage`
      * `ProfileIndexHeaderInfo`
        * `FollowButton`
        * `Count` (x3: 'posts', 'followers', 'following')
    * `ShowPicture` (comprised of same components as `PictureIndexItem`)
