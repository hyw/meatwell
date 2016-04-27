class AgendaItem < ActiveRecord::Base
  belongs_to :meeting
  has_many :agenda_notes, :dependent => :destroy
end
