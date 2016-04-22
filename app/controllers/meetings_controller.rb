class MeetingsController < ApplicationController

	before_filter :authenticate_user!, only: [:create]

	def index
		respond_with Meeting.all
	end

	def create
		meeting = Meeting.create(meeting_params.merge(leader: current_user.id))
		attendees = params[:attendees].map{|x| x[:username]}
		attendees.each do |attendee|
			user = User.find_by_username(attendee)
			Attendee.create('user_id'=>user.id, 'meeting_id'=>meeting.id)
		end
		respond_with meeting
	end

	def show
		respond_with Meeting.friendly.find(params[:id])
	end

	private

	def meeting_params
		params.require(:meeting).permit(:title, :project_id, :duration, :location, :description, :date) 
	end
end
