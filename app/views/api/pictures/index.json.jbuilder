json.array! @pictures do |picture|
  json.partial! 'shared/picture', picture: picture
end
