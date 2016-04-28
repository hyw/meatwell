class AddAccessCodeToMeetings < ActiveRecord::Migration
  def change
  	add_column :meetings, :access_code, :string
  end
end
