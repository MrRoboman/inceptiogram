class Picture < ActiveRecord::Base
  validates :url, :user_id, presence: true;
  belongs_to :owner, foreign_key: :user_id, class_name: :User
  has_many :comments
  has_many :likes

  def self.all_with_deets
    self.includes(:owner, likes: [:user], comments: [:author]).all
  end

  def self.find_with_deets(id)
    self.includes(:owner, likes: [:user], comments: [:author]).find_by_id(id)
  end

  def liked_by?(user)
    likes.find_by_user_id(user.id) ? true : false
  end
end
