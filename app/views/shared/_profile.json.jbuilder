json.id profile.id
json.username profile.username
json.picture_public_id profile.picture_public_id
json.following profile.followed_by?(current_user)
json.pictures profile.pictures do |pic|
  # json.id pic.id
  # json.url pic.url
  json.partial! 'shared/picture', picture: pic
end
