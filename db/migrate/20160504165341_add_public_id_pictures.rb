class AddPublicIdPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :public_id, :string
  end
end
