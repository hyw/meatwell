class AddGcalTokenToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :gcal_token, :string
  end
end
