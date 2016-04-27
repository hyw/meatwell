class SetAgendaItemStatusDefault < ActiveRecord::Migration
  def change
  	change_column :agenda_items, :status, :integer, :default => 0
  end
end
