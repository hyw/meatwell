class AgendaNoteUsersController < ApplicationController
	def create
		user = User.find_by_email(params[:user][:email])
		if !user
			user = User.new(:email => params[:user][:email])
			user.skip_password_validation = true
			user.save
		end
		agenda_note_user = AgendaNoteUser.create('user_id'=>user.id, 'agenda_note_id'=>params[:agenda_note_id])
		respond_with agenda_note_user
	end
end
