class CreateAttendees < ActiveRecord::Migration
  def change
    create_table :attendees do |t|
      t.references :user, index: true
      t.references :meeting, index: true
      t.integer :status

      t.timestamps null: false
    end
    add_foreign_key :attendees, :users
    add_foreign_key :attendees, :meetings
  end
end
