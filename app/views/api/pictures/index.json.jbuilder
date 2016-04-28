json.array! @pictures do |picture|
  json.url picture.url
  json.owner picture.owner.username
end
