class Api::ProfilesController < ApplicationController
  def index
    @profiles = User.includes(:pictures).all
  end

  def show

  end
end
