class CreateAgendaNotes < ActiveRecord::Migration
  def change
    create_table :agenda_notes do |t|
      t.references :agenda_item, index: true
      t.text :body
      t.integer :order

      t.timestamps null: false
    end
    add_foreign_key :agenda_notes, :agenda_items
  end
end
