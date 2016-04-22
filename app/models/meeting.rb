class Meeting < ActiveRecord::Base
  extend FriendlyId
  belongs_to :project
  friendly_id :title, use: :slugged
  has_and_belongs_to_many :users, join_table: "attendees"
  has_many :agenda_items

  STATUS_LABELS = {
  	"0" => 'unstarted',
  	"1" => 'in-progress',
  	"2" => 'completed'
  }

  def as_json(options = {})
    	super(options.merge(include: [:users, :agenda_items => { :include => :agenda_notes }]))
  end
end
