class AgendaItemsController < ApplicationController

	before_filter :authenticate_user!, only: [:create, :update]

	def index
		respond_with AgendaItem.all
	end

	def create
		agendaitem = AgendaItem.create(agendaitem_params.merge({ countdown: agendaitem_params["duration"]*60 }))
		respond_with agendaitem
	end

	def show
		respond_with AgendaItem.find(params[:id])
	end

	def update
		item = AgendaItem.find(params[:id])
		item.update(agendaitem_params)
		respond_with item
	end

	def destroy
		item = AgendaItem.find(params[:id])
		item.destroy
		respond_with "Deleted"
	end
	
	private

	def agendaitem_params 
		params.require(:agenda_item).permit(:title, :duration, :meeting_id, :ordering, :started_at, :ended_at, :status, :countdown) 
	end
end
