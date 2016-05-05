class MeetingsController < ApplicationController

	def index
		respond_with Meeting.all
	end

	def create
		new_access_code = ('a'..'z').to_a.shuffle[0,8].join
		meeting = Meeting.create(meeting_params.merge({leader: current_user.id, access_code: new_access_code}))
		attendees = params[:attendees].map{|x| x[:username]}
		attendees.each do |attendee|
			user = User.find_by_username(attendee)
			Attendee.create('user_id'=>user.id, 'meeting_id'=>meeting.id)
		end
		respond_with meeting
	end

	def showPublic
		meeting = Meeting.find_by access_code: params[:access_code]
		respond_with meeting
	end

	def createPublic
		new_access_code = ('a'..'z').to_a.shuffle[0,8].join
		meeting = Meeting.create(meeting_params.merge(access_code: new_access_code))
		respond_with meeting
	end

	def show
		meeting = Meeting.friendly.find(params[:id])
		previous_meeting = meeting.project.meetings.where('id < ?', meeting.id).last if meeting.project
		if previous_meeting
			meeting = meeting.as_json
			meeting["previous_action_items"] =  previous_meeting.action_items
		end

		respond_with meeting
	end

	def showOrg
		# query for all meetings that users of given organization belong to
		meetings = Meeting.includes(users: :organizations).where('organizations.name' => params[:org])
		respond_with meetings
		# render json: meetings.to_json
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

	def addAttendee
		user = User.find_by_email(params[:attendee_email])
		if !user
			user = User.new(:email => params[:attendee_email])
			user.skip_password_validation = true
			user.save
		end
		Attendee.create('user_id'=>user.id, 'meeting_id'=>params[:id]) if user
		render :json => user
	end

	def send_minutes
		meeting = Meeting.find(params[:id])
		meeting.attendees each do |attendee|
			UserMailer.send_minutes(attendee.user_id, meeting)
		end
	end

	private

	def meeting_params
		params.require(:meeting).permit(:title, :project_id, :duration, :location, :description, :date, :started_at, :ended_at, :status) 
	end
end
