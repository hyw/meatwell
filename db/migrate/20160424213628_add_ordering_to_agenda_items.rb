class AddOrderingToAgendaItems < ActiveRecord::Migration
  def change
  	add_column :agenda_items, :ordering, :integer
    add_index :agenda_items, :ordering 
  end
end
