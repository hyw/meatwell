class FixAgendaNoteTypeColumnName < ActiveRecord::Migration
  def change
  	rename_column :agenda_notes, :type, :note_type
  end
end
