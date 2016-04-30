class Api::ProfilesController < ApplicationController
  def index
    @profiles = User.all_with_deets
  end

  def show
    @profile = User.find_with_deets(params[:id])
  end
end
