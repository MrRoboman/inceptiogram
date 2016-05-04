# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

usernames = [
  "Rob Kayson",
  "shrek",
  "batman",
  "meatboy",
  "kermit"
]
password = "asdfasdf"

pictures = {
  "Rob Kayson" => [["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384432/fwifpwxd3bcdbmdqwsg9.jpg", "fwifpwxd3bcdbmdqwsg9"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384434/zhmo2sfb4jgzrqsdoojt.png", "zhmo2sfb4jgzrqsdoojt"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384433/yjem6pns8c0nudkpoirz.jpg", "yjem6pns8c0nudkpoirz"]],
  "shrek" => [["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384510/uaetdpt4bk6vblqgaerv.jpg", "uaetdpt4bk6vblqgaerv"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384511/lmyqeyjq8regne4ct8o7.jpg", "lmyqeyjq8regne4ct8o7"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384510/y5fkmsmuzr9was2oe2ey.jpg", "y5fkmsmuzr9was2oe2ey"]],
  "batman" => [["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384558/mxwigyidf9o4ixilmmxi.jpg", "mxwigyidf9o4ixilmmxi"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384558/obu3kemftors21tu2lvp.jpg", "obu3kemftors21tu2lvp"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384558/k72hfnuaxbwsrcmgifsh.jpg", "k72hfnuaxbwsrcmgifsh"]],
  "meatboy" => [["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384608/zgotfkct0u49dr2bvdad.png", "zgotfkct0u49dr2bvdad"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384616/pcjb31qw04jxr2gcdsge.png", "pcjb31qw04jxr2gcdsge"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384609/x3bdyrgontt804cwlm6s.jpg", "x3bdyrgontt804cwlm6s"]],
  "kermit" => [["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384654/pbmh4tbp5u7khavyusln.jpg", "pbmh4tbp5u7khavyusln"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384653/oqofn7kzrc3wz1k5yjfn.jpg", "oqofn7kzrc3wz1k5yjfn"], ["http://res.cloudinary.com/dxhizunmp/image/upload/v1462384654/yw06bpxevnsxu8kpgacd.jpg", "yw06bpxevnsxu8kpgacd"]]
}

usernames.each do |username|
  user = User.create!(username: username, password: password)
  pictures[username].each do |u_p|
    Picture.create!(user_id: user.id, url: u_p[0], public_id: u_p[1])
  end
end
