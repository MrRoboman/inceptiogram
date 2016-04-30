class Api::ProfilesController < ApplicationController
  def index
    @profiles = User.all_with_deets
  end

  def show

  end
end
