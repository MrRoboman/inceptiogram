class Api::PicturesController < ApplicationController
  def index
    @pictures = Picture.all
    render json: @pictures
  end
end
