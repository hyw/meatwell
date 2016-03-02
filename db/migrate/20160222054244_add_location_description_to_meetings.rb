class AddLocationDescriptionToMeetings < ActiveRecord::Migration
  def change
  	add_column :meetings, :location, :string
  	add_column :meetings, :description, :string
  end
end
