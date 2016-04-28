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
		meeting = Meeting.friendly.find(params[:id])
		previous_meeting = meeting.project.meetings.where('id < ?', meeting.id).last
		if previous_meeting
			meeting = meeting.as_json
			meeting["previous_action_items"] =  previous_meeting.action_items
		end

		respond_with meeting
	end

	def destroy
		meeting = Meeting.find(params[:id])
		meeting.destroy
		respond_with "Deleted"
	end

	def update
		meeting = Meeting.find(params[:id])
		meeting.update(meeting_params)
		respond_with meeting
	end

	def addAttendees
		meeting = Meeting.find(params[:id])
		attendees = params[:attendees].map{|x| x[:username]}
		attendees.each do |username|
			user = User.find_by_username(username)
			if meeting.users.exclude?(user)
				Attendee.create('user_id'=>user.id, 'meeting_id'=>params[:id])
			end
		end
		meeting.reload
		respond_with meeting
	end

	private

	def meeting_params
		params.require(:meeting).permit(:title, :project_id, :duration, :location, :description, :date, :started_at, :ended_at, :status) 
	end
end
