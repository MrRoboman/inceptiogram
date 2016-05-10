json.array! @pictures do |picture|
  json.id picture.id
  json.url picture.url
  json.public_id picture.public_id
  json.liking picture.liked_by?(current_user) if logged_in?
  json.owner do
    json.id picture.owner.id
    json.username picture.owner.username
    json.picture_public_id picture.owner.picture_public_id
  end
  json.likes picture.likes do |like|
    json.id like.id
    json.user do
      json.id like.user.id
      json.username like.user.username
    end
  end
  json.comments picture.comments do |comment|
    json.id comment.id
    json.body comment.body
    json.author do
      json.id comment.author.id
      json.username comment.author.username
    end
  end
end
