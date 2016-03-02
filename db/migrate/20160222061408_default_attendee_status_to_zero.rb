class DefaultAttendeeStatusToZero < ActiveRecord::Migration
  def change
  	change_column :attendees, :status, :integer, :default => 0
  end
end
