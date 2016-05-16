class Meeting < ActiveRecord::Base
  extend FriendlyId
  belongs_to :project
  friendly_id :title, use: :slugged
  has_and_belongs_to_many :users, join_table: "attendees"
  has_many :agenda_items
  has_many :agenda_notes, :through => :agenda_items
  validates :access_code, uniqueness: true

  STATUS_LABELS = {
  	"0" => 'unstarted',
  	"1" => 'started',
  	"2" => 'finished'
  }

  def as_json(options = {})
    	super(options.merge(include: [:project, :users, :agenda_items => { :include => { :agenda_notes => { :include => :users } } } ] ) )
  end

  def action_items
    self.agenda_notes.where(:note_type => AgendaNote::ACTION_ITEM)
  end

end
