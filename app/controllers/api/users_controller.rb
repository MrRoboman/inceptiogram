class Api::UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      login!(user)
      render :show
    else
      # error
    end
  end

  def show
    json = {}
    json[:username] = current_user.username if current_user
    render json: json
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end