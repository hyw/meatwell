class AddStartedEndedToAgendaItems < ActiveRecord::Migration
  def change
  	add_column :agenda_items, :started_at, :timestamp
  	add_column :agenda_items, :ended_at, :timestamp
  end
end
