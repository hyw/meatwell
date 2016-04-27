class AgendaNoteUser < ActiveRecord::Base
	belongs_to :user
	belongs_to :agenda_note
end
