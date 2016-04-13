class AddSlugToMeetings < ActiveRecord::Migration
  def change
  	add_column :meetings, :slug, :string, :unique => true
  end
end