class AgendaNotesController < ApplicationController

	before_filter :authenticate_user!, only: [:create, :update]

	def create
		agendanote = AgendaNote.create(agendanote_params)
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
		params.require(:agenda_note).permit(:body, :agenda_item_id, :note_type) 
	end
end
