class CreateCards < ActiveRecord::Migration[8.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.text :message
      t.string :music_recommendation

      t.timestamps
    end
  end
end
