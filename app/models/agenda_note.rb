class AgendaNote < ActiveRecord::Base
  belongs_to :agenda_item
  has_and_belongs_to_many :users, join_table: "agenda_note_users"

  # Types of Agenda Notes
  NO_TYPE = 0
  ACTION_ITEM = 1
  INFO = 2
  IDEA = 3
  DECISION = 4

    def as_json(options = {})
    	super(options.merge(include: [:users]))
  	end
end
