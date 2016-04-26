class Api::UsersController < ApplicationController
  def show
    json = {}
    json[:username] = current_user.username if current_user
    render json: json
  end
end
