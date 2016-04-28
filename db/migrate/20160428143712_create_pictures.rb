class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :url, index: true, null: false
      t.integer :user_id, index: true, null: false

      t.timestamps null: false
    end
  end
end
