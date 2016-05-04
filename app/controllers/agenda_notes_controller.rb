class AgendaNotesController < ApplicationController

	def create
		agendanote = AgendaNote.create(agendanote_params)
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
	
	private

	def agendanote_params 
		params.require(:agenda_note).permit(:body, :agenda_item_id, :note_type, :due_date) 
	end
end
