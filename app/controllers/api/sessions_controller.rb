class Api::SessionsController < ApplicationController
  def create
    render json: {Youre: "online!"}
  end

  def destroy
    render json: {Youre: "offline!"}

  end
end
