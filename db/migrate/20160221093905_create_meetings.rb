class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.string :title
      t.references :project, index: true
      t.timestamp :date
      t.integer :duration
      t.integer :status

      t.timestamps null: false
    end
    add_foreign_key :meetings, :projects
  end
end
