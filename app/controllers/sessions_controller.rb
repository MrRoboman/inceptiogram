class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(params[:user][:username],
                                    params[:user][:password])
    if user
      login!(user)
      # redirect_to todo_lists_url
    else
      # flash.now[:errors] = ["Bad Credentials"]
      # render :new
    end
  end

  def destroy
    logout!
    # redirect_to new_session_url
end
