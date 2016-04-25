class AddDueDateToAgendaNotes < ActiveRecord::Migration
  def change
  	add_column :agenda_notes, :due_date, :timestamp
  end
end
