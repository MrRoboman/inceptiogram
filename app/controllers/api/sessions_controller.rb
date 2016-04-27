class Api::SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if user
      login!(user)
      render json: {username: current_user.username}
    else
      render json: {error: "Invalid Credentials"}
    end
  end

  def destroy
    logout!
    render json: {username: ""}
  end
end
