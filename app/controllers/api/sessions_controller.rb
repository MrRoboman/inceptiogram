class Api::SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    # debugger
    if user
      login!(user)
      render json: {id: current_user.id, username: current_user.username}
    else
      render json: {id: -1, username: "", error: ["Bad username or password"]}, status: 403
    end
  end

  def destroy
    logout!
    render json: {username: "", id: -1}
  end
end
