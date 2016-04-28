class Picture < ActiveRecord::Base
  validates :url, :user_id, presence: true;
  belongs_to :owner, foreign_key: :user_id, class_name: :User
  has_many :comments
  has_many :likes

  def self.find_with_deets(id)
    self.includes(:owner, likes: [:user], comments: [:author])
        .find_by_id(id)
  end
end
