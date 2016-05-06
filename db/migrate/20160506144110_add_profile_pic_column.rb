class AddProfilePicColumn < ActiveRecord::Migration
  def change
    add_column :users, :picture_public_id, :string
  end
end
