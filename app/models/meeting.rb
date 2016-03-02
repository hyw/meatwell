class Meeting < ActiveRecord::Base
  belongs_to :project

  STATUS_LABELS = {
  	"0" => 'unstarted',
  	"1" => 'in-progress',
  	"2" => 'completed'
  }
end
