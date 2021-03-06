class ProjectsController < ApplicationController

	before_filter :authenticate_user!, only: [:create]

	def index
		respond_with current_user.organizations.first.projects.uniq
	end

	def member_projects
		respond_with current_user.projects
	end

	def create
		project = Project.create(project_params.merge(user_id: current_user.id))
		members = params[:members].map{|x| x[:username]}
		members.each do |member|
			user = User.find_by_username(member)
			CommitteeMember.create('user_id'=>user.id, 'project_id'=>project.id) if user
		end
		respond_with project
	end

	def show
		respond_with Project.friendly.find(params[:id])
	end

	def join
		CommitteeMember.create(:project_id => params[:id], :user_id => current_user.id)
		respond_with Project.friendly.find(params[:id])
	end

	def leave
		committee_member = CommitteeMember.where(:project_id => params[:id], :user_id => current_user.id).first
		committee_member.destroy if committee_member
		respond_with Project.friendly.find(params[:id])
	end

	def destroy
		project = Project.find(params[:id])
		project.destroy
		respond_with "Deleted"
	end

	def latestMeeting
		project = Project.friendly.find(params[:id])
		meeting = project.meetings.last
		meeting_json = meeting.as_json
		meeting_json["meeting_history"] = meeting.project.meetings.order('id desc') if meeting.project

		previous_meeting = meeting.project.meetings.where('id < ?', meeting.id).last if meeting.project_id?
		if previous_meeting
			meeting_json["previous_action_items"] =  previous_meeting.action_items
			meeting_json["previous_meeting_access_code"] = previous_meeting.access_code
		end

		respond_with meeting_json
	end

	private

	def project_params 
		params.require(:project).permit(:title) 
	end
end
