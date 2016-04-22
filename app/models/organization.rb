class Organization < ActiveRecord::Base
	has_many :organization_users
  	has_and_belongs_to_many :users, join_table: "organization_users"
  	has_many :projects, through: :users
end
