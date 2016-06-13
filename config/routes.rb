Rails.application.routes.draw do

  devise_for :users
  get '/users/search' => 'users#search'
  get '/users/get_calendar_events' => 'users#get_calendar_events'

	root to: 'application#angular'

  get "/auth/:provider/callback" => "users#auth_calendar"

  resources :projects, only: [:create, :show, :destroy] do
    member do
      get '/latest_meeting' => 'projects#latestMeeting'
      put '/join' => 'projects#join'
      put '/leave' => 'projects#leave'
    end
  end

  resources :meetings, only: [:create, :show, :update, :destroy] do
    collection do
      post '/createpublic' => 'meetings#createPublic'
      get '/showorg' => 'meetings#showOrg'
      get '/showpublic' => 'meetings#showPublic'
    end

    member do
      post '/create_followup_meeting' => 'meetings#createFollowupMeeting'
      post '/add_attendee' => 'meetings#addAttendee'
      get '/sendminutes' => 'meetings#sendMinutes'
    end
  end

  resources :agenda_items, only: [:create, :show, :update, :destroy]
  resources :agenda_notes, only: [:create, :update, :destroy] do
    member do
      put '/delete_user' => 'agenda_notes#deleteUser'
    end
  end
  
  resources :agenda_note_users, only: [:create, :destroy]

  get '*path', :to => redirect('/#/%{path}')

end
