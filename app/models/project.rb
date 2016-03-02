class Project < ActiveRecord::Base
	extend FriendlyId
  	has_many :committee_members
  	belongs_to :owner, foreign_key: "user_id", class_name: "User"
  	has_many :users, through: :committee_members
  	friendly_id :title, use: :slugged
  	has_many :meetings

  	def as_json(options = {})
    	super(options.merge(include: [:owner, :users, :meetings]))
  	end

end
