class Meeting < ActiveRecord::Base
  extend FriendlyId
  belongs_to :project
  friendly_id :title, use: :slugged
  has_many :attendees
  has_many :users, through: :attendees
  has_many :agenda_items

  STATUS_LABELS = {
  	"0" => 'unstarted',
  	"1" => 'in-progress',
  	"2" => 'completed'
  }

  def as_json(options = {})
    	super(options.merge(include: [:users, :agenda_items]))
  end
end
