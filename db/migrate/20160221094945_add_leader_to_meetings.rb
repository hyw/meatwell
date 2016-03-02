class AddLeaderToMeetings < ActiveRecord::Migration
  def change
  	add_column :meetings, :leader, :integer
    add_index :meetings, :leader
  end
end
