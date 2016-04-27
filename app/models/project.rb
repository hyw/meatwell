class Project < ActiveRecord::Base
	extend FriendlyId
  	belongs_to :owner, foreign_key: "user_id", class_name: "User"
  	has_and_belongs_to_many :users, join_table: "committee_members"
  	has_many :meetings

  	friendly_id :title, use: :slugged

  	def as_json(options = {})
    	super(options.merge(include: [:owner, :users, :meetings => { :include => :agenda_items }]))
  	end

end
