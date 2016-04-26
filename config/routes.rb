Rails.application.routes.draw do

	root to: 'static_pages#root.html'

	namespace :api, default: { format: :json } do
		resource :user, only: [:create]
		resource :session, only: [:create, :destroy]
	end

end
