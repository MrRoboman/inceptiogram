json.id profile.id
json.username profile.username
json.following profile.followed_by?(current_user)
json.pictures profile.pictures do |pic|
  json.username profile.username
  json.id pic.id
  json.url pic.url
  json.public_id pic.public_id
  json.liking pic.liked_by?(current_user)
  json.likes pic.likes do |like|
    json.id like.id
    json.user do
      json.id like.user.id
      json.username like.user.username
    end
  end
  json.comments pic.comments do |comment|
    json.id comment.id
    json.body comment.body
    json.author do
      json.id comment.author.id
      json.username comment.author.username
    end
  end

end
