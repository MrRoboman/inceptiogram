class Like < ActiveRecord::Base
  validates :user_id, :picture_id, presence: true
  validates :user_id, uniqueness: {scope: :picture_id}
  belongs_to :user
  belongs_to :picture
end
