class AddTypeToAgendaNotes < ActiveRecord::Migration
  def change
  	add_column :agenda_notes, :type, :integer
  end
end
