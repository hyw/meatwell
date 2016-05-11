class AddNamesToAgendaNote < ActiveRecord::Migration
  def change
  	add_column :agenda_notes, :names, :string
  end
end
