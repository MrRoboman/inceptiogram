json.id picture.id
json.url picture.url
json.owner picture.owner.username
json.likes picture.likes do |like|
  json.id like.id
  json.username like.user.username
end
json.comments picture.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.author comment.author.username
end
