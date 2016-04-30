json.id picture.id
json.url picture.url
json.liking picture.liked_by?(current_user)
json.owner do
  json.id picture.owner.id
  json.username picture.owner.username
end
json.likes picture.likes do |like|
  json.id like.id
  json.username like.user.username
end
json.comments picture.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.author do
    json.id comment.author.id
    json.username comment.author.username
  end
end
