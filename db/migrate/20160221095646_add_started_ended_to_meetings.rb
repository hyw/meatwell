class AddStartedEndedToMeetings < ActiveRecord::Migration
  def change
  	add_column :meetings, :started_at, :timestamp
  	add_column :meetings, :ended_at, :timestamp
  end
end
