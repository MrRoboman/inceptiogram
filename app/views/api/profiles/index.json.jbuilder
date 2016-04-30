json.array! @profiles do |profile|
  json.partial! 'shared/profile', profile: profile
end

# json.array! @profiles do |profile|
#   debugger
#   json.username profile.username
#   pics = profile.pictures.take(3)
#   json.array! pics do |pic|
#   #   json.url pic.url
#   end
# end
