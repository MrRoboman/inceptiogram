class Api::UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      login!(user)
      # debugger;
      render json: {username: user.username}
    else
      render json: user.errors.full_messages, status: 403
    end
  end

  def show
    # debugger;
    username = (logged_in? ? current_user.username : "")
    render json: {username: username}
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
