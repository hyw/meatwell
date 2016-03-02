class DefaultMeetingStatusToZero < ActiveRecord::Migration
  def change
  	change_column :meetings, :status, :integer, :default => 0
  end
end
