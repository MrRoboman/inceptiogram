class Picture < ActiveRecord::Base
  validates :url, :user_id, presence: true;
  belongs_to :owner, foreign_key: :user_id, class_name: :User


end
