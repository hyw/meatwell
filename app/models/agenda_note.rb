class AgendaNote < ActiveRecord::Base
  belongs_to :agenda_item

  # Types of Agenda Notes
  NO_TYPE = 0
  ACTION_ITEM = 1
  INFO = 2
  IDEA = 3
  DECISION = 4
end
