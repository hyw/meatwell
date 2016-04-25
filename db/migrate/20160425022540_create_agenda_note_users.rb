class CreateAgendaNoteUsers < ActiveRecord::Migration
  def change
    create_table :agenda_note_users do |t|
      t.references :user
      t.references :agenda_note

      t.timestamps null: false
    end
  end
end
