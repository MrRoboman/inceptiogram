json.array! @pictures do |picture|
  json.id picture.id
  json.url picture.url
  json.owner picture.owner.username
  json.comments picture.comments do |comment|
    json.id comment.id
    json.body comment.body
    json.author comment.author.username
  end
end
