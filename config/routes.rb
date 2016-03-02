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

  resources :projects, only: [:create, :index, :show] do
    member do
      put '/join' => 'projects#join'
      put '/leave' => 'projects#leave'
    end
  end

  resources :meetings, only: [:create, :index, :show]

  get '*path', :to => redirect('/#/%{path}')

end
