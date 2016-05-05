require 'google/api_client'

class UsersController < ApplicationController
  def search
    organization_user_ids = current_user.organizations.first.users.pluck(:id).join(",")
  	query_match = "(email LIKE '%#{params[:query]}%' OR username LIKE '%#{params[:query]}%') AND id IN (#{organization_user_ids}) "

  	if params[:project_id]
  		respond_with Project.find(params[:project_id]).users.where(query_match).pluck(:username)
  	else
    	respond_with User.where(query_match).pluck(:username)
    end
  end

  def auth_calendar
  	#What data comes back from OmniAuth?     
    @auth = request.env["omniauth.auth"]
    @state = params[:state]

    #Use the token from the data to request a list of calendars
    @token = @auth["credentials"]["token"]
    current_user.update(:gcal_token => @token)
    redirect_to(@state)
  end

  def get_calendar_events
  	calendar_client = GoogleLib::Calendar.new current_user.id
  	events = calendar_client.get_all_visible_events
  	respond_with events
  end

end


