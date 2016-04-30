class User < ActiveRecord::Base
  validates :username, uniqueness: true
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :pictures
  has_many :comments
  has_many :likes

  has_many :follow_joins, foreign_key: :follower_id, class_name: :Follow
  has_many :leaders, through: :follow_joins, source: :leader

  has_many :leader_joins, foreign_key: :leader_id, class_name: :Follow
  has_many :followers, through: :leader_joins, source: :follower

  def self.all_with_deets
    User.includes(:pictures, :followers).all
  end

  def self.find_with_deets(id)
    User.includes(:pictures, :followers).find(id);
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    BCrypt::Password.new(user.password_digest).is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
  end

  def followed_by?(current_user)
    !Follow.find_by(follower_id: current_user.id, leader_id: self.id).nil?
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end
end
