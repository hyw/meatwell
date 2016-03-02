class CreateAgendaItems < ActiveRecord::Migration
  def change
    create_table :agenda_items do |t|
      t.string :title
      t.references :meeting, index: true
      t.integer :duration

      t.timestamps null: false
    end
    add_foreign_key :agenda_items, :meetings
  end
end
