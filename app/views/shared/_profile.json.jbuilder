json.id profile.id
json.username profile.username
json.following profile.followed_by?(current_user)
json.pictures profile.pictures do |pic|
  json.id pic.id
  json.url pic.url
end
