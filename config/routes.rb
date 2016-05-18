Rails.application.routes.draw do

  devise_for :users
  get '/users/search' => 'users#search'
  get '/users/get_calendar_events' => 'users#get_calendar_events'

	root to: 'application#angular'

	resources :posts, only: [:create, :index, :show] do
  	resources :comments, only: [:show, :create] do
    		member do
      		put '/upvote' => 'comments#upvote'
    		end
  	end

  	member do
    		put '/upvote' => 'posts#upvote'
  	end
	end

  get "/auth/:provider/callback" => "users#auth_calendar"

  resources :projects, only: [:create, :index, :show, :destroy] do
    member do
      put '/join' => 'projects#join'
      put '/leave' => 'projects#leave'
    end
  end

  resources :meetings, only: [:create, :index, :show, :update, :destroy] do
    collection do
      post '/createpublic' => 'meetings#createPublic'
      get '/showorg' => 'meetings#showOrg'
      get '/showpublic' => 'meetings#showPublic'
    end

    member do
      post '/add_attendee' => 'meetings#addAttendee'
      get '/sendminutes' => 'meetings#sendMinutes'
    end
  end

  resources :agenda_items, only: [:create, :index, :show, :update, :destroy]
  resources :agenda_notes, only: [:create, :update, :destroy] do
    member do
      put '/delete_user' => 'agenda_notes#deleteUser'
    end
  end
  
  resources :agenda_note_users, only: [:create, :destroy]

  get '*path', :to => redirect('/#/%{path}')

end
