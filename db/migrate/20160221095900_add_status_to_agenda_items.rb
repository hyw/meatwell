class AddStatusToAgendaItems < ActiveRecord::Migration
  def change
  	add_column :agenda_items, :status, :integer
  end
end
