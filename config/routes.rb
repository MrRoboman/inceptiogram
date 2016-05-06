Rails.application.routes.draw do

	root to: 'static_pages#root.html'

	namespace :api, default: { format: :json } do
		resource :user, only: [:create, :show]
		resource :session, only: [:create, :destroy]

		resources :profiles, only: [:index, :show, :update]
		resources :pictures, only: [:index, :create, :show]
		resources :comments, only: [:create]
		resources :likes, only: [:create]
		resources :follows, only: [:create]
		# resources :pictures, only: [:create] do
		# 	resources :comments, only: [:create]
		# end
	end

end
