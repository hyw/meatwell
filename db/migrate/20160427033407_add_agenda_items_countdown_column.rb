class AddAgendaItemsCountdownColumn < ActiveRecord::Migration
  def change
  	add_column :agenda_items, :countdown, :integer
  end
end
