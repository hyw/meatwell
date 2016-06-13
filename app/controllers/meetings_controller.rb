class MeetingsController < ApplicationController

	def show
		meeting = Meeting.find_by_access_code(params[:access_code])
		meeting_json = meeting.as_json
		meeting_json["meeting_history"] = meeting.project.meetings.order('id desc') if meeting.project

		previous_meeting = meeting.project.meetings.where('id < ?', meeting.id).last if meeting.project_id?
		if previous_meeting
			meeting_json["previous_action_items"] =  previous_meeting.action_items
			meeting_json["previous_meeting_access_code"] = previous_meeting.access_code
		end
		
		respond_with meeting_json
	end

	def createPublic
		meeting = Meeting.create(meeting_params)
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

	def sendMinutes
		meeting = Meeting.find(params[:id])
		meeting.users.each do |user|
			UserMailer.send_minutes(user.id, meeting).deliver
		end
		render :json => meeting
	end

	def createFollowupMeeting
		meeting = Meeting.find(params[:id])
		project = Project.find_or_create_by(id: meeting.project_id)
		meeting.update_attributes(project_id: project.id)
		new_meeting = Meeting.create(project_id: project.id, duration: meeting.duration)
		meeting.agenda_items.each do |item|
			new_item = item.dup
			new_item.update_attributes({
				:meeting_id => new_meeting.id,
				:countdown => new_item.duration * 60,
				:started_at => nil,
				:ended_at => nil,
				:status => 0,
			})
		end

		meeting.users.each do |user|
			Attendee.create(:user_id => user.id, :meeting_id => new_meeting.id)
		end

		render :json => new_meeting
	end

	private

	def meeting_params
		params.require(:meeting).permit(:title, :project_id, :duration, :location, :description, :date, :started_at, :ended_at, :status) 
	end
end
