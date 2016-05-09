class AgendaNote < ActiveRecord::Base
  belongs_to :agenda_item
  has_and_belongs_to_many :users, join_table: "agenda_note_users"

  # Types of Agenda Notes
  NO_TYPE = 0
  ACTION_ITEM = 1
  INFO = 2
  IDEA = 3
  DECISION = 4
  QUESTION = 5

  NOTE_MAP = {
    0 => "",
    1 => "ACTION",
    2 => "INFO",
    3 => "IDEA",
    4 => "DECISION",
    5 => "QUESTION"
  }

    def as_json(options = {})
    	super(options.merge(include: [:users]))
  	end
end
