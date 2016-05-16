class EnsureAccessCodeUniqueness < ActiveRecord::Migration
  def change
  	add_index :meetings, :access_code, :unique => true
  end
end
