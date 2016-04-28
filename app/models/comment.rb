class Comment < ActiveRecord::Base
  validates :body, :user_id, :picture_id, presence: true
  belongs_to :author, foreign_key: :user_id, class_name: :User
  belongs_to :picture
end
