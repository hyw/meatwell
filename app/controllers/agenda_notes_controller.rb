class AgendaNotesController < ApplicationController

	def create
		due_date = Date.strptime(params[:due_date], "%m/%d/%y") if !params[:due_date].blank?
		names = !params[:names].blank? ? params[:names].map{|x| x["text"]} : []
		names = names.join(", ")
		agendanote = AgendaNote.create(agendanote_params.merge(:due_date => due_date, :names =>names))
		users = !params[:users].blank? ? params[:users].map{|x| x[:email]} : []
		users.each do |user_email|
			user = User.find_by_email(user_email)
			if !user
				user = User.new(:email => user_email)
				user.skip_password_validation = true
				user.save
			end
			AgendaNoteUser.create('user_id'=>user.id, 'agenda_note_id'=>agendanote.id)
		end
		respond_with agendanote
	end

	def update
		note = AgendaNote.find(params[:id])
		note.update(agendanote_params)
		respond_with note
	end

	def destroy
		note = AgendaNote.find(params[:id])
		note.destroy
		respond_with "Deleted"
	end

	def deleteUser
		user = User.find_by_email(params[:email])
		if user
			agenda_note_users = AgendaNoteUser.where('user_id'=>user.id, 'agenda_note_id' => params[:id])
			agenda_note_users.destroy_all
		end
		respond_with 'Deleted'
	end
	
	private

	def agendanote_params 
		params.require(:agenda_note).permit(:body, :agenda_item_id, :note_type, :names) 
	end
end
