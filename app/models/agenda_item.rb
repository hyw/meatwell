class AgendaItem < ActiveRecord::Base
  belongs_to :meeting
  has_many :agenda_notes, :dependent => :destroy
  default_scope { order('ordering') }

  UNSTARTED = 0
  STARTED = 1
  FINISHED = 2

end
