class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.integer :picture_id, null: false

      t.timestamps null: false
    end

    add_index :likes, :user_id
    add_index :likes, :picture_id
    add_index :likes, [:user_id, :picture_id], unique: true
  end
end
