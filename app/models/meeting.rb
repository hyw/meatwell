class Meeting < ActiveRecord::Base
  extend FriendlyId
  belongs_to :project
  friendly_id :title, use: :slugged
  has_and_belongs_to_many :users, join_table: "attendees"
  has_many :agenda_items
  has_many :agenda_notes, :through => :agenda_items
  before_create :generate_access_code

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

  private

  def generate_access_code
    new_access_code = ReadableTokens.generate_readable_token
    access_code_exists = Meeting.find_by_access_code(new_access_code).present?
    while access_code_exists
      new_access_code = ReadableTokens.generate_readable_token
      access_code_exists = Meeting.find_by_access_code(new_access_code).present?
    end
    self.access_code = new_access_code
  end

end
