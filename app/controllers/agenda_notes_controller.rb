class AgendaNotesController < ApplicationController

	before_filter :authenticate_user!, only: [:create, :update]

	def create
		agendanote = AgendaNote.create(agendanote_params)
		users = !params[:users].blank? ? params[:users].map{|x| x[:username]} : []
		users.each do |user|
			user = User.find_by_username(user)
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
